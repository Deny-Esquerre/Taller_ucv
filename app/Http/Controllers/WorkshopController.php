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
            'shift_time' => 'nullable|date_format:H:i',
            'brand' => 'nullable|string|max:255',
            'contact_name' => 'nullable|string|max:255',
            'contact_position' => 'nullable|string|max:255',
            'contact_email_b' => 'nullable|email',
            'contact_email_n' => 'nullable|email',
            'contact_phone' => 'nullable|string|max:50',
            'speaker' => 'nullable|string|max:255',
            'speaker_linkedin' => 'nullable|url',
            'drive_logo_photo' => 'nullable|string|max:500',
            'drive_difusion' => 'nullable|string|max:500',
            'inscription_link' => 'nullable|url',
            'inscription_responses' => 'nullable|string|max:500',
            'attendees_link' => 'nullable|url',
            'attendee_responses' => 'nullable|string|max:500',
            'event_photos' => 'nullable|string|max:500',
            'comments' => 'nullable|string',
            'representative' => 'required|string|max:255',
            'email' => 'required|email',
            'modality' => 'required|in:virtual,presencial',
            'meeting_link' => 'nullable|url',
            'location' => 'nullable|string|max:255',
            'year' => 'nullable|integer|min:2000|max:' . (date('Y') + 10),
        ]);

        $data = $request->only([
            'user_id', 'title', 'shift_date', 'shift_type', 'shift_time', 'brand',
            'contact_name', 'contact_position', 'contact_email_b', 'contact_email_n',
            'contact_phone', 'speaker', 'speaker_linkedin', 'drive_logo_photo', 'drive_difusion',
            'inscription_link', 'inscription_responses', 'attendees_link', 'attendee_responses',
            'event_photos', 'comments', 'representative', 'email', 'modality', 'meeting_link',
            'location', 'year', 'status'
        ]);

        $data['year'] = $data['year'] ?: date('Y');
        $data['status'] = $data['status'] ?? 'scheduled';

        Workshop::create($data);

        return response()->json(['message' => 'Taller creado exitosamente.']);
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
            'shift_time' => 'nullable|date_format:H:i',
            'brand' => 'nullable|string|max:255',
            'contact_name' => 'nullable|string|max:255',
            'contact_position' => 'nullable|string|max:255',
            'contact_email_b' => 'nullable|email',
            'contact_email_n' => 'nullable|email',
            'contact_phone' => 'nullable|string|max:50',
            'speaker' => 'nullable|string|max:255',
            'speaker_linkedin' => 'nullable|url',
            'drive_logo_photo' => 'nullable|string|max:500',
            'drive_difusion' => 'nullable|string|max:500',
            'inscription_link' => 'nullable|url',
            'inscription_responses' => 'nullable|string|max:500',
            'attendees_link' => 'nullable|url',
            'attendee_responses' => 'nullable|string|max:500',
            'event_photos' => 'nullable|string|max:500',
            'comments' => 'nullable|string',
            'representative' => 'required|string|max:255',
            'email' => 'required|email',
            'modality' => 'required|in:virtual,presencial',
            'meeting_link' => 'nullable|url',
            'location' => 'nullable|string|max:255',
            'year' => 'nullable|integer|min:2000|max:' . (date('Y') + 10),
        ]);

        $data = $request->only([
            'user_id', 'title', 'shift_date', 'shift_type', 'shift_time', 'brand',
            'contact_name', 'contact_position', 'contact_email_b', 'contact_email_n',
            'contact_phone', 'speaker', 'speaker_linkedin', 'drive_logo_photo', 'drive_difusion',
            'inscription_link', 'inscription_responses', 'attendees_link', 'attendee_responses',
            'event_photos', 'comments', 'representative', 'email', 'modality', 'meeting_link',
            'location', 'year'
        ]);

        $data['year'] = $data['year'] ?: date('Y');

        $workshop->update($data);

        return response()->json(['message' => 'Taller actualizado exitosamente.']);
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