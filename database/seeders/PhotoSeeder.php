<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Eloquent;
use DB;

class PhotoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        Eloquent::unguard();
        $path = 'DB/photo_list.sqlite';
        DB::unprepared(file_get_contents($path));
        $this->command->info("Photos has been Added");
    }
}
