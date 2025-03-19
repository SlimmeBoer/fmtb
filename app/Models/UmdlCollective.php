<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static where(string $string, mixed $collectief_id)
 * @method static find($collective_id)
 */
class UmdlCollective extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'workspace_id',
        'name',
        'description',
    ];

    public function companies()
    {
        return $this->belongsToMany(Company::class, 'umdl_collective_companies','collective_id','company_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'umdl_collective_users','collective_id','user_id');
    }
}
