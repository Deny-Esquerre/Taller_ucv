<?php

namespace App\Http\Controllers;

use App\Models\BlockedDay;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

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

        BlockedDay::updateOrCreate(
            ['date' => $request->date],
            [
                'reason' => $request->reason,
                'is_enabled' => $request->is_enabled
            ]
        );

        $statusText = $request->is_enabled ? 'habilitada' : 'bloqueada';

        return redirect()->route('workshops.manage')->with('toast', [
            'type' => 'success',
            'message' => "La fecha ha sido {$statusText} correctamente."
        ]);
    }

    public function destroy(BlockedDay $blockedDay)
    {
        $blockedDay->delete();

        return redirect()->route('workshops.manage')->with('toast', [
            'type' => 'success',
            'message' => 'Configuración de fecha restablecida.'
        ]);
    }
}
