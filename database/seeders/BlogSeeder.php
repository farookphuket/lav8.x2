<?php

namespace Database\Seeders;
use Eloquent;
use DB;

use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        Eloquent::unguard();
        $path = 'DB/blog_list.sqlite';
        DB::unprepared(file_get_contents($path));
        $this->command->info("Blog has been Added");

//        Eloquent::unguard();
        $blog_tag = 'DB/blog_tag.sqlite';
        DB::unprepared(file_get_contents($blog_tag));
        $this->command->info("Blog Tag has been Linked");

 //       Eloquent::unguard();
        $comment = 'DB/blog_comment_list.sqlite';
        DB::unprepared(file_get_contents($comment));
        $this->command->info("comment has been Added");

// add category for the blog 15 Jul 2021
        $category = 'DB/blog_category.sqlite';
        DB::unprepared(file_get_contents($category));
        $this->command->info("category link has been Added");

    }
}
