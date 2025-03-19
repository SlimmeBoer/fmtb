<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SignalResource extends JsonResource
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
            'dump_id' => $this->dump_id,
            'signaal_nummer' => $this->signaal_nummer,
            'signaal_code' => $this->signaal_code,
            'categorie' => $this->categorie,
            'onderwerp' => $this->onderwerp,
            'soort' => $this->onderwerp,
            'kengetal' => $this->kengetal,
            'waarde' => $this->waarde,
            'kenmerk' => $this->kenmerk,
            'actie' => $this->actie,
        ];
    }
}
