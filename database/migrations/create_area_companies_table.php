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
        Schema::create('area_companies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('area_id');
            $table->foreignId('company_id');
            $table->timestamps();
            $table->unique(['area_id', 'company_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('area_companies');
    }
};
