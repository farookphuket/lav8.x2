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

    protected $address_table = 'address_user';

    public function index()
    {
        return view("Member.Profile.info");
    }

    /**
     * undocumented function
     *
     * @return void
     */
    public function address()
    {
        $adr = User::where("users.id",Auth::user()->id)

            ->join($this->address_table,"{$this->address_table}.user_id",
        "=","users.id")
                ->select('users.*',"{$this->address_table}.*")
                ->get(); 

        return view("Member.Profile.shipping_address");
    }
    
    public function getAddress(){

        $adr = User::where("users.id",Auth::user()->id)
            
            ->join($this->address_table,"{$this->address_table}.user_id",
        "=","users.id")
                ->select('users.*',"{$this->address_table}.*")
                ->paginate(5); 
        return response()->json([
            "address" => $adr
        ]);
    }

    /**
     * undocumented function
     *
     * @return void
     */
    public function getMyDefaultShippingAddress()
    {
        $adr = User::where("users.id",Auth::user()->id)
            ->where("is_default_address","!=",0)  
            ->join($this->address_table,"{$this->address_table}.user_id",
        "=","users.id")
                ->select('users.*',"{$this->address_table}.*")
                ->first();
        return response()->json([
            "address" => $adr
        ]);
    }
    

    public function showAddress($id){
        $adr = DB::table($this->address_table)
                ->where("user_id",Auth::user()->id)
                ->where("id",$id)
                ->first();
        return response()->json([
            "address" => $adr
        ]);
    }
    public function saveAddress(){

        $valid = request()->validate([
            "first_name" => ["required","min:4"],
            "last_name" => ["required","min:4"],
            "address" => ["required","min:4"],
            "stage" => ["required"],
            "tel" => ["required"],
            "zip_code" => ["required"],
            "city" => ["required"],
            "country" => ["required"],
        ]);

        $valid["is_default_address"] = !request()->is_default_address?0:1;
        $valid["user_id"] = Auth::user()->id;
        $valid["created_at"] = now();
        $valid["updated_at"] = now();

        DB::table($this->address_table)
            ->insert($valid);


        $msg = "<span class=\"alert alert-success\">
            Success : data has been save</span>";
        return response()->json([
            "msg" => $msg
        ]); 
    }
    public function updateAddress($id){
        // the default address can only be 1 
        DB::table($this->address_table)
            ->where("is_default_address",1)
            ->update([
                "is_default_address" => 0
            ]);

        
        $valid = request()->validate([
            "first_name" => ["required","min:4"],
            "last_name" => ["required","min:4"],
            "address" => ["required","min:4"],
            "stage" => ["required"],
            "tel" => ["required"],
            "zip_code" => ["required"],
            "city" => ["required"],
            "country" => ["required"],
        ]);

        $valid["is_default_address"] = !request()->is_default_address?0:1;
        $valid["updated_at"] = now();

        DB::table($this->address_table)
            ->where("id",$id)
            ->update($valid);

        $msg = "<span class=\"alert alert-success\">
            Success : data has been updated! </span>";
        return response()->json([
            "msg" => $msg
        ]);
    }
    public function delAddress($id){

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
