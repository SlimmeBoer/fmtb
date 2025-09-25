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
        $user = User::factory()->create([
            'first_name' => 'Henk',
            'last_name' => 'Janssen',
            'email' => 'henk.janssen@fmtb.frl',
            'password' => Hash::make('FMTB2025!'),
           ]);
        $user->assignRole('bedrijf');
        $user->collectives()->attach(1);
        $user->areas()->attach(1);

        $user = User::factory()->create([
            'first_name' => 'Theo',
            'middle_name' => 'van',
            'last_name' => 'Vliet',
            'email' => 'theo.van.vliet@fmtb.frl',
            'password' => Hash::make('FMTB2025!'),
        ]);
        $user->assignRole('bedrijf');
        $user->collectives()->attach(1);
        $user->areas()->attach(2);

        $user = User::factory()->create([
            'first_name' => 'Karin',
            'middle_name' => 'de',
            'last_name' => 'Laat',
            'email' => 'karin.de.laat@fmtb.frl',
            'password' => Hash::make('FMTB2025!'),
        ]);
        $user->assignRole('bedrijf');
        $user->collectives()->attach(1);
        $user->areas()->attach(3);

        $user = User::factory()->create([
            'first_name' => 'Joost',
            'last_name' => 'Kessel',
            'email' => 'joost.kessel@fmtb.frl',
            'password' => Hash::make('FMTB2025!'),
        ]);
        $user->assignRole('bedrijf');
        $user->collectives()->attach(1);
        $user->areas()->attach(1);

        $user = User::factory()->create([
            'first_name' => 'Bert',
            'middle_name' => 'de',
            'last_name' => 'Vries',
            'email' => 'bert.de.vries@fmtb.frl',
            'password' => Hash::make('FMTB2025!'),
        ]);
        $user->assignRole('bedrijf');
        $user->collectives()->attach(1);
        $user->areas()->attach(2);

        $user = User::factory()->create([
            'first_name' => 'Thea',
            'middle_name' => 'de',
            'last_name' => 'Stigter',
            'email' => 'thea.de.stigter@fmtb.frl',
            'password' => Hash::make('FMTB2025!'),
        ]);
        $user->assignRole('bedrijf');
        $user->collectives()->attach(2);
        $user->areas()->attach(3);

        $user = User::factory()->create([
            'first_name' => 'Fred',
            'last_name' => 'Westbroek',
            'email' => 'fred.westbroek@fmtb.frl',
            'password' => Hash::make('FMTB2025!'),
        ]);
        $user->assignRole('bedrijf');
        $user->collectives()->attach(2);
        $user->areas()->attach(1);

        $user = User::factory()->create([
            'first_name' => 'Roderick',
            'last_name' => 'Wessels',
            'email' => 'roderick.wessels@fmtb.frl',
            'password' => Hash::make('FMTB2025!'),
        ]);
        $user->assignRole('bedrijf');
        $user->collectives()->attach(2);
        $user->areas()->attach(2);

        $user = User::factory()->create([
            'first_name' => 'Piet',
            'middle_name' => 'van',
            'last_name' => 'Zetten',
            'email' => 'piet.van.zetten@fmtb.frl',
            'password' => Hash::make('FMTB2025!'),
        ]);
        $user->assignRole('bedrijf');
        $user->collectives()->attach(2);
        $user->areas()->attach(3);

        $user = User::factory()->create([
            'first_name' => 'Agnes',
            'middle_name' => 'van der',
            'last_name' => 'Steen',
            'email' => 'agnes.van.der.steen@fmtb.frl',
            'password' => Hash::make('FMTB2025!'),
        ]);
        $user->assignRole('bedrijf');
        $user->collectives()->attach(2);
        $user->areas()->attach(1);

        // 2. Collectieven
        $user = User::factory()->create([
            'first_name' => 'Coöperatieve vereniging ',
            'middle_name' => '',
            'last_name' => 'Súdwestkust',
            'email' => 'swk@fmtb.frl',
            'password' => Hash::make('FMTB2025!')
        ]);
        $user->assignRole('collectief');
        $user->collectives()->attach(1);

        $user = User::factory()->create([
            'first_name' => 'ELAN',
            'middle_name' => '',
            'last_name' => 'Zuidoost Friesland',
            'email' => 'zo@fmtb.frl',
            'password' => Hash::make('FMTB2025!')
        ]);
        $user->assignRole('collectief');
        $user->collectives()->attach(2);

        // 3. Programmaleider UMDL
        $user = User::factory()->create([
            'first_name' => 'Programmaleider',
            'middle_name' => '',
            'last_name' => 'FMTB',
            'email' => 'programma@fmtb.frl',
            'password' => Hash::make('FMTB2025!')
        ]);
        $user->assignRole('programmaleider');

        // 4. Provincie
        $user = User::factory()->create([
            'first_name' => 'Provincie',
            'middle_name' => '',
            'last_name' => 'Fryslân',
            'email' => 'provincie@fmtb.frl',
            'password' => Hash::make('FMTB2025!')
        ]);
        $user->assignRole('provincie');

        // 5. Administrators
        $user = User::factory()->create([
            'first_name' => 'Niels',
            'last_name' => 'Colijn',
            'email' => 'niels.colijn@precondition.nl',
            'password' => Hash::make('FMTB2025!')
        ]);
        $user->assignRole('admin');

        $user = User::factory()->create([
            'first_name' => 'Harm',
            'last_name' => 'Rijneveld',
            'email' => 'info@terugnaardebasisadvies.nl',
            'password' => Hash::make('FMTB2025!')
        ]);
        $user->assignRole('admin');

        $user = User::factory()->create([
            'first_name' => 'Frida',
            'middle_name' => 'de',
            'last_name' => 'Vries',
            'email' => 'frida.devries@fryslan.frl',
            'password' => Hash::make('FMTB2025!')
        ]);
        $user->assignRole('admin');

        $user = User::factory()->create([
            'first_name' => 'Thomas',
            'middle_name' => '',
            'last_name' => 'Veenstra',
            'email' => 't.veenstra@fryslan.frl',
            'password' => Hash::make('FMTB2025!')
        ]);
        $user->assignRole('admin');

        $user = User::factory()->create([
            'first_name' => 'Jacob',
            'middle_name' => '',
            'last_name' => 'Wassenaar',
            'email' => 'j.wassenaar@fryslan.frl',
            'password' => Hash::make('FMTB2025!')
        ]);
        $user->assignRole('admin');
    }
}
