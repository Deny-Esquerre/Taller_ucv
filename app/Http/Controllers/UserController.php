<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::select('id', 'name', 'email', 'role', 'created_at')->get();

        return Inertia::render('users/index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        return Inertia::render('users/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:admin,practitioner',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return redirect()->route('users.index')->with('toast', [
            'type' => 'success',
            'message' => 'Usuario creado exitosamente.'
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,'.$user->id,
            'role' => 'required|in:admin,practitioner',
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
        ];

        if ($request->password) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return redirect()->route('users.index')->with('toast', [
            'type' => 'success',
            'message' => 'Usuario actualizado exitosamente.'
        ]);
    }

    public function destroy(User $user)
    {
        // Evitar que el administrador se borre a sí mismo
        if (auth()->id() === $user->id) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'No puedes eliminar tu propia cuenta.'
            ]);
        }

        $user->delete();

        return redirect()->route('users.index')->with('toast', [
            'type' => 'success',
            'message' => 'Usuario eliminado exitosamente.'
        ]);
    }
}
