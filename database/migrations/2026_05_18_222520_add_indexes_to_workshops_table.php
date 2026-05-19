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
        Schema::table('workshops', function (Blueprint $table) {
            $table->index('shift_date');
            $table->index('status');
            $table->index(['shift_date', 'status']); // Para el dashboard
        });
        
        Schema::table('blocked_days', function (Blueprint $table) {
            $table->index('date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('workshops', function (Blueprint $table) {
            $table->dropIndex(['shift_date']);
            $table->dropIndex(['status']);
            $table->dropIndex(['shift_date', 'status']);
        });
        
        Schema::table('blocked_days', function (Blueprint $table) {
            $table->dropIndex(['date']);
        });
    }
};
