<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement('ALTER TABLE workshops ADD COLUMN IF NOT EXISTS shift_time time(0)');
        DB::statement('ALTER TABLE workshops ADD COLUMN IF NOT EXISTS brand varchar(255)');
        DB::statement('ALTER TABLE workshops ADD COLUMN IF NOT EXISTS contact_name varchar(255)');
        DB::statement('ALTER TABLE workshops ADD COLUMN IF NOT EXISTS contact_position varchar(255)');
        DB::statement('ALTER TABLE workshops ADD COLUMN IF NOT EXISTS contact_email_b varchar(255)');
        DB::statement('ALTER TABLE workshops ADD COLUMN IF NOT EXISTS contact_email_n varchar(255)');
        DB::statement('ALTER TABLE workshops ADD COLUMN IF NOT EXISTS contact_phone varchar(50)');
        DB::statement('ALTER TABLE workshops ADD COLUMN IF NOT EXISTS speaker varchar(255)');
        DB::statement('ALTER TABLE workshops ADD COLUMN IF NOT EXISTS speaker_linkedin varchar(255)');
        DB::statement('ALTER TABLE workshops ADD COLUMN IF NOT EXISTS drive_logo_photo varchar(500)');
        DB::statement('ALTER TABLE workshops ADD COLUMN IF NOT EXISTS drive_difusion varchar(500)');
        DB::statement('ALTER TABLE workshops ADD COLUMN IF NOT EXISTS inscription_link varchar(255)');
        DB::statement('ALTER TABLE workshops ADD COLUMN IF NOT EXISTS inscription_responses varchar(500)');
        DB::statement('ALTER TABLE workshops ADD COLUMN IF NOT EXISTS attendees_link varchar(255)');
        DB::statement('ALTER TABLE workshops ADD COLUMN IF NOT EXISTS attendee_responses varchar(500)');
        DB::statement('ALTER TABLE workshops ADD COLUMN IF NOT EXISTS event_photos varchar(500)');
        DB::statement('ALTER TABLE workshops ADD COLUMN IF NOT EXISTS comments text');
    }

    public function down(): void
    {
        DB::statement('ALTER TABLE workshops DROP COLUMN IF EXISTS shift_time');
        DB::statement('ALTER TABLE workshops DROP COLUMN IF EXISTS brand');
        DB::statement('ALTER TABLE workshops DROP COLUMN IF EXISTS contact_name');
        DB::statement('ALTER TABLE workshops DROP COLUMN IF EXISTS contact_position');
        DB::statement('ALTER TABLE workshops DROP COLUMN IF EXISTS contact_email_b');
        DB::statement('ALTER TABLE workshops DROP COLUMN IF EXISTS contact_email_n');
        DB::statement('ALTER TABLE workshops DROP COLUMN IF EXISTS contact_phone');
        DB::statement('ALTER TABLE workshops DROP COLUMN IF EXISTS speaker');
        DB::statement('ALTER TABLE workshops DROP COLUMN IF EXISTS speaker_linkedin');
        DB::statement('ALTER TABLE workshops DROP COLUMN IF EXISTS drive_logo_photo');
        DB::statement('ALTER TABLE workshops DROP COLUMN IF EXISTS drive_difusion');
        DB::statement('ALTER TABLE workshops DROP COLUMN IF EXISTS inscription_link');
        DB::statement('ALTER TABLE workshops DROP COLUMN IF EXISTS inscription_responses');
        DB::statement('ALTER TABLE workshops DROP COLUMN IF EXISTS attendees_link');
        DB::statement('ALTER TABLE workshops DROP COLUMN IF EXISTS attendee_responses');
        DB::statement('ALTER TABLE workshops DROP COLUMN IF EXISTS event_photos');
        DB::statement('ALTER TABLE workshops DROP COLUMN IF EXISTS comments');
    }
};