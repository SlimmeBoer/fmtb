<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


/**
 * @method static where(array $array)
 */
class UmdlKpiValues extends Model
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
        'kpi2',
        'kpi3',
        'kpi4',
        'kpi5',
        'kpi6a',
        'kpi6b',
        'kpi6c',
        'kpi6d',
        'kpi7',
        'kpi8',
        'kpi9',
        'kpi10',
        'kpi11',
        'kpi12',
        'kpi13a',
        'kpi13b',
        'kpi13b',
        'kpi14',
        'kpi15',

    ];
}
