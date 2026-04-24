<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

$permissions = DB::table('permissions')->get();

foreach ($permissions as $perm) {
    DB::table('permission_role')->updateOrInsert([
        'permission_id' => $perm->id,
        'role' => 'admin',
    ]);
}

echo "All permissions assigned to admin role!\n";

// Also update all existing users to be admin
DB::table('users')->update(['role' => 'admin']);

echo "All users set to admin role!\n";
echo "Done!\n";