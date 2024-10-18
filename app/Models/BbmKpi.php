<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static where($param)
 * @method static create(array $array)
 */
class BbmKpi extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    public function bbmCode()
    {
        return $this->belongsTo(BbmCode::class, 'code_id', 'id');
    }

    protected $fillable = [
        'code_id',
        'kpi',
    ];

}
