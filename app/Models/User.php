<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isPractitioner(): bool
    {
        return $this->role === 'practitioner';
    }

    /**
     * Check if the user has a specific permission based on their role.
     *
     * @param string $slug
     * @return bool
     */
    public function hasPermission(string $slug): bool
    {
        return Permission::where('slug', $slug)
            ->whereHas('roles', function ($query) {
                $query->where('role', $this->role);
            })
            ->exists();
    }

    /**
     * Get all permissions for the user's role.
     */
    public function getPermissions()
    {
        return Permission::whereHas('roles', function ($query) {
            $query->where('role', $this->role);
        })->pluck('slug');
    }
}
