<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
use Eloquent;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //


// add read count for the blog 25 Jul 2021
        $comment = 'DB/comment_list.sqlite';
        DB::unprepared(file_get_contents($comment));
        $this->command->info("comment has been Added");

 //       Eloquent::unguard();
        $comment = 'DB/blog_comment_list.sqlite';
        DB::unprepared(file_get_contents($comment));
        $this->command->info("comment has been Added");


    }
}
