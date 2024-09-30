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
        Schema::create('umdl_kpi_values', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId("company_id");
            $table->integer("year");
            $table->float("kpi1a")->nullable();
            $table->float("kpi1b")->nullable();
            $table->float("kpi2")->nullable();
            $table->float("kpi3")->nullable();
            $table->float("kpi4")->nullable();
            $table->float("kpi5")->nullable();
            $table->float("kpi6a")->nullable();
            $table->float("kpi6b")->nullable();
            $table->float("kpi6c")->nullable();
            $table->float("kpi6d")->nullable();
            $table->float("kpi7")->nullable();
            $table->float("kpi8")->nullable();
            $table->float("kpi9")->nullable();
            $table->float("kpi10")->nullable();
            $table->float("kpi11")->nullable();
            $table->float("kpi12")->nullable();
            $table->float("kpi13a")->nullable();
            $table->float("kpi13b")->nullable();
            $table->float("kpi14")->nullable();
            $table->float("kpi15")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('umdl_kpi_values');
    }
};
