<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\URL;

use DB;


class PasswordResetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //return"ha ha";
    }


    /**
     * get the member email
     *
     * @return \Illuminate\Http\Response
     */
    public function isMemberEmail()
    {
        //
        $validate = request()->validate([
            "email" => ["required"]
        ]);
        $u = User::where('email',$validate)->get();
        if(count($u) > 0):
            // sent email to user 
            $this->sentEmailToUser();

        $msg = "<span class=\"alert alert-success\">
            please check your email to reset your password 
             </span>";

        else:
        $msg = "<span class=\"alert alert-danger\">We've not found this email 
</span>"; 
        endif;

        //$msg = "we will send email to ".request()->email;
        return response()->json([
            "msg" => $msg
        ]);
    }



    public function sentEmailToUser(){



        $get = User::where("email",request()->email)->first()->toArray();

        $str_ran = Str::random(60);
        $link = URL::to('/passreset/'.$str_ran);

        

        DB::table('password_resets')->insert([
            'email' => $get['email'],
            'token' => $str_ran,
            'created_at' => now()
        ]);
    
        $data = array(
            "name" => $get['name'],
            "title" => 'Password Reset auto service DO-NOT-REPLY!',
            "reset_link" => $link
        );
        Mail::send('Mail.passwordResetEmail',$data,function($msg) use ($get){
            $msg->from('no-reply@cannot-reply.nohost');
            $msg->to($get['email'],'no-reply-back')->subject("Dear {$get['name']} we notice that you sent a request for password reset!");
        });




    }


    public function passreset($token){



        $get = DB::table('password_resets')
                                    ->where('token',$token)
                                    ->get();

        $since = '';
        $email = '';
        $token = '';

        foreach($get as $item):
            $since = strtotime($item->created_at)+(60*12);
            $email = $item->email;
            $token = $item->token;
        endforeach;

        $end = $since - time();
        $left = round((int)$end/60);

        $msg = "";

        if($end < 0):
            $msg = "<span class=\"badge badge-danger\">
            Sorry your link has expired! please try again later.</span>";
        else:
$msg = "<span class=\"badge badge-success\">you have  {$left}  minute left 
        </span>";
        endif;
        return view('auth.passwordResetForm')->with([
            "time_left" => $left,
            "msg" => $msg,
            "token" => $token
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update($token)
    {
        //
        $valid = request()->validate([
            "password" => ["required","confirmed","min:6","required_with:password_confirmation"],
            "password_confirmation" => ["required","same:password"]
        ]);

        $get = DB::table('password_resets')
            ->where('token',$token)
            ->get();
        $email = '';
        foreach($get as $row):
            $email = $row->email;
        endforeach;

        $new_pass = Hash::make(request()->password);
        User::where('email',$email)
            ->update([
                "password" => $new_pass,
                "updated_at" => now()
            ]);


        $msg = "<span class=\"badge badge-success\">
           Success : password has been reset for {$email}
            </span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
