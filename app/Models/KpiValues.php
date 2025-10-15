<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class KpiValues extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'company_id',
        'year',
        'kpi1a',
        'kpi1b',
        'kpi2a',
        'kpi2b',
        'kpi2c',
        'kpi2d',
        'kpi2e',
        'kpi3',
        'kpi4',
        'kpi5a',
        'kpi5b',
        'kpi6a',
        'kpi6b',
        'kpi7',
        'kpi8',
        'kpi9',
        'kpi11',
        'kpi12a',
        'kpi12b',
        'kpi13',
        'kpi14',

    ];
}
