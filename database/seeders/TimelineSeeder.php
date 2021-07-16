<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
use Eloquent;

class TimelineSeeder extends Seeder
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
        $path = 'DB/timeline_list.sqlite';
        DB::unprepared(file_get_contents($path));
        $this->command->info("Timeline has been Added");
    }
}
