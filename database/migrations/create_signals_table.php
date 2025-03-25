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
        Schema::create('signals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dump_id');
            $table->integer('item_nummer')->nullable();;
            $table->integer('signaal_nummer')->nullable();;
            $table->string('signaal_code')->nullable();
            $table->string('categorie')->nullable();
            $table->string('onderwerp')->nullable();
            $table->string('soort')->nullable();
            $table->string('kengetal')->nullable();
            $table->string('waarde')->nullable();
            $table->string('kenmerk')->nullable();
            $table->string('actie')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('signals');
    }
};
