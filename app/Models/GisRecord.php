<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static firstOrNew(array $array)
 * @method static where(string $string, $dump_id)
 * @method static insert(array $gisRecords)
 */
class GisRecord extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'dump_id',
        'company_id',
        'eenheid_code',
        'lengte',
        'breedte',
        'oppervlakte',
        'eenheden',
    ];

    // Define the inverse of the relationship with GisDump
    public function gisDump()
    {
        return $this->belongsTo(GisDump::class, 'dump_id');
    }
}
