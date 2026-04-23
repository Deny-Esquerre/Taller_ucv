<?php

namespace App\Notifications;

use App\Models\Workshop;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class WorkshopReminder extends Notification implements ShouldQueue
{
    use Queueable;

    protected $workshop;
    protected $daysRemaining;

    public function __construct(Workshop $workshop, int $daysRemaining)
    {
        $this->workshop = $workshop;
        $this->daysRemaining = $daysRemaining;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $shiftLabels = ['morning' => 'Mañana', 'afternoon' => 'Tarde', 'night' => 'Noche'];
        $shift = $shiftLabels[$this->workshop->shift_type] ?? $this->workshop->shift_type;
        $date = $this->workshop->shift_date->format('d/m/Y');

        $message = (new MailMessage)
            ->subject("Recordatorio: Taller programado en {$this->daysRemaining} día(s)")
            ->greeting("Hola, {$this->workshop->representative}")
            ->line("Te recordamos que tienes un taller programado para el día {$date}.")
            ->line("Detalles del taller:")
            ->line("• Título: {$this->workshop->title}")
            ->line("• Turno: {$shift}")
            ->line("• Modalidad: " . ucfirst($this->workshop->modality));

        if ($this->workshop->modality === 'virtual') {
            $message->line("• Enlace: {$this->workshop->meeting_link}")
                    ->action('Unirse a la reunión', $this->workshop->meeting_link);
        } else {
            $message->line("• Ubicación: {$this->workshop->location}");
        }

        return $message->line('¡Te esperamos!');
    }
}
