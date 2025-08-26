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
        Schema::create('old_results', function (Blueprint $table) {
            $table->id();
            $table->integer('brs');
            $table->integer("final_year");
            $table->string("filename")->nullable();
            $table->float("result_kpi1a")->nullable();
            $table->float("result_kpi1b")->nullable();
            $table->float("result_kpi2")->nullable();
            $table->float("result_kpi3")->nullable();
            $table->float("result_kpi4")->nullable();
            $table->float("result_kpi5")->nullable();
            $table->float("result_kpi6a")->nullable();
            $table->float("result_kpi6b")->nullable();
            $table->float("result_kpi6c")->nullable();
            $table->float("result_kpi6d")->nullable();
            $table->float("result_kpi7")->nullable();
            $table->string("result_kpi8")->nullable();
            $table->float("result_kpi9")->nullable();
            $table->float("result_kpi10")->nullable();
            $table->float("result_kpi11")->nullable();
            $table->float("result_kpi12")->nullable();
            $table->float("result_kpi13a")->nullable();
            $table->float("result_kpi13b")->nullable();
            $table->float("result_kpi14")->nullable();
            $table->string("result_kpi15")->nullable();
            $table->integer("score_kpi1")->nullable();
            $table->integer("score_kpi2")->nullable();
            $table->integer("score_kpi3")->nullable();
            $table->integer("score_kpi4")->nullable();
            $table->integer("score_kpi5")->nullable();
            $table->integer("score_kpi6")->nullable();
            $table->integer("score_kpi7")->nullable();
            $table->integer("score_kpi8")->nullable();
            $table->integer("score_kpi9")->nullable();
            $table->integer("score_kpi10")->nullable();
            $table->integer("score_kpi11")->nullable();
            $table->integer("score_kpi12")->nullable();
            $table->integer("score_kpi13")->nullable();
            $table->integer("score_kpi14")->nullable();
            $table->integer("score_kpi15")->nullable();
            $table->integer("total_score")->nullable();
            $table->integer("total_money")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('old_results');
    }
};
