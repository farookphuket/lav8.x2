<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function roles(){
        return $this->belongsToMany(Role::class);
    }

    public function photos(){
        return $this->hasMany(Photo::class);
    }

    public function timelines(){
        return $this->hasMany(Timeline::class);
    }

    public function blog(){
        return $this->hasMany(Blog::class);
    }


    public function whatnews(){
        return $this->hasMany(Whatnew::class);
    }

    public function contact(){
        return $this->hasMany(Contact::class);
    }

    public function tags(){
        return $this->hasMany(Tag::class);
    }

    public function products(){
        return $this->hasMany(Product::class);
    }

    public function category(){
        return $this->hasMany(Category::class);
    }

    public function template(){
        return $this->hasMany(Template::class);
    }
    public function comments(){
        return $this->hasMany(Comment::class);
    }

}
