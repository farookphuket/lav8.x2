<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use DB;
use Auth;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("Member.Profile.info");
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
    public function show($id)
    {
        $user = User::where("id",Auth::user()->id)
                        ->first();
        return response()->json([
            "user" => $user
        ]);
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
    public function update($id)
    {
        $msg = "";
        if(Hash::check(request()->cur_pass,Auth::user()->password) != false):
            if(request()->password != null):
                $this->update_pass();
            endif;
            $this->update_info(); 
            $msg .= "<span class=\"alert alert-success\">
            Success : profile has been updated</span>";
        else:
            $msg .= "<span class=\"alert alert-danger\">
            Error : profile cannot be save</span>";
        endif;

        return response()->json([
            "msg" => $msg
        ]);
    }

    public function update_pass(){
        $validate = request()->validate([
            "password" => ["required","min:4"],
            "pass_conf" => ["required","same:password"]
        ]);

        unset($validate["pass_conf"]);

        $new_pass = Hash::make(request()->password);


        $validate["updated_at"] = now();
        $validate["password"] = $new_pass;

        User::where("id",Auth::user()->id)
            ->update($validate);


    }

    public function update_info(){
        $validate = request()->validate([
            "name" => ["required","unique:users,name,".Auth::user()->id],
            "email" => ["required","email",
            "unique:users,email,".Auth::user()->id]
        ]);

        // update the users table field name,email,updated_at
        $validate["updated_at"] = now();
        User::where("id",Auth::user()->id)
            ->update($validate);
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
