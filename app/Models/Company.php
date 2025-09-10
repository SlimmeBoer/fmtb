<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static firstOrCreate(string[] $array)
 * @method static firstOrNew(array $array)
 * @method static where(array $array)
 * @method static select(string $string, string $string1)
 */
class Company extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'address',
        'postal_code',
        'city',
        'province',
        'brs',
        'ubn',
        'phone',
        'bank_account',
        'bank_account_name',
        'email',
        'type',
        'bio',
        'data_compleet',
    ];

    public function collectives()
    {
        return $this->belongsToMany(Collective::class, 'collective_companies', 'company_id','collective_id');
    }

    public function klwDumps()
    {
        return $this->hasMany(KlwDump::class, 'company_id', 'id');
    }

    public function oldResultByBrs()
    {
        return $this->hasOne(OldResult::class, 'brs', 'brs');
    }

    protected $appends = ['old_data']; // ← toevoegen

// Accessor die slim omgaat met eager loaded relatie
    public function getOldDataAttribute(): bool
    {
        if ($this->relationLoaded('oldResultByBrs')) {
            return $this->oldResultByBrs !== null;
        }
        return $this->oldResultByBrs()->exists();
    }

}
