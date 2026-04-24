<?php

namespace App\Http\Controllers;

use App\Models\BlockedDay;
use App\Models\User;
use App\Notifications\DayBlocked;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Support\Facades\Notification;

class WorkshopManagementController extends Controller
{
    public function index()
    {
        $allBlocked = BlockedDay::all();

        return Inertia::render('workshops/manage', [
            'allBlocked' => $allBlocked
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'reason' => 'nullable|string|max:255',
            'is_enabled' => 'required|boolean'
        ]);

        $blockedDay = BlockedDay::updateOrCreate(
            ['date' => $request->date],
            [
                'reason' => $request->reason,
                'is_enabled' => $request->is_enabled
            ]
        );

        $action = $request->is_enabled ? 'blocked' : 'unblocked';
        
        $admins = User::where('role', 'admin')->get();
        
        Notification::send($admins, new DayBlocked($blockedDay, $action, $request->reason));

        $statusText = $request->is_enabled ? 'habilitada' : 'bloqueada';

        return redirect()->route('workshops.manage')->with('toast', [
            'type' => 'success',
            'message' => "La fecha ha sido {$statusText} correctamente."
        ]);
    }

    public function destroy(BlockedDay $blockedDay)
    {
        $date = $blockedDay->date;
        $blockedDay->delete();

        $admins = User::where('role', 'admin')->get();
        
        $restoredDay = new BlockedDay(['date' => $date, 'is_enabled' => false]);
        Notification::send($admins, new DayBlocked($restoredDay, 'unblocked', 'Restablecido por el usuario'));

        return redirect()->route('workshops.manage')->with('toast', [
            'type' => 'success',
            'message' => 'Configuración de fecha restablecida.'
        ]);
    }
}
