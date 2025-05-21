<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OldResult extends Model
{
    /** @use HasFactory<\Database\Factories\OldResultFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'brs',
        'final_year',
        'filename',
        'result_kpi1a',
        'result_kpi1b',
        'result_kpi2',
        'result_kpi3' ,
        'result_kpi4',
        'result_kpi5',
        'result_kpi6a',
        'result_kpi6b',
        'result_kpi6c',
        'result_kpi6d',
        'result_kpi7',
        'result_kpi8',
        'result_kpi9',
        'result_kpi10',
        'result_kpi11',
        'result_kpi12',
        'result_kpi13a',
        'result_kpi13b',
        'result_kpi14',
        'result_kpi15',
        'score_kpi1',
        'score_kpi2',
        'score_kpi3',
        'score_kpi4',
        'score_kpi5',
        'score_kpi6',
        'score_kpi7',
        'score_kpi8',
        'score_kpi9',
        'score_kpi10',
        'score_kpi11',
        'score_kpi12',
        'score_kpi13',
        'score_kpi14',
        'score_kpi15',
        'total_score',
        'total_money',
    ];
}
