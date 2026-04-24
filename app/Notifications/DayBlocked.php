<?php

namespace App\Notifications;

use App\Models\BlockedDay;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Carbon\Carbon;

class DayBlocked extends Notification implements ShouldQueue
{
    use Queueable;

    protected $blockedDay;
    protected $action;
    protected $reason;

    public function __construct(BlockedDay $blockedDay, string $action, ?string $reason = null)
    {
        $this->blockedDay = $blockedDay;
        $this->action = $action;
        $this->reason = $reason;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $date = Carbon::parse($this->blockedDay->date)->format('d/m/Y');
        $actionText = $this->action === 'blocked' ? 'bloqueado' : 'desbloqueado';
        $status = $this->blockedDay->is_enabled ? 'activo' : 'inactivo';

        $message = (new MailMessage)
            ->subject("Fecha {$actionText}: {$date}")
            ->greeting('Hola')
            ->line("La fecha **{$date}** ha sido {$actionText} en el sistema de gestión de talleres.")
            ->line("**Detalles:**")
            ->line("• Fecha: {$date}")
            ->line("• Estado: " . ($this->blockedDay->is_enabled ? 'Bloqueado (activo)' : 'Desbloqueado'))
            ->line("• Status en sistema: {$status}");

        if ($this->reason) {
            $message->line("• Motivo: {$this->reason}");
        }

        return $message->line('¡Gracias por usar el sistema!');
    }
}