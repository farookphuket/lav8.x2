<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Eloquent;
use DB;


class UserSeeder extends Seeder
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
        $path = 'DB/user_list.sqlite';
        DB::unprepared(file_get_contents($path));
        $this->command->info("Users has been Added");

        $role = 'DB/role_user_list.sqlite';
        DB::unprepared(file_get_contents($role));
        $this->command->info("User Role has been SET");
    }
}
