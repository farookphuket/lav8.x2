<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('templates', function (Blueprint $table) {
            $table->id();

            // user who create this template 
            $table->foreignId("user_id");

            // the template will show depend on the request method
            // eg: blog,whatnew,
            $table->string("tm_method"); 

            // title eg: template for whatnew,blog
            $table->string("tm_title"); 

            // eg: show two the 2 div of image and text content
            $table->text("tm_excerpt");

            // the template body
            $table->text("tm_body");

            // the template will be set as private by default
            // (0=private,1=public) user cannot set template to public 
            $table->boolean("tm_public")->default(0);

            // admin gas approve this template
            $table->datetime("tm_approved_at")->nullable();

            $table->timestamps();

            // if this user has delete all templates that has this use id 
            // will be cascade 
            $table->foreign("user_id")->references("id")->on("users")
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
        Schema::dropIfExists('templates');
    }
}
