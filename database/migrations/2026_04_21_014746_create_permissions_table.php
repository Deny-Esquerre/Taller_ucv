<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('permissions', function (Blueprint $blueprint) {
            $blueprint->id();
            $blueprint->string('name'); // Ejemplo: "Crear Talleres"
            $blueprint->string('slug')->unique(); // Ejemplo: "workshops.create"
            $blueprint->string('group')->nullable(); // Ejemplo: "Gestión de Talleres"
            $blueprint->timestamps();
        });

        Schema::create('permission_role', function (Blueprint $blueprint) {
            $blueprint->id();
            $blueprint->string('role'); // "admin" o "practitioner"
            $blueprint->foreignId('permission_id')->constrained()->onDelete('cascade');
            $blueprint->timestamps();
        });

        // Insertar permisos base
        $permissions = [
            ['name' => 'Ver Dashboard', 'slug' => 'dashboard.view', 'group' => 'Sistema'],
            ['name' => 'Gestionar Usuarios', 'slug' => 'users.manage', 'group' => 'Administración'],
            ['name' => 'Ver Talleres', 'slug' => 'workshops.view', 'group' => 'Talleres'],
            ['name' => 'Crear Talleres', 'slug' => 'workshops.create', 'group' => 'Talleres'],
            ['name' => 'Editar Talleres', 'slug' => 'workshops.edit', 'group' => 'Talleres'],
            ['name' => 'Eliminar Talleres', 'slug' => 'workshops.delete', 'group' => 'Talleres'],
            ['name' => 'Gestionar Permisos', 'slug' => 'permissions.manage', 'group' => 'Administración'],
        ];

        foreach ($permissions as $permission) {
            DB::table('permissions')->insert($permission);
        }

        // Asignar todos los permisos a admin por defecto
        $allPermissions = DB::table('permissions')->pluck('id');
        foreach ($allPermissions as $permissionId) {
            DB::table('permission_role')->insert([
                'role' => 'admin',
                'permission_id' => $permissionId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Asignar solo visualización a practitioner por defecto
        $practitionerPerms = DB::table('permissions')
            ->whereIn('slug', ['dashboard.view', 'workshops.view'])
            ->pluck('id');

        foreach ($practitionerPerms as $permissionId) {
            DB::table('permission_role')->insert([
                'role' => 'practitioner',
                'permission_id' => $permissionId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permission_role');
        Schema::dropIfExists('permissions');
    }
};
