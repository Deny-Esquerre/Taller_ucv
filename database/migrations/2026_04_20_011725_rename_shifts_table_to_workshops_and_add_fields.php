<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::rename('shifts', 'workshops');

        Schema::table('workshops', function (Blueprint $table) {
            $table->string('title');
            $table->string('representative');
            $table->string('email');
            $table->enum('modality', ['virtual', 'presencial']);
            $table->year('year')->default(date('Y'));
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('workshops', function (Blueprint $table) {
            $table->dropColumn(['title', 'representative', 'email', 'modality', 'year']);
        });

        Schema::rename('workshops', 'shifts');
    }
};
