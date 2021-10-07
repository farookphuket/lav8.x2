<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('product_id');
            $table->datetime('product_recieved_at')->nullable();
            $table->integer('order_quantity')->default(0);
            $table->integer('order_unit_price')->default(0);
            $table->datetime('checkout_at')->nullable();
            $table->string('cancle_reason')->nullable();
            $table->boolean('is_cancle')->default(0);
            $table->timestamps();


            $table->foreign("user_id")
                  ->references("id")
                  ->on("users")
                  ->onDelete("cascade");

            $table->foreign("product_id")
                  ->references("id")
                  ->on("products")
                  ->onDelete("cascade");

        });


        Schema::create('cart_product', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cart_id');
            $table->foreignId('product_id');
            $table->timestamps();


            $table->foreign("product_id")
                  ->references("id")
                  ->on("products")
                  ->onDelete("cascade");


            $table->foreign("cart_id")
                  ->references("id")
                  ->on("carts")
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
        Schema::dropIfExists('carts');
        Schema::dropIfExists('cart_product');
    }
}
