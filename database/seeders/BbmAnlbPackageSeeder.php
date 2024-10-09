<?php

namespace Database\Seeders;

use App\Models\BbmAnlbPackage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BbmAnlbPackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BbmAnlbPackage::factory()->create(['anlb_number' => '01', 'anlb_letters' => 'abqrs', 'code_id' => 2]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '01', 'anlb_letters' => 'cdefghijklmnopt', 'code_id' => 3]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '03', 'anlb_letters' => 'abcdefghijklmnopqrstuvwxyz', 'code_id' => 4]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '05', 'anlb_letters' => 'hi', 'code_id' => 5]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '06', 'anlb_letters' => 'abcdefghijklmnopqrstuvwxyz', 'code_id' => 6]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '39', 'anlb_letters' => 'ab', 'code_id' => 7]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '08', 'anlb_letters' => 'abcdefghijklmnopqrstuvwxyz', 'code_id' => 8]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '09           ', 'anlb_letters' => 'abcdefghijklmnopqrstuvwxyz', 'code_id' => 9]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '10', 'anlb_letters' => 'abcdefghijklmnopqrstuvwxyz', 'code_id' => 10]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '11', 'anlb_letters' => 'abcdefghijklmnopqrstuvwxyz', 'code_id' => 11]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '13', 'anlb_letters' => 'defghijklmnopqrstuvwxyz', 'code_id' => 13]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '32', 'anlb_letters' => 'abcdefghijklmnopqrstuvwxyz', 'code_id' => 13]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '15', 'anlb_letters' => 'abcdefghijklmnopqrstuvwxyz', 'code_id' => 14]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '18', 'anlb_letters' => 'abcdefghijklmnopqrstuvwxyz', 'code_id' => 15]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '19', 'anlb_letters' => 'abcdefghijklmnopqrstuvwxyz', 'code_id' => 16]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '20', 'anlb_letters' => 'abcdefghijklmnopqrstuvwxyz', 'code_id' => 17]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '21', 'anlb_letters' => 'abcdefghijklmnopqrstuvwxyz', 'code_id' => 18]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '22', 'anlb_letters' => 'abcdefghijklmnopqrstuvwxyz', 'code_id' => 19]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '23', 'anlb_letters' => 'abcdefghijklmnopqrstuvwxyz', 'code_id' => 20]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '24', 'anlb_letters' => 'abcdefghijklmnopqrstuvwxyz', 'code_id' => 21]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '26', 'anlb_letters' => 'abcdefghijklmnopqrstuvwxyz', 'code_id' => 22]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '27', 'anlb_letters' => 'abcdefghijklmnopqrstuvwxyz', 'code_id' => 23]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '28', 'anlb_letters' => 'abcdefghijklmnopqrstuvwxyz', 'code_id' => 24]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '29', 'anlb_letters' => 'abcdefghijklmnopqrstuvwxyz', 'code_id' => 25]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '30', 'anlb_letters' => 'abcdefghijklmnopqrstuvwxyz', 'code_id' => 26]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '13', 'anlb_letters' => 'abc', 'code_id' => 27]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '12', 'anlb_letters' => 'a', 'code_id' => 12]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '12', 'anlb_letters' => 'bcd', 'code_id' => 28]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '41', 'anlb_letters' => 'abcdefghijklmnopqrstuvwxyz', 'code_id' => 29]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '25', 'anlb_letters' => 'abcdefghijklmnopqrstuvwxyz', 'code_id' => 30]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '05', 'anlb_letters' => 'abcdefgjkl', 'code_id' => 31]);
        BbmAnlbPackage::factory()->create(['anlb_number' => '39', 'anlb_letters' => 'cd', 'code_id' => 33]);

    }
}
