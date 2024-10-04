<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static where(string $string, $company_id)
 */
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
        'opp_totaal',
        'melkkoeien',
        'meetmelk_per_koe',
        'meetmelk_per_ha',
        'jongvee_per_10mk' ,
        'gve_per_ha',
        'kunstmest_per_ha',
        'opbrengst_grasland_per_ha',
        're_kvem',
        'krachtvoer_per_100kg_melk',
        'veebenutting_n',
        'bodembenutting_n',
        'bedrijfsbenutting_n',
    ];
}
