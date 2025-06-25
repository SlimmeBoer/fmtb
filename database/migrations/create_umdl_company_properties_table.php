<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('umdl_company_properties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id');
            $table->integer('year');
            $table->integer('mbp')->nullable();
            $table->boolean('website')->nullable();
            $table->boolean('ontvangstruimte')->nullable();
            $table->boolean('winkel')->nullable();
            $table->boolean('educatie')->nullable();
            $table->boolean('meerjarige_monitoring')->nullable();
            $table->boolean('open_dagen')->nullable();
            $table->boolean('wandelpad')->nullable();
            $table->boolean('erkend_demobedrijf')->nullable();
            $table->boolean('bed_and_breakfast')->nullable();
            $table->boolean('zorg')->nullable();
            $table->boolean('geen_sma')->nullable();
            $table->float('opp_totaal')->nullable();
            $table->float('opp_totaal_subsidiabel')->nullable();
            $table->float('melkkoeien')->nullable();
            $table->float('meetmelk_per_koe')->nullable();
            $table->float('meetmelk_per_ha')->nullable();
            $table->float('jongvee_per_10mk')->nullable();
            $table->float('gve_per_ha')->nullable();
            $table->float('kunstmest_per_ha')->nullable();
            $table->float('opbrengst_grasland_per_ha')->nullable();
            $table->float('re_kvem')->nullable();
            $table->float('krachtvoer_per_100kg_melk')->nullable();
            $table->float('veebenutting_n')->nullable();
            $table->float('bodembenutting_n')->nullable();
            $table->float('bedrijfsbenutting_n')->nullable();
            $table->float('g_co2_per_kg_meetmelk')->nullable();
            $table->float('kg_co2_per_ha')->nullable();
            $table->string('grondsoort')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('umdl_company_properties');
    }
};
