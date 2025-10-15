<?php

namespace Database\Seeders;

use App\Models\Area;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Area::factory()->create(['id' => 1, 'name' => 'Noordelijke Wouden',
            'description' => '',
            'weight_kpi1' => 1, 'weight_kpi2a' => 1, 'weight_kpi2b' => 1, 'weight_kpi2c' => 1, 'weight_kpi2d' => 1, 'weight_kpi2e' => 1,
            'weight_kpi3' => 1, 'weight_kpi4' => 1, 'weight_kpi5' => 1, 'weight_kpi6' => 1, 'weight_kpi7' => 1, 'weight_kpi8' => 1,
            'weight_kpi9' => 1, 'weight_kpi11' => 1, 'weight_kpi12a' => 1, 'weight_kpi12b' => 1, 'weight_kpi13' => 1, 'weight_kpi14' => 1]);

        Area::factory()->create(['id' => 2, 'name' => 'Zuidelijke Wouden',
            'description' => '',
            'weight_kpi1' => 1, 'weight_kpi2a' => 1, 'weight_kpi2b' => 1, 'weight_kpi2c' => 1, 'weight_kpi2d' => 1, 'weight_kpi2e' => 1,
            'weight_kpi3' => 1, 'weight_kpi4' => 1, 'weight_kpi5' => 1, 'weight_kpi6' => 1, 'weight_kpi7' => 1, 'weight_kpi8' => 1,
            'weight_kpi9' => 1, 'weight_kpi11' => 1, 'weight_kpi12a' => 1, 'weight_kpi12b' => 1, 'weight_kpi13' => 1, 'weight_kpi14' => 1]);

        Area::factory()->create(['id' => 3, 'name' => 'Oostergo/Noordelijke Kleischil',
            'description' => '',
            'weight_kpi1' => 1, 'weight_kpi2a' => 1, 'weight_kpi2b' => 1, 'weight_kpi2c' => 1, 'weight_kpi2d' => 1, 'weight_kpi2e' => 1,
            'weight_kpi3' => 1, 'weight_kpi4' => 1, 'weight_kpi5' => 1, 'weight_kpi6' => 1, 'weight_kpi7' => 1, 'weight_kpi8' => 1,
            'weight_kpi9' => 1, 'weight_kpi11' => 1, 'weight_kpi12a' => 1, 'weight_kpi12b' => 1, 'weight_kpi13' => 1, 'weight_kpi14' => 1]);

        Area::factory()->create(['id' => 4, 'name' => 'Westergo/Greidhoeke',
            'description' => '',
            'weight_kpi1' => 1, 'weight_kpi2a' => 1, 'weight_kpi2b' => 1, 'weight_kpi2c' => 1, 'weight_kpi2d' => 1, 'weight_kpi2e' => 1,
            'weight_kpi3' => 1, 'weight_kpi4' => 1, 'weight_kpi5' => 1, 'weight_kpi6' => 1, 'weight_kpi7' => 1, 'weight_kpi8' => 1,
            'weight_kpi9' => 1, 'weight_kpi11' => 1, 'weight_kpi12a' => 1, 'weight_kpi12b' => 1, 'weight_kpi13' => 1, 'weight_kpi14' => 1]);

        Area::factory()->create(['id' => 5, 'name' => 'Veenweidegebied',
            'description' => '',
            'weight_kpi1' => 1, 'weight_kpi2a' => 1, 'weight_kpi2b' => 1, 'weight_kpi2c' => 1, 'weight_kpi2d' => 1, 'weight_kpi2e' => 1,
            'weight_kpi3' => 1, 'weight_kpi4' => 1, 'weight_kpi5' => 1, 'weight_kpi6' => 1, 'weight_kpi7' => 1, 'weight_kpi8' => 1,
            'weight_kpi9' => 1, 'weight_kpi11' => 1, 'weight_kpi12a' => 1, 'weight_kpi12b' => 1, 'weight_kpi13' => 1, 'weight_kpi14' => 1]);

        Area::factory()->create(['id' => 6, 'name' => 'Gaasterland',
            'description' => '',
            'weight_kpi1' => 1, 'weight_kpi2a' => 1, 'weight_kpi2b' => 1, 'weight_kpi2c' => 1, 'weight_kpi2d' => 1, 'weight_kpi2e' => 1,
            'weight_kpi3' => 1, 'weight_kpi4' => 1, 'weight_kpi5' => 1, 'weight_kpi6' => 1, 'weight_kpi7' => 1, 'weight_kpi8' => 1,
            'weight_kpi9' => 1, 'weight_kpi11' => 1, 'weight_kpi12a' => 1, 'weight_kpi12b' => 1, 'weight_kpi13' => 1, 'weight_kpi14' => 1]);

        Area::factory()->create(['id' => 7, 'name' => 'Waddengebied',
            'description' => '',
            'weight_kpi1' => 1, 'weight_kpi2a' => 1, 'weight_kpi2b' => 1, 'weight_kpi2c' => 1, 'weight_kpi2d' => 1, 'weight_kpi2e' => 1,
            'weight_kpi3' => 1, 'weight_kpi4' => 1, 'weight_kpi5' => 1, 'weight_kpi6' => 1, 'weight_kpi7' => 1, 'weight_kpi8' => 1,
            'weight_kpi9' => 1, 'weight_kpi11' => 1, 'weight_kpi12a' => 1, 'weight_kpi12b' => 1, 'weight_kpi13' => 1, 'weight_kpi14' => 1]);
    }
}
