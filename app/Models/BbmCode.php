<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static where(string $string, $id)
 * @method static whereDoesntHave(string $string, \Closure $param)
 */
class BbmCode extends Model
{
    public function bbmKpis()
    {
        return $this->hasMany(BbmKpi::class, 'code_id', 'id');
    }

    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'code',
        'description',
        'weight',
        'unit',
    ];
}
