use App\Models\Workshop;
use App\Models\User;
use Carbon\Carbon;

$user = User::first();
$statuses = ['scheduled', 'completed'];
$shifts = ['morning', 'afternoon', 'night'];

for ($i = 0; $i < 50; $i++) {
    Workshop::create([
        'user_id' => $user->id,
        'title' => 'Taller Aleatorio #' . ($i + 1),
        'shift_date' => Carbon::now()->subDays(rand(0, 90)),
        'shift_type' => $shifts[rand(0, 2)],
        'shift_time' => '10:00:00',
        'status' => $statuses[rand(0, 1)],
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
echo "Seeding completed successfully!";
