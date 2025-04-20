<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OldResultResource extends JsonResource
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
            'ubn' => $this->ubn,
            'final_year' => $this->final_year,
            'filename' => $this->filename,
            'result_kpi1a' => $this->result_kpi1a,
            'result_kpi1b' => $this->result_kpi1b,
            'result_kpi2' => $this->result_kpi2,
            'result_kpi3' => $this->result_kpi3,
            'result_kpi4' => $this->result_kpi4,
            'result_kpi5' => $this->result_kpi5,
            'result_kpi6a' => $this->result_kpi6a,
            'result_kpi6b' => $this->result_kpi6b,
            'result_kpi6c' => $this->result_kpi6c,
            'result_kpi6d' => $this->result_kpi6d,
            'result_kpi7' => $this->result_kpi7,
            'result_kpi8' => $this->result_kpi8,
            'result_kpi9' => $this->result_kpi9,
            'result_kpi10' => $this->result_kpi10,
            'result_kpi11' => $this->result_kpi11,
            'result_kpi12' => $this->result_kpi12,
            'result_kpi13a' => $this->result_kpi13a,
            'result_kpi13b' => $this->result_kpi13b,
            'result_kpi14' => $this->result_kpi14,
            'result_kpi15' => $this->result_kpi15,
            'score_kpi1' => $this->score_kpi1,
            'score_kpi2' => $this->score_kpi2,
            'score_kpi3' => $this->score_kpi3,
            'score_kpi4' => $this->score_kpi4,
            'score_kpi5' => $this->score_kpi5,
            'score_kpi6' => $this->score_kpi6,
            'score_kpi7' => $this->score_kpi7,
            'score_kpi8' => $this->score_kpi8,
            'score_kpi9' => $this->score_kpi9,
            'score_kpi10' => $this->score_kpi10,
            'score_kpi11' => $this->score_kpi11,
            'score_kpi12' => $this->score_kpi12,
            'score_kpi13' => $this->score_kpi13,
            'score_kpi14' => $this->score_kpi14,
            'score_kpi15' => $this->score_kpi15,
            'total_score' => $this->total_score,
            'total_money' => $this->total_money,
        ];
    }
}
