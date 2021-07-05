<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
        return view("Admin.Profile.info");
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
        $get = User::where('id',$id)->first();
        return response()->json([
            "user" => $get
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

        $cur_pass = request()->current_password;
        $msg = "";
        if(isset($cur_pass) && 
            Hash::check($cur_pass,Auth::user()->password)):
            // only if the user enter the current password
            if(isset(request()->password)):
                // if the user enter the new password
                $this->update_pass();
            endif;
            // update the user info
            $this->update_info();
            $msg = "<span class=\"alert alert-success\">
                Success : your profile has been updated!</span>";
        else:
            $msg = "<span class=\"alert alert-danger\">
                Error : cannot update profile please check your input 
            </span>";
        endif;


        return response()->json([
            "msg" => $msg
        ]);
    }

    public function update_info(){
        $validate = request()->validate([
            "name" => ["required","unique:users,name,".Auth::user()->id],
            "email" => ["required","unique:users,email,".Auth::user()->id]
        ]);

        $validate["updated_at"] = now();

        User::where("id",Auth::user()->id)->update($validate);

    }

    public function update_pass(){
        $validate = request()->validate([
            "password" => ["required_with:password_confirmation"],
            "password_confirmation" => ["required","same:password"]
        ]);

        unset($validate["password_confirmation"]);
        $validate["updated_at"] = now();
        $validate["password"] = Hash::make(request()->password);

        User::where("id",Auth::user()->id)->update($validate);

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
