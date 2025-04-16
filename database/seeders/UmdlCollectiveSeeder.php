<?php

namespace Database\Seeders;

use App\Models\UmdlCollective;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UmdlCollectiveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UmdlCollective::factory()->create(['id' => 1, 'name' => 'Rijn, Vecht en Venen', 'description' => '', 'logo' => '/images/logo_rijn_vecht_venen.png']);
        UmdlCollective::factory()->create(['id' => 2, 'name' => 'Lopikerwaard', 'description' => '', 'logo' => '/images/logo_lopikerwaard.png']);
        UmdlCollective::factory()->create(['id' => 3, 'name' => 'Utrecht-Oost', 'description' => '', 'logo' => '/images/logo_utrecht_oost.png']);
        UmdlCollective::factory()->create(['id' => 4, 'name' => 'Eemland', 'description' => '', 'logo' => '/images/logo_eemland.png']);
        UmdlCollective::factory()->create(['id' => 5, 'name' => 'Alblasserwaard-Vijfheerenlanden', 'description' => '', 'logo' => '/images/logo_alblasserwaard.png']);

    }
}
