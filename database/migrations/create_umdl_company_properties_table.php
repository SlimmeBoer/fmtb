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
            $table->integer('mbp');
            $table->boolean('website');
            $table->boolean('ontvangstruimte');
            $table->boolean('winkel');
            $table->boolean('educatie');
            $table->boolean('meerjarige_monitoring');
            $table->boolean('open_dagen');
            $table->boolean('wandelpad');
            $table->boolean('erkend_demobedrijf');
            $table->boolean('bed_and_breakfast');
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
