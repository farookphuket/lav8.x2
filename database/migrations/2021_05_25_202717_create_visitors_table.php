<?php

use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    class CreateVisitorsTable extends Migration
    {
        /**
         * Run the migrations.
         *
         * @return void
         */
        public function up()
        {
            Schema::create('visitors', function (Blueprint $table) {
                $table->id();
                $table->string('ip');
                $table->string('browser');
                $table->string('os');
                $table->string('day_num');
                $table->string('month_num');
            $table->string('year_num');
            $table->date('date_visit');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('visitors');
    }
}
