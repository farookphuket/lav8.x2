<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Cart;
use Illuminate\Http\Request;

use Auth;
use DB;

class PaymentController extends Controller
{
    protected $user_pay_table = "payment_user";
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return"get payment";
    }

    /**
     * undocumented function
     *
     * @return void
     */
    public function getPaymentMethod()
    {
        $pmt = Payment::orderBy("created","desc")
                        ->get();
        return response()->json([
            "payments" => $pmt
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

        $cart_id = "";
        $pd_id = "";
        $user_id = "";
        $payment_method_id = request()->payment_method_id;

        // get the cart
        $carts = Cart::where("user_id",Auth::user()->id)
                        ->where("checkout_at",null)
                        ->get();
        if(count($carts) != 0):
            foreach($carts as $item):

                // checkout data
                $checkout_data = [
                    "user_id" => Auth::user()->id,
                    "cart_id" => $item->id,
                    "product_id" => $item->product_id,
                    "payment_id" => $payment_method_id,
                    "created_at" => now(),
                    "updated_at" => now()
                ];
                // save checkout 
                DB::table($this->user_pay_table)
                            ->insert($checkout_data); 
            endforeach;
            // update cart status 
                $c_update_data = [
                    "checkout_at" => now(),
                    "updated_at" => now()
                ];
                Cart::where("checkout_at",null)
                        ->update($c_update_data);
        endif;

        $msg = "<span class=\"alert alert-success\">
            Success : payment has been save.</span>";

        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function show(Payment $payment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function edit(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Payment $payment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Payment $payment)
    {
        //
    }
}
