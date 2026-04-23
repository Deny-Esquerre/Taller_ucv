<?php

namespace App\Http\Controllers;

use App\Models\Workshop;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkshopController extends Controller
{
    public function index()
    {
        $workshops = Workshop::with('user')->get();
        $blockedDays = \App\Models\BlockedDay::all();

        return Inertia::render('workshops/index', [
            'workshops' => $workshops,
            'blockedDays' => $blockedDays,
        ]);
    }

    public function create()
    {
        $users = User::all();

        return Inertia::render('workshops/create', [
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'shift_date' => 'required|date',
            'shift_type' => 'required|in:morning,afternoon,night',
            'representative' => 'required|string|max:255',
            'email' => 'required|email',
            'modality' => 'required|in:virtual,presencial',
            'meeting_link' => 'required_if:modality,virtual|nullable|url',
            'location' => 'required_if:modality,presencial|nullable|string|max:255',
            'year' => 'required|integer|min:2000|max:' . (date('Y') + 10),
        ]);

        Workshop::create($request->only(['user_id', 'title', 'shift_date', 'shift_type', 'representative', 'email', 'modality', 'meeting_link', 'location', 'year']));

        return redirect()->route('workshops.index')->with('message', 'Taller creado exitosamente.');
    }

    public function show(Workshop $workshop)
    {
        $workshop->load('user');

        return Inertia::render('workshops/show', [
            'workshop' => $workshop,
        ]);
    }

    public function edit(Workshop $workshop)
    {
        $workshop->load('user');
        $users = User::all();

        return Inertia::render('workshops/edit', [
            'workshop' => $workshop,
            'users' => $users,
        ]);
    }

    public function update(Request $request, Workshop $workshop)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'shift_date' => 'required|date',
            'shift_type' => 'required|in:morning,afternoon,night',
            'representative' => 'required|string|max:255',
            'email' => 'required|email',
            'modality' => 'required|in:virtual,presencial',
            'year' => 'required|integer|min:2000|max:' . (date('Y') + 10),
        ]);

        $workshop->update($request->only(['user_id', 'title', 'shift_date', 'shift_type', 'representative', 'email', 'modality', 'year']));

        return redirect()->route('workshops.index')->with('message', 'Taller actualizado exitosamente.');
    }

    public function destroy(Workshop $workshop)
    {
        $workshop->delete();

        return redirect()->route('workshops.index')->with('message', 'Taller eliminado exitosamente.');
    }

    public function complete(Workshop $workshop)
    {
        $workshop->update(['status' => 'completed']);

        return redirect()->route('workshops.index')->with('message', 'Taller finalizado exitosamente.');
    }
}
