<?php

namespace Database\Seeders;

use App\Models\BbmCode;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BbmCodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BbmCode::factory()->create(['id' => 1, 'code' => 'BBM100', 'description' => 'Productief kruidenhoudend grasland', 'weight' => 0.40,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 2, 'code' => 'BBM101', 'description' => 'Grasland met rustperiode tot 8 juni', 'weight' => 0.39,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 3, 'code' => 'BBM102', 'description' => 'Grasland met rustperiode tot 15 juni', 'weight' => 0.52,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 4, 'code' => 'BBM103', 'description' => '(Greppel) Plas-dras', 'weight' => 1.29,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 5, 'code' => 'BBM105', 'description' => 'Kruiden grasland rand', 'weight' => 1.00,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 6, 'code' => 'BBM106', 'description' => 'Extensief beweid grasland', 'weight' => 0.32,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 7, 'code' => 'BBM107', 'description' => 'Bodemverbetering met ruige mest', 'weight' => 0.20,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 8, 'code' => 'BBM108', 'description' => 'Hoog waterpeil', 'weight' => 0.04,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 9, 'code' => 'BBM109', 'description' => 'Poel en klein historisch water', 'weight' => 5.00,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 10, 'code' => 'BBM110', 'description' => 'Natuurvriendelijke oever', 'weight' => 5.00,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 11, 'code' => 'BBM111', 'description' => 'Rietzoom en klein rietperceel', 'weight' => 5.00,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 12, 'code' => 'BBM112', 'description' => 'Duurzaam slootbeheer, baggerspuiten (x 0,0001)', 'weight' => 5.00,'unit' => 'meter']);
        BbmCode::factory()->create(['id' => 13, 'code' => 'BBM113', 'description' => 'Botanisch grasland (extensief)', 'weight' => 1.00,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 14, 'code' => 'BBM115', 'description' => 'Wintervoedselakker', 'weight' => 1.82,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 15, 'code' => 'BBM118', 'description' => 'Kruidenrijke akker', 'weight' => 1.58,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 16, 'code' => 'BBM119', 'description' => 'Kruidenrijke akkerrand', 'weight' => 1.82,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 17, 'code' => 'BBM120', 'description' => 'Hakhoutbeheer', 'weight' => 5.00,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 18, 'code' => 'BBM121', 'description' => 'Knot- en laanbomen (x 0,0001)', 'weight' => 5.00,'unit' => 'stuks']);
        BbmCode::factory()->create(['id' => 19, 'code' => 'BBM122', 'description' => 'Knip- en scheerheg', 'weight' => 5.00,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 20, 'code' => 'BBM123', 'description' => 'Struweelhaag', 'weight' => 5.00,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 21, 'code' => 'BBM124', 'description' => 'Struweelrand', 'weight' => 5.00,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 22, 'code' => 'BBM126', 'description' => 'Half- en hoogstamboomgaard', 'weight' => 2.50,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 23, 'code' => 'BBM127', 'description' => 'Hakhoutbosje', 'weight' => 2.50,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 24, 'code' => 'BBM128', 'description' => 'Griendje', 'weight' => 2.50,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 25, 'code' => 'BBM129', 'description' => 'Bosje', 'weight' => 2.50,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 26, 'code' => 'BBM130', 'description' => 'Nest- en fourageergelegenheid zwarte stern', 'weight' => 0.32,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 27, 'code' => 'BBM131', 'description' => 'Botanisch graslandrand (extensief)', 'weight' => 1.00,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 28, 'code' => 'BBM132', 'description' => 'Duurzaam slootbeheer, ecologisch slootschonen (x 0,0001)', 'weight' => 2.50,'unit' => 'meter']);
        BbmCode::factory()->create(['id' => 29, 'code' => 'BBM141', 'description' => 'Overgangspakket naar kruidenrijk grasland (ext.)', 'weight' => 0.75,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 30, 'code' => 'BBM146', 'description' => 'Solitaire boom op landbouwgrond (x 0,0001)', 'weight' => 5.00,'unit' => 'stuks']);
        BbmCode::factory()->create(['id' => 31, 'code' => 'BBM151', 'description' => 'Kruidenrijk grasland (extensief)', 'weight' => 1.00,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 32, 'code' => 'BBM155', 'description' => 'Oude graslanden met kruiden (>20 jaar)', 'weight' => 0.40,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 33, 'code' => 'BBM171', 'description' => 'Bodemverbetering met organische stof', 'weight' => 0.20,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 35, 'code' => 'BBM220a', 'description' => 'Nest en broedgelegenheid  op erf (licht)', 'weight' => 0.10,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 36, 'code' => 'BBM220b', 'description' => 'Nest en broedgelegenheid  op erf (zwaar)', 'weight' => 0.20,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 37, 'code' => 'BBM230a', 'description' => 'Opgaande beplanting op erf (licht)', 'weight' => 0.10,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 38, 'code' => 'BBM230b', 'description' => 'Opgaande beplanting op erf (zwaar)', 'weight' => 0.20,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 39, 'code' => 'BBM420', 'description' => 'KlimaatBomen (klimaatbonus)', 'weight' => 0.01,'unit' => 'ha']);
        BbmCode::factory()->create(['id' => 40, 'code' => 'BBM422', 'description' => 'Oude graslanden (klimaatbonus)', 'weight' => 0.01,'unit' => 'ha']);
    }
}
