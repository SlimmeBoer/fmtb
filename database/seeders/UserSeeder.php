<?php

namespace Database\Seeders;

use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Bedrijven
        $user = User::factory()->create(['first_name' => 'Henk','last_name' => 'Janssen','email' => 'henk.janssen@fmtb.frl','password' => Hash::make('FMTB2025!'),'brs' => '2121365']);
        $user->assignRole('bedrijf');
        $user->collectives()->attach(1);

        $user = User::factory()->create([
            'first_name' => 'Theo',
            'middle_name' => 'van',
            'last_name' => 'Vliet',
            'email' => 'theo.van.vliet@fmtb.frl',
            'password' => Hash::make('FMTB2025!'),
            'brs' => '377142'
        ]);
        $user->assignRole('bedrijf');
        $user->collectives()->attach(1);

        $user = User::factory()->create([
            'first_name' => 'Karin',
            'middle_name' => 'de',
            'last_name' => 'Laat',
            'email' => 'karin.de.laat@fmtb.frl',
            'password' => Hash::make('FMTB2025!'),
            'brs' => '213503867'
        ]);
        $user->assignRole('bedrijf');
        $user->collectives()->attach(1);

        $user = User::factory()->create([
            'first_name' => 'Joost',
            'last_name' => 'Kessel',
            'email' => 'joost.kessel@fmtb.frl',
            'password' => Hash::make('FMTB2025!'),
            'brs' => '377173'
        ]);
        $user->assignRole('bedrijf');
        $user->collectives()->attach(1);

        $user = User::factory()->create([
            'first_name' => 'Bert',
            'middle_name' => 'de',
            'last_name' => 'Vries',
            'email' => 'bert.de.vries@fmtb.frl',
            'password' => Hash::make('FMTB2025!'),
            'brs' => '379580'
        ]);
        $user->assignRole('bedrijf');
        $user->collectives()->attach(1);

        $user = User::factory()->create([
            'first_name' => 'Thea',
            'middle_name' => 'de',
            'last_name' => 'Stigter',
            'email' => 'thea.de.stigter@fmtb.frl',
            'password' => Hash::make('FMTB2025!'),
            'brs' => '377324'
        ]);
        $user->assignRole('bedrijf');
        $user->collectives()->attach(2);

        $user = User::factory()->create([
            'first_name' => 'Fred',
            'last_name' => 'Westbroek',
            'email' => 'fred.westbroek@fmtb.frl',
            'password' => Hash::make('FMTB2025!'),
            'brs' => '473716'
        ]);
        $user->assignRole('bedrijf');
        $user->collectives()->attach(2);

        $user = User::factory()->create([
            'first_name' => 'Roderick',
            'last_name' => 'Wessels',
            'email' => 'roderick.wessels@fmtb.frl',
            'password' => Hash::make('FMTB2025!'),
            'brs' => '331267'
        ]);
        $user->assignRole('bedrijf');
        $user->collectives()->attach(2);

        $user = User::factory()->create([
            'first_name' => 'Piet',
            'middle_name' => 'van',
            'last_name' => 'Zetten',
            'email' => 'piet.van.zetten@fmtb.frl',
            'password' => Hash::make('FMTB2025!'),
            'brs' => '327381'
        ]);
        $user->assignRole('bedrijf');
        $user->collectives()->attach(2);

        $user = User::factory()->create([
            'first_name' => 'Agnes',
            'middle_name' => 'van der',
            'last_name' => 'Steen',
            'email' => 'agnes.van.der.steen@fmtb.frl',
            'password' => Hash::make('FMTB2025!'),
            'brs' => '343248'
        ]);
        $user->assignRole('bedrijf');
        $user->collectives()->attach(2);

        // 2. Collectieven
        $user = User::factory()->create([
            'first_name' => 'Hendrik',
            'middle_name' => 'den',
            'last_name' => 'Hartog',
            'email' => 'hendrik.den.hartog@fmtb.frl',
            'password' => Hash::make('FMTB2025!')
        ]);
        $user->assignRole('collectief');
        $user->collectives()->attach(1);

        $user = User::factory()->create([
            'first_name' => 'Frits',
            'middle_name' => 'van',
            'last_name' => 'Zwaag',
            'email' => 'frits.van.zwaag@fmtb.frl',
            'password' => Hash::make('FMTB2025!')
        ]);
        $user->assignRole('collectief');
        $user->collectives()->attach(2);

        // 3. Projectleider UMDL
        $user = User::factory()->create([
            'first_name' => 'Maarten',
            'middle_name' => 'van',
            'last_name' => 'Beek',
            'email' => 'maarten.van.beek@fmtb.frl',
            'password' => Hash::make('FMTB2025!')
        ]);
        $user->assignRole('programmaleider');

        // 4. Provincie
        $user = User::factory()->create([
            'first_name' => 'Carleen',
            'last_name' => 'Weebers',
            'email' => 'carleen.weebers@fmtb.frl',
            'password' => Hash::make('FMTB2025!')
        ]);
        $user->assignRole('provincie');

        // 5. Administrators
        $user = User::factory()->create([
            'first_name' => 'Niels',
            'last_name' => 'Colijn',
            'email' => 'niels.colijn@fmtb.frl',
            'password' => Hash::make('FMTB2025!')
        ]);
        $user->assignRole('admin');

        $user = User::factory()->create([
            'first_name' => 'Harm',
            'last_name' => 'Rijneveld',
            'email' => 'harm.rijneveld@fmtb.frl',
            'password' => Hash::make('FMTB2025!')
        ]);
        $user->assignRole('admin');
    }
}
