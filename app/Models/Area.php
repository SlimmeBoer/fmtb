<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    /** @use HasFactory<\Database\Factories\AreaFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'weight_kpi1',
        'weight_kpi2a',
        'weight_kpi2b',
        'weight_kpi2c',
        'weight_kpi2d',
        'weight_kpi3',
        'weight_kpi4',
        'weight_kpi5',
        'weight_kpi6',
        'weight_kpi7',
        'weight_kpi8',
        'weight_kpi9',
        'weight_kpi11',
        'weight_kpi12a',
        'weight_kpi12b',
        'weight_kpi13',
        'weight_kpi14',
    ];

    public function companies()
    {
        return $this->belongsToMany(Company::class, 'area_companies','area_id','company_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'area_users','area_id','user_id');
    }
}
