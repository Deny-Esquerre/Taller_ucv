<?php

namespace Database\Seeders;

use App\Models\Shift;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ShiftSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first(); // Get first user, or create one if none

        if (!$user) {
            $user = User::factory()->create();
        }

        Shift::create([
            'user_id' => $user->id,
            'shift_date' => now()->toDateString(),
            'shift_type' => 'morning',
        ]);

        Shift::create([
            'user_id' => $user->id,
            'shift_date' => now()->addDay()->toDateString(),
            'shift_type' => 'afternoon',
        ]);

        Shift::create([
            'user_id' => $user->id,
            'shift_date' => now()->addDays(2)->toDateString(),
            'shift_type' => 'night',
        ]);
    }
}
