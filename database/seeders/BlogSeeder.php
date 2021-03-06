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


// add category for the blog 15 Jul 2021
        $category = 'DB/blog_category.sqlite';
        DB::unprepared(file_get_contents($category));
        $this->command->info("category link has been Added");

// add read count for the blog 25 Jul 2021
        $category = 'DB/blog_count_read.sqlite';
        DB::unprepared(file_get_contents($category));
        $this->command->info("blog count read link has been Added");

    }
}
