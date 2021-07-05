<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Eloquent;
use DB;

class RoleSeeder extends Seeder
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
        $path = 'DB/role_list.sqlite';
        DB::unprepared(file_get_contents($path));
        $this->command->info("Role has been Added");
    }
}
