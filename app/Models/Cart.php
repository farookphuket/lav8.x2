<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    /*   table field
            $table->datetime('product_recieved_at')->nullable();
            $table->integer('order_quantity')->default(0);
            $table->integer('order_unit_price')->default(0);
            $table->datetime('checkout_at')->nullable();
            $table->string('cancle_reason')->nullable();
            $table->boolean('is_cancle')->default(0);
     *
     * */

    protected $fillable = [
        "user_id","product_id",
        "order_quantity","order_unit_price",
        "product_recieved_at","checkout_at",
        "is_cancle","cancle_reason"
    ];


    public function  user(){
        return $this->belongsTo(User::class);
    }

    public function product(){
        return $this->belongsToMany(Product::class);
    }
}
