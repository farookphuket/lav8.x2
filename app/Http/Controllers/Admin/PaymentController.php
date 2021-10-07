<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;

use Auth;
use DB;
class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("Admin.Payment.index");
    }

    /**
     * undocumented function
     *
     * @return void
     */
    public function getPayment()
    {
        $payment = Payment::with('user')
                    ->orderBy("created_at","desc") 
                    ->paginate(10);

        return response()->json([
            "payment" => $payment
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
        $valid = request()->validate([
            "pay_title" => ["required"],
            "pay_method" => ["required"],
            "pay_des" => ["required"],
        ]);

        
        $pay_pic_absolute_path = "";
        $pay_pic_url = "";

        /* ===== upload image
         *
         * */

        // check if the file has file input file has name "product_pic"
        if(request()->hasFile('pay_pic')):

            $pub_path = public_path("upload_from_user"); 
            $new_name = Auth::user()->email."_".date("Y-m-d")."_".request()->file("pay_pic")->getClientOriginalName();

           request()->file('pay_pic')->move($pub_path,$new_name); 
            $pay_pic_absolute_path = "/upload_from_user/".$new_name;
            $pay_pic_url = "/upload_from_user/".$new_name;

        else:
            $pay_pic_url = request()->pay_url;
            $pay_pic_absolute_path = request()->pay_url;
        endif; 


        $valid["pay_pic_absolute_path"] = $pay_pic_absolute_path;
        $valid["user_id"] = Auth::user()->id;
        $valid["pay_url"] = $pay_pic_url;
        // create new payment 
        Payment::create($valid);

        // backup payment method 
        $pa = Payment::latest()->first();
        Payment::backupPaymentMethod($pa->id,"insert");

        $msg = "<span class=\"alert alert-success\">
            Success : payment method has been created</span>";
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
        $pay = Payment::with('user')
                            ->where('id',$payment->id)
                            ->first();
        return response()->json([
            "payment" => $pay
        ]);
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
    public function update($id)
    {
        $old = Payment::find($id);
        
        // the previous pic 
        $old_pic = public_path($old->pay_pic_absolute_path);

        if(file_exists($old_pic)):
            unlink($old_pic);
        endif;

        //dd(request()->pay_url);
        $valid = request()->validate([
            "pay_title" => ["required"],
            "pay_method" => ["required"],
            "pay_des" => ["required"],
        ]);

        
        $pay_pic_absolute_path = "";
        $pay_pic_url = "";

        /* ===== upload image
         *
         * */

        // check if the file has file input file has name "product_pic"
        if(request()->hasFile('pay_pic')):


            $pub_path = public_path("upload_from_user"); 
            $new_name = Auth::user()->email."_".date("Y-m-d")."_".request()->file("pay_pic")->getClientOriginalName();

           request()->file('pay_pic')->move($pub_path,$new_name); 
            $pay_pic_absolute_path = "/upload_from_user/".$new_name;
            $pay_pic_url = "/upload_from_user/".$new_name;

        else:
            if(request()->pay_url != null):

                $pay_pic_url = request()->pay_url;
                $pay_pic_absolute_path = request()->pay_url;
            else:

                $pay_pic_absolute_path = "https://i.ibb.co/Fq8ZsSG/20200127-115330.png";
                $pay_pic_url = "https://i.ibb.co/Fq8ZsSG/20200127-115330.png";
            endif;
        endif; 


        $valid["pay_pic_absolute_path"] = $pay_pic_absolute_path;
        $valid["user_id"] = Auth::user()->id;
        $valid["pay_url"] = $pay_pic_url;

        // update payment 
        Payment::where("id",$id)
            ->update($valid);

        // backup last update 
        Payment::backupPaymentMethod($id,"edit");

        $msg = "<span class=\"alert alert-success\">
            Success : payment method has been updated</span>";
        return response()->json([
            "msg" => $msg
        ]);
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Payment $payment)
    {
       $del = Payment::find($payment->id);

       $file_path = public_path($del->pay_pic_absolute_path);

       // backup delete command 
       Payment::backupPaymentMethod($payment->id);

        if(file_exists($file_path)):
           // remove pic 
           unlink($file_path);
        endif;

       $del->delete();

        $msg = "<span class=\"alert alert-success\">
            Success : payment method has been deleted</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }
}
