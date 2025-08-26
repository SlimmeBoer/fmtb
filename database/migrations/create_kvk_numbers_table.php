<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('kvk_numbers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id');
            $table->bigInteger('kvk');
            $table->timestamps();
            $table->unique(['company_id', 'kvk']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('kvk_numbers');
    }
};
