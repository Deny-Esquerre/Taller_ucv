<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Workshop;
use App\Models\BlockedDay;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $now = Carbon::now();
        $startOfMonth = $now->copy()->startOfMonth();
        $thirtyDaysAgo = $now->copy()->subDays(30);

        // 1. Talleres programados (totales y crecimiento este mes)
        $totalWorkshops = Workshop::count();
        $thisMonthWorkshops = Workshop::where('shift_date', '>=', $startOfMonth)->count();
        $workshopGrowth = $totalWorkshops > 0 ? round(($thisMonthWorkshops / $totalWorkshops) * 100, 1) : 0;

        $workshopsRaw = Workshop::select(
            DB::raw("TO_CHAR(shift_date, 'YYYY-MM-DD') as date"),
            DB::raw("COUNT(*) as total")
        )
        ->where('shift_date', '>=', $thirtyDaysAgo)
        ->groupBy('date')
        ->pluck('total', 'date');

        $workshopsSparkline = $this->fillMissingDays($workshopsRaw, 30);

        // 2. Usuarios activos
        $totalUsers = User::count();
        $newUsersThisMonth = User::where('created_at', '>=', $startOfMonth)->count();
        $userGrowth = $totalUsers > 0 ? round(($newUsersThisMonth / $totalUsers) * 100, 1) : 0;

        $usersRaw = User::select(
            DB::raw("TO_CHAR(created_at, 'YYYY-MM-DD') as date"),
            DB::raw("COUNT(*) as total")
        )
        ->where('created_at', '>=', $thirtyDaysAgo)
        ->groupBy('date')
        ->pluck('total', 'date');

        $usersSparkline = $this->fillMissingDays($usersRaw, 30);

        // 3. Días habilitados manualmente
        $enabledDaysCount = BlockedDay::where('is_enabled', true)->count();
        
        $daysRaw = BlockedDay::select(
            DB::raw("TO_CHAR(date, 'YYYY-MM-DD') as date"),
            DB::raw("COUNT(*) as total")
        )
        ->where('date', '>=', $thirtyDaysAgo)
        ->where('is_enabled', true)
        ->groupBy('date')
        ->pluck('total', 'date');

        $daysSparkline = $this->fillMissingDays($daysRaw, 30);

        // 4. Datos para el gráfico interactivo (Programados vs Terminados)
        $interactiveChartData = Workshop::select(
            DB::raw("TO_CHAR(shift_date, 'YYYY-MM-DD') as date"),
            DB::raw("SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) as programados"),
            DB::raw("SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as terminados")
        )
        ->where('shift_date', '>=', $now->copy()->subMonths(6))
        ->whereNotNull('shift_date')
        ->groupBy('date')
        ->orderBy('date')
        ->get();

        // 5. Talleres por turno (Resumen)
        $workshopsByShift = Workshop::select('shift_type', DB::raw('COUNT(*) as total'))
            ->groupBy('shift_type')
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'workshops' => [
                    'total' => $totalWorkshops,
                    'growth' => $workshopGrowth,
                    'sparkline' => $workshopsSparkline
                ],
                'users' => [
                    'total' => $totalUsers,
                    'growth' => $userGrowth,
                    'sparkline' => $usersSparkline
                ],
                'enabled_days' => [
                    'total' => $enabledDaysCount,
                    'sparkline' => $daysSparkline
                ]
            ],
            'charts' => [
                'interactive' => $interactiveChartData,
                'by_shift' => $workshopsByShift,
            ]
        ]);
    }

    /**
     * Llena los días faltantes con 0 para que el gráfico siempre tenga puntos.
     */
    private function fillMissingDays(Collection $data, int $days): array
    {
        $result = [];
        $now = Carbon::now();

        for ($i = $days; $i >= 0; $i--) {
            $date = $now->copy()->subDays($i)->format('Y-m-d');
            $result[] = [
                'val' => (int) ($data[$date] ?? 0)
            ];
        }

        return $result;
    }
}
