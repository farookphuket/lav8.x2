<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;


use DB;
use Eloquent;

class PaymentSeeder extends Seeder
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
        $path = 'DB/PaymentMethods.sqlite';
        DB::unprepared(file_get_contents($path));
        $this->command->info("Payment has been Added.");
    }
}
