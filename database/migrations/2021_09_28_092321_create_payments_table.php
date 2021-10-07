<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id");
            $table->string("pay_title");
            $table->string("pay_method"); // eg paypal,pay on recieve,money transfer
            $table->text("pay_des");
            $table->string("pay_url");
            $table->string("pay_pic_absolute_path");
            $table->timestamps();

            $table->foreign("user_id")
                  ->references("id")
                    ->on("users")
                    ->onDelete("cascade");
        });


        Schema::create('payment_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id");
            $table->foreignId("cart_id");
            $table->foreignId("product_id");
            $table->foreignId("payment_id");
            $table->timestamps();


            $table->foreign("user_id")
                  ->references("id")
                    ->on("users")
                    ->onDelete("cascade");


            $table->foreign("payment_id")
                  ->references("id")
                    ->on("payments")
                    ->onDelete("cascade");

            $table->foreign("cart_id")
                  ->references("id")
                    ->on("carts")
                    ->onDelete("cascade");

            $table->foreign("product_id")
                  ->references("id")
                    ->on("products")
                    ->onDelete("cascade");

        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payments');
        Schema::dropIfExists('payment_user');
    }
}
