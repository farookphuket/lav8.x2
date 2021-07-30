<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Whatnew;
use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Auth;

class WhatnewController extends Controller
{

    protected $wn_table = "whatnews";
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    // getWhatnew 
    public function getWhatnew(){
        $tmp = Template::where("tm_method","whatnew")->get();
        $wn = Whatnew::with("user")
                ->orderBy("created_at","desc")
                        ->paginate(3)
                        ->onEachSide(1);
        return response()->json([
            "whatnew" => $wn,
            "template" => $tmp
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
            "title" => ["required","min:6","max:80"],
            "body" => ["required"]
        ]);

        unset($validate["title"]);
        unset($validate["body"]);

        $validate["token"] = Str::random(60);
        $validate["user_id"] = Auth::user()->id;
        $validate["whatnew_title"] = xx_clean(request()->title);
        $validate["whatnew_body"] = xx_clean(request()->body);
        $validate["is_public"] = !request()->is_public?0:1;
        Whatnew::create($validate);

        $wn = Whatnew::latest()->first();
        // make a backup
        //$this->backupInsertWn();
        Whatnew::backupWhatnew($wn->id,"insert");

        $msg = "<span class=\"alert alert-success\">
            Success : data has beend created</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Whatnew  $whatnew
     * @return \Illuminate\Http\Response
     */
    public function show(Whatnew $whatnew)
    {
        $get = Whatnew::find($whatnew->id);

        return response()->json([
            "whatnew" => $get
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Whatnew  $whatnew
     * @return \Illuminate\Http\Response
     */
    public function edit(Whatnew $whatnew)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Whatnew  $whatnew
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        $validate = request()->validate([
            "title" => ["required"]
        ]);

        unset($validate["title"]);

        $validate["whatnew_title"] = xx_clean(request()->title);
        $validate["whatnew_body"] = xx_clean(request()->body);
        $validate["is_public"] = !request()->is_public?0:1;
        $validate["updated_at"] = now();

        Whatnew::where("id",$id)
                ->update($validate);

        // make backup for the update
        //$this->backupUpdateWn($id);
        Whatnew::backupWhatnew($id,"edit");

        $msg = "<span class=\"alert alert-success\">
            Success : data has beend updated</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Whatnew  $whatnew
     * @return \Illuminate\Http\Response
     */
    public function destroy(Whatnew $whatnew)
    {
        $del = Whatnew::find($whatnew->id);
        $del->delete();
        $msg = "<span class=\"alert alert-success\">
            Success : item has been deleted!</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }


}
