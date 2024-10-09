<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BbmAnlbPackageResource extends JsonResource
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
            'anlb_number' => $this->anlb_number,
            'anlb_letters' => $this->anlb_letters,
            'code_id' => $this->code_id,
        ];
    }
}
