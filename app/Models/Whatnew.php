<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Whatnew extends Model
{
    use HasFactory;

    protected $fillable = [
        "token","user_id","whatnew_title","whatnew_body",
        "is_public"
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
