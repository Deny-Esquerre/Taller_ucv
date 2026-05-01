<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Workshop;
use App\Models\User;
use Carbon\Carbon;

$user = User::first();
if (!$user) {
    echo "No user found!";
    exit(1);
}

// Limpiamos talleres de prueba anteriores para no saturar si se desea, 
// o simplemente añadimos los 90 nuevos. El usuario pidió "rellena con 90".
// Workshop::where('title', 'like', 'Taller Aleatorio%')->delete();

for ($i = 0; $i < 90; $i++) {
    Workshop::create([
        'user_id' => $user->id,
        'title' => 'Taller Aleatorio #' . ($i + 1),
        'shift_date' => Carbon::now()->subDays(rand(0, 90)),
        'shift_type' => ['morning', 'afternoon', 'night'][rand(0, 2)],
        'shift_time' => '10:00:00',
        'status' => rand(0, 1) ? 'scheduled' : 'completed',
        'brand' => 'UCV Corporativo',
        'contact_name' => 'Persona de Prueba',
        'contact_email_b' => 'prueba@example.com',
        'contact_phone' => '999888777',
        'representative' => 'Representante UCV',
        'email' => 'representante@example.com',
        'modality' => 'virtual',
        'year' => 2024,
        'location' => 'Lima',
        'speaker' => 'Expositor Invitado',
    ]);
}
echo "Seeding of 90 workshops completed successfully!";
