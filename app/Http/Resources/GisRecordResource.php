<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GisRecordResource extends JsonResource
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
            'kvk' => $this->kvk,
            'eenheid_code' => $this->eenheid_code,
            'lengte' => $this->lengte,
            'breedte' => $this->breedte,
            'oppervlakte' => $this->oppervlakte,
            'eenheden' => $this->eenheden,
        ];
    }
}
