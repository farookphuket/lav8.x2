<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("Admin.Users.index");
    }



    /**
     * Display a listing of the user.
     *
     * @return \Illuminate\Http\Response
     */
    public function getUserList()
    {

        $users = User::with('roles') 
                ->orderBy('created_at','desc')
                ->paginate(3)
                ->onEachSide(1);

        $roles = Role::all();
        return response()->json([
            "users" => $users,
            "roles" => $roles
        ]);
    }


    public function search(){
        $search = request()->search;

        if(isset($search)):
            $get = User::with('roles')
                    ->where("name","LIKE","%{$search}%")
                    ->orderBy("created_at","desc")
                    ->get();

        else:
            $get = User::all();
        endif;
        return response()->json(["users" => $get]);
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
            "name" => ["required","unique:users,name"],
            "email" => ["required","unique:users,email"]
        ]);

        //$roles = request()->roles;

        $pHash = Hash::make('password');

        //unset($valid["roles"]);
        $user = User::create([
                "name" => request()->name,
                "email" => request()->email,
                "password" => $pHash
            ]);
        $new_role = User::where('id',$user->id)->first();
        $new_role->roles()->attach(request()->roles);

        //==============  backup user 
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
            Success : user has been updated </span>";
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
        $get_user = User::with("roles")
                            ->where('id',$user->id)
                            ->get();
                    
        return response()->json(["user" => $get_user]);
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
    public function update(User $user)
    {
        $valid = request()->validate([
            "name" => ["required","unique:users,name".$user->id],
            "email" => ["required","unique:users,email".$user->id]
        ]);

        //$roles = request()->roles;

        //unset($valid["roles"]);
        $update_user = User::where('id',$user->id)
            ->update([
                "name" => request()->name,
                "email" => request()->email,
                "updated_at" => now()
            ]);
        $update_user = User::where('id',$user->id)->first();
        $update_user->roles()->sync(request()->roles);
        $msg = "<span class=\"badge badge-success\">
            Success : user has been updated </span>";
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
        $del = User::where('id',$user->id)->first();
        $del->delete();

        $msg = "<span class=\"badge badge-success\">
            Success : user has been deleted </span>";
        return response()->json([
            "msg" => $msg
        ]);
    }
}
