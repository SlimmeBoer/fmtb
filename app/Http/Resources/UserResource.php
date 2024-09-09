<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed $email
 * @property mixed $image
 * @property mixed $last_name
 * @property mixed $middle_name
 * @property mixed $first_name
 * @property mixed $id
 */
class UserResource extends JsonResource
{
    public static $wrap = false;
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
            'first_name' => $this->first_name,
            'middle_name' => $this->middle_name,
            'last_name' => $this->last_name,
            'image' => $this->image,
            'email' => $this->email,
        ];
    }
}
