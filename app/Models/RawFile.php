<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RawFile extends Model
{
    /** @use HasFactory<\Database\Factories\RawFileFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'type',
        'dump_id',
        'filename',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
