<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id","name","email","title",
        "body","date_num","ip","token",
        "reply_by"
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
