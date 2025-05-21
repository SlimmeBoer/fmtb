<?php

namespace Database\Seeders;

use App\Models\BbmGisPackage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BbmGisPackagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BbmGisPackage::factory()->create(['code_id' => 10, 'package' => 'Z.25.05 NVO vooroever 1-3 m']);
        BbmGisPackage::factory()->create(['code_id' => 10, 'package' => 'Z.25.10a.25.002']);
        BbmGisPackage::factory()->create(['code_id' => 13, 'package' => 'Z.25.13c']);
        BbmGisPackage::factory()->create(['code_id' => 2, 'package' => 'Z.25.1b']);
        BbmGisPackage::factory()->create(['code_id' => 3, 'package' => 'Z.25.1c rustperiode 15 juni Vechtvallei']);
        BbmGisPackage::factory()->create(['code_id' => 26, 'package' => 'Z.25.30']);
        BbmGisPackage::factory()->create(['code_id' => 4, 'package' => 'Z.25.3f']);
        BbmGisPackage::factory()->create(['code_id' => 4, 'package' => 'Z.25.3f Vechtvallei']);
        BbmGisPackage::factory()->create(['code_id' => 6, 'package' => 'Z.25.6c']);
        BbmGisPackage::factory()->create(['code_id' => 8, 'package' => 'Z.25.A08d']);
        BbmGisPackage::factory()->create(['code_id' => 31, 'package' => 'Z.25.compensatie 5a naar 4a']);
        BbmGisPackage::factory()->create(['code_id' => 16, 'package' => 'Z.25.Kruidenrijke Akkerrand 3m']);
        BbmGisPackage::factory()->create(['code_id' => 12, 'package' => 'Z.25.L12a baggeren met de baggerpomp']);
        BbmGisPackage::factory()->create(['code_id' => 12, 'package' => 'Z.25.L12a.25.01 Slotenplan 12a']);
        BbmGisPackage::factory()->create(['code_id' => 12, 'package' => 'Z.25.L12a.25.02 Slotenplan 12a icm 13c']);
        BbmGisPackage::factory()->create(['code_id' => 28, 'package' => 'Z.25.L12b Ecologisch stootschonen']);
        BbmGisPackage::factory()->create(['code_id' => 12, 'package' => 'Z.25.L12b.25.01 Slotenplan 12b']);
        BbmGisPackage::factory()->create(['code_id' => 12, 'package' => 'Z.25.L12b.25.02 Slotenplan 12b icm 13c']);
        BbmGisPackage::factory()->create(['code_id' => 11, 'package' => 'Z.25.Natuurboeren 05.02']);
        BbmGisPackage::factory()->create(['code_id' => 23, 'package' => 'Z.25.L27b']);
        BbmGisPackage::factory()->create(['code_id' => 25, 'package' => 'Z.25.natuurboeren 14.02']);
        BbmGisPackage::factory()->create(['code_id' => 31, 'package' => 'Z.25.Natuurboeren 12.02']);
        BbmGisPackage::factory()->create(['code_id' => 31, 'package' => 'Z.25.Natuurboeren 10.01']);
        BbmGisPackage::factory()->create(['code_id' => 20, 'package' => 'Z.25.L23a']);
        BbmGisPackage::factory()->create(['code_id' => 23, 'package' => 'Z.25.natuurboeren 17.06']);
        BbmGisPackage::factory()->create(['code_id' => 31, 'package' => 'Z.25.Natuurboeren 10.02']);
        BbmGisPackage::factory()->create(['code_id' => 27, 'package' => 'Z.25.Natuurboeren 13.01']);
        BbmGisPackage::factory()->create(['code_id' => 39, 'package' => 'Z.26.220.KlimaatBomen']);
        BbmGisPackage::factory()->create(['code_id' => 40, 'package' => 'Z.26.222.Oude Graslanden']);
    }
}
