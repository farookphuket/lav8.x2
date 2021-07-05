<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Eloquent;
use DB;


class WhatnewSeeder extends Seeder
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
        $path = 'DB/whatnew_list.sqlite';
        DB::unprepared(file_get_contents($path));
        $this->command->info("Whatnew has been Added");
    }
}
