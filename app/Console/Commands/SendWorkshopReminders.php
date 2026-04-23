<?php

namespace App\Console\Commands;

use App\Models\Workshop;
use App\Notifications\WorkshopReminder;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Notification;

class SendWorkshopReminders extends Command
{
    protected $signature = 'workshops:send-reminders';
    protected $description = 'Envía recordatorios automáticos de talleres (2 días y 1 día antes)';

    public function handle()
    {
        $today = Carbon::today();

        // 1. Recordatorios para dentro de 2 días
        $twoDaysFromNow = $today->copy()->addDays(2)->toDateString();
        $workshops2 = Workshop::whereDate('shift_date', $twoDaysFromNow)
            ->where('status', 'scheduled')
            ->get();

        foreach ($workshops2 as $workshop) {
            Notification::route('mail', $workshop->email)
                ->notify(new WorkshopReminder($workshop, 2));
            $this->info("Recordatorio (2 días) enviado para: {$workshop->title}");
        }

        // 2. Recordatorios para mañana (1 día antes)
        $tomorrow = $today->copy()->addDay()->toDateString();
        $workshops1 = Workshop::whereDate('shift_date', $tomorrow)
            ->where('status', 'scheduled')
            ->get();

        foreach ($workshops1 as $workshop) {
            Notification::route('mail', $workshop->email)
                ->notify(new WorkshopReminder($workshop, 1));
            $this->info("Recordatorio (1 día) enviado para: {$workshop->title}");
        }

        $this->info('Proceso de recordatorios finalizado.');
    }
}
