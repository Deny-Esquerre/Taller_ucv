<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('workshops', function (Blueprint $table) {
            $table->time('shift_time')->nullable()->after('shift_type');
            $table->string('brand')->nullable()->after('meeting_link');
            $table->string('contact_name')->nullable()->after('brand');
            $table->string('contact_position')->nullable()->after('contact_name');
            $table->string('contact_email_b')->nullable()->after('contact_position');
            $table->string('contact_email_n')->nullable()->after('contact_email_b');
            $table->string('contact_phone', 50)->nullable()->after('contact_email_n');
            $table->string('speaker')->nullable()->after('contact_phone');
            $table->string('speaker_linkedin')->nullable()->after('speaker');
            $table->string('drive_logo_photo', 500)->nullable()->after('speaker_linkedin');
            $table->string('drive_difusion', 500)->nullable()->after('drive_logo_photo');
            $table->string('inscription_link')->nullable()->after('drive_difusion');
            $table->string('inscription_responses', 500)->nullable()->after('inscription_link');
            $table->string('attendees_link')->nullable()->after('inscription_responses');
            $table->string('attendee_responses', 500)->nullable()->after('attendees_link');
            $table->string('event_photos', 500)->nullable()->after('attendee_responses');
            $table->text('comments')->nullable()->after('event_photos');
        });
    }

    public function down(): void
    {
        Schema::table('workshops', function (Blueprint $table) {
            $table->dropColumn([
                'shift_time', 'brand', 'contact_name', 'contact_position',
                'contact_email_b', 'contact_email_n', 'contact_phone',
                'speaker', 'speaker_linkedin', 'drive_logo_photo',
                'drive_difusion', 'inscription_link', 'inscription_responses',
                'attendees_link', 'attendee_responses', 'event_photos', 'comments'
            ]);
        });
    }
};