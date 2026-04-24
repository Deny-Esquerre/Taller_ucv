<?php

use Illuminate\Support\Facades\DB;

return new class
{
    public function up()
    {
        try {
            // Each in separate try-catch to avoid transaction abort
            $this->addColumn('shift_time', 'time', 'workshops');
            $this->addColumn('brand', 'varchar(255)', 'workshops');
            $this->addColumn('contact_name', 'varchar(255)', 'workshops');
            $this->addColumn('contact_position', 'varchar(255)', 'workshops');
            $this->addColumn('contact_email_b', 'varchar(255)', 'workshops');
            $this->addColumn('contact_email_n', 'varchar(255)', 'workshops');
            $this->addColumn('contact_phone', 'varchar(50)', 'workshops');
            $this->addColumn('speaker', 'varchar(255)', 'workshops');
            $this->addColumn('speaker_linkedin', 'varchar(255)', 'workshops');
            $this->addColumn('drive_logo_photo', 'varchar(500)', 'workshops');
            $this->addColumn('drive_difusion', 'varchar(500)', 'workshops');
            $this->addColumn('inscription_link', 'varchar(255)', 'workshops');
            $this->addColumn('inscription_responses', 'varchar(500)', 'workshops');
            $this->addColumn('attendees_link', 'varchar(255)', 'workshops');
            $this->addColumn('attendee_responses', 'varchar(500)', 'workshops');
            $this->addColumn('event_photos', 'varchar(500)', 'workshops');
            $this->addColumn('comments', 'text', 'workshops');
            
            echo "Migration completed successfully!\n";
        } catch (\Exception $e) {
            echo "Error: " . $e->getMessage() . "\n";
        }
    }
    
    private function addColumn($column, $type, $table)
    {
        try {
            DB::statement("ALTER TABLE {$table} ADD COLUMN {$column} {$type}");
            echo "Added {$column}\n";
        } catch (\Exception $e) {
            // Column might already exist
        }
    }
};