<?php

namespace App\Notifications;

use App\Models\Workshop;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class WorkshopCompleted extends Notification implements ShouldQueue
{
    use Queueable;

    protected $workshop;
    protected $reason;

    public function __construct(Workshop $workshop, string $reason)
    {
        $this->workshop = $workshop;
        $this->reason = $reason;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $date = $this->workshop->shift_date->format('d/m/Y');
        $shiftLabels = ['morning' => 'Mañana', 'afternoon' => 'Tarde', 'night' => 'Noche'];
        $shift = $shiftLabels[$this->workshop->shift_type] ?? $this->workshop->shift_type;

        return (new MailMessage)
            ->subject("Taller Finalizado: {$this->workshop->title}")
            ->greeting("Hola, {$this->workshop->representative}")
            ->line("El taller **\"{$this->workshop->title}\"** ha sido marcado como completado.")
            ->line("**Detalles:**")
            ->line("• Fecha: {$date}")
            ->line("• Turno: {$shift}")
            ->line("• Estado: {$this->reason}")
            ->line('¡Gracias por usar el sistema de gestión de talleres!');
    }
}