<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // blog table 
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id");
            $table->string("slug");
            $table->string("title");
            $table->text("excerpt");
            $table->text("body");
            $table->boolean("is_public");
            $table->timestamps();
            
            $table->foreign('user_id')->references('id')->on('users')
                ->onDelete('cascade');
        });

        // comment table 

        Schema::create('blog_comment', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id");
            $table->foreignId("blog_id");
            $table->string("comment_title");
            $table->text("comment_body");
            $table->boolean("comment_approve");
            $table->timestamps();
            
            $table->foreign('user_id')->references('id')->on('users')
                ->onDelete('cascade');

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
        Schema::dropIfExists('blogs');
        Schema::dropIfExists('blog_comment');
    }
}
