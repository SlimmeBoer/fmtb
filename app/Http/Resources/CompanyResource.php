<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyResource extends JsonResource
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
            'workspace_id' => $this->workspace_id,
            'name' => $this->name,
            'address' => $this->address,
            'postal_code' => $this->postal_code,
            'city' => $this->city,
            'province' => $this->province,
            'brs' => $this->brs,
            'ubn' => $this->ubn,
            'phone' => $this->phone,
            'bank_account' => $this->bank_account,
            'bank_account_name' => $this->bank_account_name,
            'email' => $this->email,
            'type' => $this->type,
            'bio' => $this->bio,
        ];
    }
}
