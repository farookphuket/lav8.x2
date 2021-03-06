<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            CategorySeeder::class,
            ContactSeeder::class,
            WhatnewSeeder::class,
            VisitorSeeder::class,
            TagSeeder::class,
            BlogSeeder::class,
            CommentSeeder::class,
            PhotoSeeder::class,
            ProductSeeder::class,
            PaymentSeeder::class,
            TimelineSeeder::class,
            TemplateSeeder::class,
        ]);
    }
}
