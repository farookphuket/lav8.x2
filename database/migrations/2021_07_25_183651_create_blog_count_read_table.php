<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlogCountReadTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blog_count_read', function (Blueprint $table) {
            $table->id();
            $table->foreignId("blog_id");
            $table->string("ip");
            $table->string("os");
            $table->string("browser");
            $table->string("last_readed_at")->nullable();
            $table->timestamps();


            $table->foreign('blog_id')->references('id')->on('blogs')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blog_count_read');
    }
}
