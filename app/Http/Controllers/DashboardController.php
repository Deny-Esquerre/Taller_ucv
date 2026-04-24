<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Workshop;
use App\Models\BlockedDay;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $now = Carbon::now();
        $startOfMonth = $now->copy()->startOfMonth();

        // 1. Talleres programados (totales y crecimiento este mes)
        $totalWorkshops = Workshop::count();
        $thisMonthWorkshops = Workshop::where('shift_date', '>=', $startOfMonth)->count();
        $workshopGrowth = $totalWorkshops > 0 ? round(($thisMonthWorkshops / $totalWorkshops) * 100, 1) : 0;

        // 2. Usuarios activos
        $totalUsers = User::count();
        $newUsersThisMonth = User::where('created_at', '>=', $startOfMonth)->count();
        $userGrowth = $totalUsers > 0 ? round(($newUsersThisMonth / $totalUsers) * 100, 1) : 0;

        // 3. Días habilitados manualmente
        $enabledDaysCount = BlockedDay::where('is_enabled', true)->count();
        $totalBlockedOrEnabled = BlockedDay::count();

        // 4. Datos para el gráfico - talleres por mes
        $workshopsByMonth = Workshop::select(
            DB::raw("TO_CHAR(shift_date, 'YYYY-MM') as month"),
            DB::raw('COUNT(*) as total')
        )
        ->whereNotNull('shift_date')
        ->groupBy('month')
        ->orderBy('month')
        ->get();

        // 5. Talleres por turno
        $workshopsByShift = Workshop::select('shift_type', DB::raw('COUNT(*) as total'))
            ->groupBy('shift_type')
            ->get();

        // 6. Talleres por mes (últimos 12 meses)
        $workshopsLast12Months = Workshop::select(
            DB::raw("TO_CHAR(shift_date, 'YYYY-MM') as month"),
            DB::raw('COUNT(*) as total')
        )
        ->where('shift_date', '>=', $now->copy()->subMonths(12)->startOfMonth())
        ->whereNotNull('shift_date')
        ->groupBy('month')
        ->orderBy('month')
        ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'workshops' => [
                    'total' => $totalWorkshops,
                    'growth' => $workshopGrowth,
                ],
                'users' => [
                    'total' => $totalUsers,
                    'growth' => $userGrowth,
                ],
                'enabled_days' => [
                    'total' => $enabledDaysCount,
                ]
            ],
            'charts' => [
                'by_month' => $workshopsByMonth,
                'by_shift' => $workshopsByShift,
                'last_12_months' => $workshopsLast12Months,
            ]
        ]);
    }
}
