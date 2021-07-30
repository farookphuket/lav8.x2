<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{

    protected $user_table = "users";
    protected $role_user_table = "role_user";
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

        // ====== backup user to file
        User::backupUser($get->id,"insert");


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


    /* ============= backupUser 25 Jul 2021 START ========================== */
    public function backupUser($id,$command=false){
        $user = User::find($id);

        $file = base_path("DB/user_list.sqlite");
        $cont = "";

        switch($command):
            case"insert":

                $cont .= "\n
/* ========== auto backup ".date("Y-m-d H:i:s")." ============= */
INSERT INTO `users` (`name`,`email`,`password`,`is_admin`,`created_at`,
`updated_at`) VALUES 
    (
    '{$user->name}',
    '{$user->email}',
    '{$user->password}',
    '0',
    '{$user->created_at}',
    '{$user->updated_at}');                                          

    /* ===== attach new user {$user->name} to role member  */
INSERT INTO `role_user` (`role_id`,`user_id`,`created_at`,`updated_at`) 
VALUES (
    '2',
    '{$user->id}',
    '{$user->created_at}',
    '{$user->updated_at}');                                          
";

            break;
            default:
                $cont .= "\n
/* ======== Delete the user id {$user->id} on ".date("Y-m-d H:i:s")." ====== */
DELETE FROM `{$this->user_table}` WHERE id='{$user->id}';

/* 
 * ".date("Y-m-d H:i:s")." delete user id {$user->id} from role table
 */
DELETE FROM `{$this->role_user_table}` WHERE id='{$user->id}';
";               

            break;
        endswitch;

        // === write to file 
        write2text($file,$cont);
    }

    /* ============= backupUser 25 Jul 2021 END   ========================== */
}
