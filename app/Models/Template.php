<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    use HasFactory;
    protected $fillable = [
        "user_id","tm_title","tm_method","tm_excerpt",
        "tm_body","tm_public","tm_approved_at"
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
