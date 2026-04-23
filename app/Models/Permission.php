<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'group'];

    /**
     * Get all roles assigned to this permission.
     */
    public function roles()
    {
        return $this->hasMany(PermissionRole::class, 'permission_id');
    }
}
