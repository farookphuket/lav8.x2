<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id","cat_title","cat_type"
    ];

    public function users(){
        return $this->belongsTo(User::class);
    }


}
