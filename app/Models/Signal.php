<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Signal extends Model
{
    /** @use HasFactory<\Database\Factories\SignalFactory> */
    use HasFactory;

    protected $fillable = [
        'dump_id',
        'item_nummer',
        'signaal_nummer',
        'signaal_code',
        'categorie',
        'onderwerp',
        'soort',
        'kengetal',
        'waarde',
        'kenmerk',
        'actie',
    ];
}
