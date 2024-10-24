<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static firstOrCreate(array $array)
 * @method static select(string $string)
 * @method static firstOrNew(array $array)
 * @method static insert(array $klwValueData)
 */
class KlwValue extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'dump_id',
        'field_id',
        'value',
    ];

    public function klwDump()
    {
        return $this->belongsTo(KlwDump::class, 'dump_id', 'id');
    }

    public function klwField()
    {
        return $this->belongsTo(KlwField::class, 'field_id');
    }
}
