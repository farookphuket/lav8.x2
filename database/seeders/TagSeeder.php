<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
use Eloquent;

class TagSeeder extends Seeder
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
        $path = 'DB/tag_list.sqlite';
        DB::unprepared(file_get_contents($path));
        $this->command->info("Tag List has been Added");
    }
}
