<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Product;
use App\Models\Cart;
use Illuminate\Http\Request;

use Auth;
use DB;

class CartController extends Controller
{

    protected $cart_product_table = "cart_product";
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("Member.Cart.index");
    }

    public function getMyCart(){
        // get my order list 
        $my_cart = Cart::with('user')
                        ->with('product')
                        ->where('checkout_at',null)
                        ->where('user_id',Auth::user()->id)
                        ->orderBy('created_at','desc')
                        ->paginate(2);
        return response()->json([
            "my_cart" => $my_cart
        ]);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        $my_order = [
            "user_id" => Auth::user()->id,
            "product_id" => request()->product_id,
            "order_quantity" => request()->quantity,
            "order_unit_price" => request()->order_unit_price,
        ];

        // add product to user cart 
        Cart::create($my_order);
        $new_cart = Cart::latest()->first();

        // add pivot table 
        DB::table($this->cart_product_table)
            ->insert([
                "cart_id" => $new_cart->id,
                "product_id" => request()->product_id,
                "created_at" => now(),
                "updated_at" => now(),
            ]);

        $msg = "<span class=\"alert alert-success\">
                    product has added to your cart!</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function show(Cart $cart)
    {
        return response()->json([
            "cart" => $cart 
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function edit(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        $my_cart = Cart::find($id)->first();

        $update_data = [
            "order_quantity" => request()->quantity,
            "updated_at" => now()
        ];

        Cart::where("id",$id)->update($update_data);

        $msg = "<span class=\"alert alert-success\">
            Success : your order has been update</span>";
        return response()->json([
            "msg" => $msg
        ]);
                
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cart $cart)
    {
        $del = Cart::find($cart->id);
        $del->delete();

        $msg = "<span class=\"alert alert-success\">
            Success : item has been remove </span>";
        return response()->json([
            "msg" => $msg
        ]);
    }
}
