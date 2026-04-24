<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Workshop extends Model
{
    protected $table = 'workshops';

    protected $fillable = [
        'user_id',
        'title',
        'shift_date',
        'shift_type',
        'shift_time',
        'brand',
        'contact_name',
        'contact_position',
        'contact_email_b',
        'contact_email_n',
        'contact_phone',
        'speaker',
        'speaker_linkedin',
        'drive_logo_photo',
        'drive_difusion',
        'inscription_link',
        'inscription_responses',
        'attendees_link',
        'attendee_responses',
        'event_photos',
        'comments',
        'representative',
        'email',
        'modality',
        'meeting_link',
        'location',
        'year',
        'status',
    ];

    protected $attributes = [
        'status' => 'scheduled',
    ];

    protected $casts = [
        'shift_date' => 'date',
    ];

    /**
     * Boot the model to handle automatic status.
     */
    protected static function boot()
    {
        parent::boot();

        static::retrieved(function ($workshop) {
            if ($workshop->status === 'scheduled' && $workshop->shift_date->isPast()) {
                $workshop->status = 'completed';
                // Opcional: podrías guardar el cambio en DB aquí, 
                // pero por ahora lo manejamos dinámicamente para mayor rapidez
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
