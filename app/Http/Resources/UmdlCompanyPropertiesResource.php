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
        ];
    }
}
