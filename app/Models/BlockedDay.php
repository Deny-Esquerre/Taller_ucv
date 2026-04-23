<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlockedDay extends Model
{
    protected $fillable = [
        'date',
        'reason',
        'is_enabled'
    ];

    protected $casts = [
        'is_enabled' => 'boolean'
    ];
}
