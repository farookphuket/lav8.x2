<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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

        // form validation
        $validate = request()->validate([
            "name" => ["required","unique:users,name"],

            "email" => ["required","email","unique:users,email"],

            "password" => ["required","min:6",
            "confirmed","required_with:password_confirmation"],

            "password_confirmation" => ["required","same:password"]
        ]);

        // hash the password 
        $p_hash = Hash::make(request()->password);

        // set the password
        $validate["password"] = $p_hash;


        // we don't need the password_confirmation field to add to DB
        unset($validate["password_confirmation"]);

        //create new user
        $newUser = User::create($validate);

        // assign role for user to member by default
        $newUser->roles()->attach(2);
        
        $get = User::latest()->first();
        // ====== backup user 
        $file = base_path("DB/user_list.sqlite");
        $content = "/* ========== auto backup ".date("Y-m-d H:i:s")." ============= */";
        $content .= "
    INSERT INTO `users` (`name`,`email`,`password`,`is_admin`,`created_at`,
    `updated_at`) VALUES 
    ('{$get->name}',
    '{$get->email}',
    '{$get->password}',
    '0',
    '{$get->created_at}',
    '{$get->updated_at}');                                          

    /* ===== attach new user {$get->name} to role member  */
    INSERT INTO `role_user` (`role_id`,`user_id`,`created_at`,`updated_at`) 
    VALUES ('2','{$get->id}',
    '{$get->created_at}',
    '{$get->updated_at}');                                          

";
        // === write to file 
        write2text($file,$content);


        $msg = "<span class=\"badge badge-success\">
            Success : you have registered
</span>";
        return response()->json([
            "msg" => $msg
        ]);
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
    public function update(Request $request, User $user)
    {
        //
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
