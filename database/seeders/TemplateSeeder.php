<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Eloquent;
use DB;
class TemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Eloquent::unguard();
        $path = 'DB/template_list.sqlite';
        DB::unprepared(file_get_contents($path));
        $this->command->info("Template has been Added");
    }
}
