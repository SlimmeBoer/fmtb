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
        Collective::factory()->create(['id' => 1, 'name' => 'Coöperatieve vereniging Súdwestkust', 'description' => '', 'logo' => '/images/logo_sudwestkust.webp']);
        Collective::factory()->create(['id' => 2, 'name' => 'ELAN Zuidoost Friesland', 'description' => '', 'logo' => '/images/logo_zuidoost.webp']);
        Collective::factory()->create(['id' => 3, 'name' => 'ANC Westergo', 'description' => '', 'logo' => '/images/logo_westergo.webp']);
        Collective::factory()->create(['id' => 4, 'name' => 'Noardlike Fryske Wâlden', 'description' => '', 'logo' => '/images/logo_nfw.png']);
        Collective::factory()->create(['id' => 5, 'name' => 'Agrarisch Collectief Waadrâne', 'description' => '', 'logo' => '/images/logo_waadrane.webp']);
        Collective::factory()->create(['id' => 6, 'name' => 'Agrarische Natuurvereniging Waddenvogels', 'description' => '', 'logo' => '/images/logo_waddenvogels.webp']);
        Collective::factory()->create(['id' => 7, 'name' => 'Gebiedscoöperatie It Lege Midden', 'description' => '', 'logo' => '/images/logo_ilm.webp']);

    }
}
