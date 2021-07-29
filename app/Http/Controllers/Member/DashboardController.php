<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Whatnew;
use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

use Auth;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $wn = Whatnew::latest()->first();
        return view('Member.index')->with([
            "whatnew" => $wn
        ]);
    }





    /**
     * Display a listing of whatnew.
     *
     * call by ajax 
     * @return json 
     */
    public function getWhatnew()
    {

//        !$per_page?$per_page = 5:$per_page = request()->per_page;

        $whatnews = Whatnew::with('user')
                        ->latest()
                        ->paginate(15)
                        ->onEachSide(1);

        $tmp = Template::where("tm_approved_at","!=",null)
                        ->orWhere("user_id",Auth::user()->id)
                        ->get();

        return response()->json([
            "whatnews" => $whatnews,
            "templates" => $tmp
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
        $validate = request()->validate([
            "title" => ["required"]
        ]);

        if(request()->is_public):
            $validate["is_public"] = true;
        else:
            $validate["is_public"] = false;
        endif;
        $validate["token"] = Str::random(60);
        $validate["user_id"] = Auth::user()->id;
        $validate["whatnew_title"] = xx_clean(request()->title);
        $validate["whatnew_body"] = xx_clean(request()->body);

        $backup = Whatnew::create($validate);

        $backup->title = str_replace("'","׳",$backup->title);
        $backup->body = str_replace("'","׳",$backup->body);
        // =============== backup data  //
        $file = base_path("DB/whatnew_list.sqlite");
        $content = " 
/* === whatnews table auto script START ".date("Y-m-d H:i:s a")." ========= */";

        $content .= "
    INSERT INTO `whatnews` ( 
    `user_id`,`token`,
    `whatnew_title`,`whatnew_body`,
    `created_at`,`updated_at`) 
    VALUES (
    '{$backup->user_id}',
    '{$backup->token}',
    '{$backup->whatnew_title}',
    '{$backup->whatnew_body}',
    '{$backup->created_at}',
    '{$backup->updated_at}');                                          
        ";

        // call to script to write to file
        write2text($file,$content);

        // =========== End backup =================

        $msg = "<span class=\"alert alert-success\">
            Success : your post has been save</span>";
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
    public function edit($id)
    {
        $wn = Whatnew::where('id',$id)->first();

        return response()->json([
            "whatnew" => $wn
        ]);
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

        $validate = request()->validate([
            "title" => ["required"]
        ]);

        if(request()->is_public):
            $validate["is_public"] = true;
        else:
            $validate["is_public"] = false;
        endif;
      //  $validate["token"] = Str::random(60);
        $validate["user_id"] = Auth::user()->id;
        $validate["whatnew_title"] = xx_clean(request()->title);
        $validate["whatnew_body"] = xx_clean(request()->body);
        $validate["updated_at"] = now();

        Whatnew::where("id",$id)->update($validate);

        $msg = "<span class=\"alert alert-success\">
            Success : your post has  been updated</span>";
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
    public function destroy($id)
    {
        $del = Whatnew::where("id",$id)->first();
        $del->delete();

        $msg = "<span class=\"alert alert-success\">
            Success : your post has  been deleted</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }
}
