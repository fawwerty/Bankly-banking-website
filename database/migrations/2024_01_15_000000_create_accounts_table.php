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
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('account_number')->unique();
            $table->enum('account_type', ['savings', 'checking', 'business'])->default('savings');
            $table->decimal('balance', 15, 2)->default(0);
            $table->string('currency', 3)->default('GHS');
            $table->enum('status', ['active', 'inactive', 'suspended', 'closed'])->default('active');
            $table->string('branch_code')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index('account_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
