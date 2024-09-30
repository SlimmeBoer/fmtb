<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UmdlCompanyProperties extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'company_id',
        'mbp',
        'website',
        'ontvangstruimte',
        'winkel',
        'educatie',
        'meerjarige_monitoring',
        'open_dagen',
        'wandelpad',
        'erkend_demobedrijf',
        'bed_and_breakfast',
    ];
}
