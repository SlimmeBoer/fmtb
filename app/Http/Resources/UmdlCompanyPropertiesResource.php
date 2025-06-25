<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UmdlCompanyPropertiesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'company_id' => $this->company_id,
            'year' => $this->year,
            'mbp' => $this->mbp,
            'website' => $this->website,
            'ontvangstruimte' => $this->ontvangstruimte,
            'winkel' => $this->winkel,
            'educatie' => $this->educatie,
            'meerjarige_monitoring' => $this->meerjarige_monitoring,
            'open_dagen' => $this->open_dagen,
            'wandelpad' => $this->wandelpad,
            'erkend_demobedrijf' => $this->erkend_demobedrijf,
            'bed_and_breakfast' => $this->bed_and_breakfast,
            'zorg' => $this->zorg,
            'geen_sma' => $this->geen_sma,
            'opp_totaal' => $this->opp_totaal,
            'opp_totaal_subsidiabel' => $this->opp_totaal_subsidiabel,
            'melkkoeien' => $this->melkkoeien,
            'meetmelk_per_koe' => $this->meetmelk_per_koe,
            'meetmelk_per_ha' => $this->meetmelk_per_ha,
            'jongvee_per_10mk' => $this->jongvee_per_10mk,
            'gve_per_ha' => $this->gve_per_ha,
            'kunstmest_per_ha' => $this->kunstmest_per_ha,
            'opbrengst_grasland_per_ha' => $this->opbrengst_grasland_per_ha,
            're_kvem' => $this->re_kvem,
            'krachtvoer_per_100kg_melk' => $this->krachtvoer_per_100kg_melk,
            'veebenutting_n' => $this->veebenutting_n,
            'bodembenutting_n' => $this->bodembenutting_n,
            'bedrijfsbenutting_n' => $this->bedrijfsbenutting_n,
            'g_co2_per_kg_meetmelk' => $this->g_co2_per_kg_meetmelk,
            'kg_co2_per_ha' => $this->kg_co2_per_ha,
            'grondsoort' => $this->grondsoort,
        ];
    }
}
