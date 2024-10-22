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
        Schema::create('gis_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dump_id');
            $table->foreignId('company_id');
            $table->string('eenheid_code');
            $table->float('lengte');
            $table->float('breedte');
            $table->float('oppervlakte');
            $table->float('eenheden');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gis_records');
    }
};
