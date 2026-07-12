<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\ExportController;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('dashboard');
    }
    return redirect('/login');
})->name('home');

Route::inertia('/login', 'auth/login', [
    'canRegister' => Features::enabled(Features::registration()),
]);

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
    Route::get('/workshops/history', [\App\Http\Controllers\WorkshopHistoryController::class, 'index'])->name('workshops.history');
    Route::get('/workshops/duplicate/{workshop}', [\App\Http\Controllers\WorkshopHistoryController::class, 'duplicate'])->name('workshops.duplicate');

    // Talleres - lectura (todos los usuarios autenticados)
    Route::get('/workshops', [\App\Http\Controllers\WorkshopController::class, 'index'])->name('workshops.index');
    Route::get('/workshops/create', [\App\Http\Controllers\WorkshopController::class, 'create'])->name('workshops.create');
    Route::get('/workshops/{workshop}', [\App\Http\Controllers\WorkshopController::class, 'show'])->name('workshops.show');

    // Talleres - escritura (requieren permisos)
    Route::post('/workshops', [\App\Http\Controllers\WorkshopController::class, 'store'])->name('workshops.store')->middleware('permission:workshops.create');
    Route::get('/workshops/{workshop}/edit', [\App\Http\Controllers\WorkshopController::class, 'edit'])->name('workshops.edit')->middleware('permission:workshops.edit');
    Route::put('/workshops/{workshop}', [\App\Http\Controllers\WorkshopController::class, 'update'])->name('workshops.update')->middleware('permission:workshops.edit');
    Route::delete('/workshops/{workshop}', [\App\Http\Controllers\WorkshopController::class, 'destroy'])->name('workshops.destroy')->middleware('permission:workshops.delete');
    Route::put('/workshops/{workshop}/complete', [\App\Http\Controllers\WorkshopController::class, 'complete'])->name('workshops.complete')->middleware('permission:workshops.edit');

    // Exportaciones
    Route::get('/export/pdf/workshops', [ExportController::class, 'exportWorkshopsPdf'])->name('export.workshops.pdf');
    Route::get('/export/pdf/users', [ExportController::class, 'exportUsersPdf'])->name('export.users.pdf');
    Route::get('/export/excel/workshops', [ExportController::class, 'exportWorkshopsExcel'])->name('export.workshops.excel');
    Route::get('/export/excel/users', [ExportController::class, 'exportUsersExcel'])->name('export.users.excel');
});

require __DIR__.'/settings.php';
