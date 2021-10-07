<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;


use DB;
use Eloquent;

class ProductSeeder extends Seeder
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
        $path = 'DB/product_list.sqlite';
        DB::unprepared(file_get_contents($path));
        $this->command->info("Product has been Added.");


        $path = 'DB/product_category.sqlite';
        DB::unprepared(file_get_contents($path));
        $this->command->info("Product Category Link has been created.");
    }
}
