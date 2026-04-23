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
        'representative',
        'email',
        'modality',
        'meeting_link',
        'location',
        'year',
        'status',
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
