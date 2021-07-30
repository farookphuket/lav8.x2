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
            $table->integer("read_count")->nullable()->default(0);
            $table->integer("comment_count")->nullable()->default(0);
            $table->timestamps();
            
            $table->foreign('user_id')->references('id')->on('users')
                ->onDelete('cascade');
        });

        // comment table 

        Schema::create('blog_comment', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id");
            $table->foreignId("blog_id");
            $table->foreignId("comment_id");
            $table->timestamps();
            
            $table->foreign('user_id')->references('id')->on('users')
                ->onDelete('cascade');

            $table->foreign('blog_id')->references('id')->on('blogs')
                ->onDelete('cascade');

            $table->foreign('comment_id')->references('id')->on('comments')
                ->onDelete('cascade');
        });


        Schema::create('blog_category', function (Blueprint $table) {
            $table->id();
            $table->foreignId("category_id");
            $table->foreignId("blog_id");
            $table->timestamps();

            $table->foreign('blog_id')->references('id')->on('blogs')
                ->onDelete('cascade');

            $table->foreign('category_id')->references('id')->on('categories')
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
        Schema::dropIfExists('blog_category');
    }
}
