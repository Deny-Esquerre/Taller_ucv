<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\PermissionRole;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::orderBy('group')->get()->groupBy('group');
        
        $rolesWithPermissions = [
            'admin' => PermissionRole::where('role', 'admin')->pluck('permission_id')->toArray(),
            'practitioner' => PermissionRole::where('role', 'practitioner')->pluck('permission_id')->toArray(),
        ];

        return Inertia::render('permissions/index', [
            'permissions' => $permissions,
            'rolesWithPermissions' => $rolesWithPermissions,
        ]);
    }

    public function update(Request $request)
    {
        Log::info('Iniciando actualización de permisos', [
            'role' => $request->role,
            'permissions_count' => is_array($request->permissions) ? count($request->permissions) : 0
        ]);

        $request->validate([
            'role' => 'required|in:admin,practitioner',
            'permissions' => 'present|array',
        ]);

        try {
            DB::transaction(function () use ($request) {
                // Eliminar permisos actuales del rol
                PermissionRole::where('role', $request->role)->delete();

                // Asignar nuevos permisos
                foreach ($request->permissions as $permissionId) {
                    PermissionRole::create([
                        'role' => $request->role,
                        'permission_id' => $permissionId,
                    ]);
                }
            });

            Log::info('Permisos actualizados con éxito');

            return redirect()->route('permissions.index')->with('toast', [
                'type' => 'success',
                'message' => 'Configuración guardada correctamente.',
            ]);

        } catch (\Exception $e) {
            Log::error('Error al guardar permisos: ' . $e->getMessage());
            
            return redirect()->route('permissions.index')->with('toast', [
                'type' => 'error',
                'message' => 'Error: ' . $e->getMessage(),
            ]);
        }
    }
}
