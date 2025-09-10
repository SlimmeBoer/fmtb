<?php

namespace Database\Seeders;

use App\Models\Collective;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CollectiveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Collective::factory()->create(['id' => 1, 'name' => 'Rijn, Vecht en Venen', 'description' => '', 'logo' => '/images/logo_rijn_vecht_venen.png']);
        Collective::factory()->create(['id' => 2, 'name' => 'Lopikerwaard', 'description' => '', 'logo' => '/images/logo_lopikerwaard.png']);
        Collective::factory()->create(['id' => 3, 'name' => 'Utrecht-Oost', 'description' => '', 'logo' => '/images/logo_utrecht_oost.png']);
        Collective::factory()->create(['id' => 4, 'name' => 'Eemland', 'description' => '', 'logo' => '/images/logo_eemland.png']);
        Collective::factory()->create(['id' => 5, 'name' => 'Alblasserwaard-Vijfheerenlanden', 'description' => '', 'logo' => '/images/logo_alblasserwaard.png']);
        Collective::factory()->create(['id' => 99, 'name' => 'Overig (postcode niet gevonden)', 'description' => '', 'logo' => '/images/logo_umbb.png']);

    }
}
