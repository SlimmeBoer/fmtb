<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static create(array $data)
 * @method static firstOrCreate(array $array)
 */
class KlwDump extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'company_id',
        'year',
        'filename',
    ];

    // A dump belongs to a company
    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }

    // A dump has many field values
    public function klwValues()
    {
        return $this->hasMany(KlwValue::class, 'dump_id', 'id');
    }
    public function signals()
    {
        return $this->hasMany(Signal::class, 'dump_id', 'id');
    }


}
