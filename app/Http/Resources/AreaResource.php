<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AreaResource extends JsonResource
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
            'name' => $this->name,
            'description' => $this->description,
            'weight_kpi1' => $this->weight_kpi1,
            'weight_kpi2a' => $this->weight_kpi2a,
            'weight_kpi2b' => $this->weight_kpi2b,
            'weight_kpi2c' => $this->weight_kpi2c,
            'weight_kpi2d' => $this->weight_kpi2d,
            'weight_kpi2e' => $this->weight_kpi2e,
            'weight_kpi3' => $this->weight_kpi3,
            'weight_kpi4' => $this->weight_kpi4,
            'weight_kpi5' => $this->weight_kpi5,
            'weight_kpi6' => $this->weight_kpi6,
            'weight_kpi7' => $this->weight_kpi7,
            'weight_kpi8' => $this->weight_kpi8,
            'weight_kpi9' => $this->weight_kpi9,
            'weight_kpi11' => $this->weight_kpi11,
            'weight_kpi12a' => $this->weight_kpi12a,
            'weight_kpi12b' => $this->weight_kpi12b,
            'weight_kpi13' => $this->weight_kpi13,
            'weight_kpi14' => $this->weight_kpi14,
        ];
    }
}
