<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KpiValuesResource extends JsonResource
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
            'kpi1a' => $this->kpi1a,
            'kpi1b' => $this->kpi1b,
            'kpi2a' => $this->kpi2a,
            'kpi2b' => $this->kpi2b,
            'kpi2c' => $this->kpi2c,
            'kpi2d' => $this->kpi2d,
            'kpi3' => $this->kpi3,
            'kpi4' => $this->kpi4,
            'kpi5a' => $this->kpi5a,
            'kpi5b' => $this->kpi5b,
            'kpi5c' => $this->kpi5c,
            'kpi5d' => $this->kpi5d,
            'kpi6a' => $this->kpi6a,
            'kpi6b' => $this->kpi6b,
            'kpi6c' => $this->kpi6c,
            'kpi7' => $this->kpi7,
            'kpi8' => $this->kpi8,
            'kpi9' => $this->kpi9,
            'kpi11' => $this->kpi11,
            'kpi12a' => $this->kpi12a,
            'kpi12b' => $this->kpi12b,
            'kpi13' => $this->kpi13,
            'kpi14' => $this->kpi14,
        ];
    }
}
