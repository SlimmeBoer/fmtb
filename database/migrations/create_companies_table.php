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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->integer("workspace_id");
            $table->string('name');
            $table->string('address');
            $table->string('postal_code');
            $table->string('city');
            $table->string('province');
            $table->string('brs');
            $table->string('ubn');
            $table->string('type');
            $table->boolean('bio');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
