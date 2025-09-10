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
            'kpi2' => $this->kpi2,
            'kpi3' => $this->kpi3,
            'kpi4' => $this->kpi4,
            'kpi5' => $this->kpi5,
            'kpi6a' => $this->kpi6a,
            'kpi6b' => $this->kpi6b,
            'kpi6c' => $this->kpi6c,
            'kpi6d' => $this->kpi6d,
            'kpi7' => $this->kpi7,
            'kpi8' => $this->kpi8,
            'kpi9' => $this->kpi9,
            'kpi10' => $this->kpi10,
            'kpi11' => $this->kpi11,
            'kpi12' => $this->kpi12,
            'kpi13a' => $this->kpi13a,
            'kpi13b' => $this->kpi13b,
            'kpi14' => $this->kpi14,
            'kpi15' => $this->kpi15,
        ];
    }
}
