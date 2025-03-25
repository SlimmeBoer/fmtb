<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BbmAnlbPackage extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'anlb_number',
        'anlb_letters',
        'code_id',
    ];

    public function code()
    {
        return $this->belongsTo(BbmCode::class, 'code_id');
    }
}
