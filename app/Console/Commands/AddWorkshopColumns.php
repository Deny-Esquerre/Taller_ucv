<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class AddWorkshopColumns extends Command
{
    protected $signature = 'workshops:add-columns';
    protected $description = 'Add missing columns to workshops table';

    public function handle()
    {
        $columns = [
            'shift_time' => 'time',
            'brand' => 'varchar(255)',
            'contact_name' => 'varchar(255)',
            'contact_position' => 'varchar(255)',
            'contact_email_b' => 'varchar(255)',
            'contact_email_n' => 'varchar(255)',
            'contact_phone' => 'varchar(50)',
            'speaker' => 'varchar(255)',
            'speaker_linkedin' => 'varchar(255)',
            'drive_logo_photo' => 'varchar(500)',
            'drive_difusion' => 'varchar(500)',
            'inscription_link' => 'varchar(255)',
            'inscription_responses' => 'varchar(500)',
            'attendees_link' => 'varchar(255)',
            'attendee_responses' => 'varchar(500)',
            'event_photos' => 'varchar(500)',
            'comments' => 'text',
        ];

        foreach ($columns as $col => $type) {
            try {
                DB::statement("ALTER TABLE workshops ADD COLUMN IF NOT EXISTS {$col} {$type}");
                $this->info("Added column: {$col}");
            } catch (\Exception $e) {
                $this->warn("Skipped {$col}: " . $e->getMessage());
            }
        }

        $this->info('Done!');
    }
}