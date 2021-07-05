<?php

namespace Database\Factories;

use App\Models\Blog;
use App\Models\User;
use Auth;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class BlogFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Blog::class;

    protected $slug = '';



    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $title = $this->faker->sentence();
        $this->slug = Str::slug($title);
        return [
            "user_id" => User::factory(),
            "slug" => $this->slug,
            "title" =>  $title,
            "body" => $this->faker->paragraph(),
            "is_public" => 0            
        ];
    }
}
