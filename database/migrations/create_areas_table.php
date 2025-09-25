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
        Schema::create('areas', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string("description")->nullable();
            $table->integer("weight_kpi1")->nullable();
            $table->integer("weight_kpi2a")->nullable();
            $table->integer("weight_kpi2b")->nullable();
            $table->integer("weight_kpi2c")->nullable();
            $table->integer("weight_kpi2d")->nullable();
            $table->integer("weight_kpi3")->nullable();
            $table->integer("weight_kpi4")->nullable();
            $table->integer("weight_kpi5")->nullable();
            $table->integer("weight_kpi6")->nullable();
            $table->integer("weight_kpi7")->nullable();
            $table->integer("weight_kpi8")->nullable();
            $table->integer("weight_kpi9")->nullable();
            $table->integer("weight_kpi11")->nullable();
            $table->integer("weight_kpi12a")->nullable();
            $table->integer("weight_kpi12b")->nullable();
            $table->integer("weight_kpi13")->nullable();
            $table->integer("weight_kpi14")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('areas');
    }
};
