<?php

namespace App\Console\Commands;

use App\Models\Workshop;
use App\Notifications\WorkshopCompleted;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Notification;

class CheckCompletedWorkshops extends Command
{
    protected $signature = 'workshops:check-completed';
    protected $description = 'Verifica y notifica cuando un taller ha terminado según su turno';

    public function handle()
    {
        $now = Carbon::now();
        $today = $now->toDateString();

        $workshops = Workshop::where('status', 'scheduled')
            ->whereDate('shift_date', '<=', $today)
            ->get();

        foreach ($workshops as $workshop) {
            $shouldComplete = false;
            $notificationMessage = '';

            $shiftDate = Carbon::parse($workshop->shift_date);
            
            if ($workshop->shift_date < $today) {
                $shouldComplete = true;
                $notificationMessage = 'El taller pasó de fecha';
            } else {
                $shiftTime = $workshop->shift_time 
                    ? Carbon::parse($workshop->shift_time, 'America/Lima') 
                    : null;

                switch ($workshop->shift_type) {
                    case 'morning':
                        $shiftEnd = $shiftTime 
                            ? $shiftTime->copy()->addHours(2) 
                            : Carbon::parse($workshop->shift_date)->setTime(12, 0);
                        if ($now->gte($shiftEnd)) {
                            $shouldComplete = true;
                            $notificationMessage = 'Turno mañana finalizado';
                        }
                        break;
                    case 'afternoon':
                        $shiftEnd = $shiftTime 
                            ? $shiftTime->copy()->addHours(2) 
                            : Carbon::parse($workshop->shift_date)->setTime(18, 0);
                        if ($now->gte($shiftEnd)) {
                            $shouldComplete = true;
                            $notificationMessage = 'Turno tarde finalizado';
                        }
                        break;
                    case 'night':
                        $shiftEnd = $shiftTime 
                            ? $shiftTime->copy()->addHours(2) 
                            : Carbon::parse($workshop->shift_date)->setTime(22, 0);
                        if ($now->gte($shiftEnd)) {
                            $shouldComplete = true;
                            $notificationMessage = 'Turno noche finalizado';
                        }
                        break;
                }
            }

            if ($shouldComplete) {
                $workshop->update(['status' => 'completed']);
                
                Notification::route('mail', $workshop->email)
                    ->notify(new WorkshopCompleted($workshop, $notificationMessage));
                
                $this->info("Taller completado y notificado: {$workshop->title} - {$notificationMessage}");
            }
        }

        $this->info('Verificación de talleres completada.');
    }
}