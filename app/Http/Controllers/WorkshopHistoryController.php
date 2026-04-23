<?php

namespace App\Http\Controllers;

use App\Models\Workshop;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkshopHistoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Workshop::with('user')->orderBy('shift_date', 'desc');

        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('representative', 'like', '%' . $request->search . '%');
        }

        return Inertia::render('workshops/history', [
            'workshops' => $query->get(),
            'filters' => $request->only(['search']),
        ]);
    }

    public function duplicate(Workshop $workshop)
    {
        $users = User::all();
        
        // Cargamos la vista de creación con los datos del taller a duplicar
        return Inertia::render('workshops/create', [
            'users' => $users,
            'duplicateFrom' => $workshop
        ]);
    }
}
