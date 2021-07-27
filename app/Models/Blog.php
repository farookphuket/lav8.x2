<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id","slug","title","excerpt",
        "body","is_public"
    ];


    public function user(){
        return $this->belongsTo(User::class);
    }

    public function tags(){
        return $this->belongsToMany(Tag::class);
    }

    public function category(){
        return $this->belongsToMany(Category::class);
    }

    public function comments(){
        return $this->belongsToMany(Comment::class);
    }
}
