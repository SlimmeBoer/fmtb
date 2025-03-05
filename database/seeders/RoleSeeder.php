<?php

namespace Database\Seeders;

use Spatie\Permission\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name' => 'bedrijf']);
        Role::create(['name' => 'collectief']);
        Role::create(['name' => 'programmaleider']);
        Role::create(['name' => 'provincie']);
        Role::create(['name' => 'admin']);
    }
}
