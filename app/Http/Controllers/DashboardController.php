<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Workshop;
use App\Models\BlockedDay;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

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

        // 2. Usuarios activos (puedes definir "activos" como los que han iniciado sesión recientemente o todos los registrados)
        $totalUsers = User::count();
        // Supongamos que queremos ver el crecimiento de usuarios registrados este mes
        $newUsersThisMonth = User::where('created_at', '>=', $startOfMonth)->count();
        $userGrowth = $totalUsers > 0 ? round(($newUsersThisMonth / $totalUsers) * 100, 1) : 0;

        // 3. Días habilitados manualmente
        $enabledDaysCount = BlockedDay::where('is_enabled', true)->count();
        // Comparación simple (opcional: podrías comparar con el mes anterior)
        $totalBlockedOrEnabled = BlockedDay::count();

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
            ]
        ]);
    }
}
