<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timeline extends Model
{
    use HasFactory;
    protected $fillable = ["user_id","date_ref","report"];



    public function user(){
        return $this->belongsTo(User::class);
    }
}
