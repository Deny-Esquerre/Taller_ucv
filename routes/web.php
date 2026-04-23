<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', \App\Http\Controllers\DashboardController::class)->name('dashboard');

    // Solo administradores
    Route::middleware(['admin'])->group(function () {
        Route::resource('users', \App\Http\Controllers\UserController::class);
        
        // Gestión de Permisos
        Route::get('/permissions', [\App\Http\Controllers\PermissionController::class, 'index'])->name('permissions.index');
        Route::put('/permissions', [\App\Http\Controllers\PermissionController::class, 'update'])->name('permissions.update');

        // Gestión Avanzada de Talleres (Días libres)
        // Debe ir antes del resource de workshops para evitar conflictos
        Route::get('/workshops/manage', [\App\Http\Controllers\WorkshopManagementController::class, 'index'])->name('workshops.manage');
        Route::post('/workshops/manage', [\App\Http\Controllers\WorkshopManagementController::class, 'store'])->name('workshops.manage.store');
        Route::delete('/workshops/manage/{blockedDay}', [\App\Http\Controllers\WorkshopManagementController::class, 'destroy'])->name('workshops.manage.destroy');
    });

    // Gestión de Talleres
    Route::put('/workshops/{workshop}/complete', [\App\Http\Controllers\WorkshopController::class, 'complete'])->name('workshops.complete');
    Route::get('/workshops/history', [\App\Http\Controllers\WorkshopHistoryController::class, 'index'])->name('workshops.history');
    Route::get('/workshops/duplicate/{workshop}', [\App\Http\Controllers\WorkshopHistoryController::class, 'duplicate'])->name('workshops.duplicate');
    Route::resource('workshops', \App\Http\Controllers\WorkshopController::class);
});

require __DIR__.'/settings.php';
