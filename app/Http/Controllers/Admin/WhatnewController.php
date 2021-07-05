<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Whatnew;
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
        $wn = Whatnew::with("user")
                ->orderBy("created_at","desc")
                        ->paginate(3)
                        ->onEachSide(1);
        return response()->json([
            "whatnew" => $wn
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

        // make a backup
        $this->backupInsertWn();

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
        $this->backupUpdateWn($id);

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

    /* =========== backup script 4 Jul 2021 ================================*/
    public function backupInsertWn(){
        $wn = Whatnew::latest()->first();
        $file = base_path("DB/whatnew_list.sqlite");
        $cont = "/* ====== auto insert script `{$this->wn_table}` ======== */";
        $cont .= "
INSERT INTO `{$this->wn_table}` (`user_id`,
`token`
,`whatnew_title`,`whatnew_body`,`is_public`,
`created_at`,`updated_at`) VALUES(
    '{$wn->user_id}',
    '{$wn->token}',
    '{$wn->whatnew_title}',
    '{$wn->whatnew_body}',
    '{$wn->is_public}',
    '{$wn->created_at}','{$wn->updated_at}'); 

";
        write2text($file,$cont);
    }

    public function backupUpdateWn($id){
        $wn = Whatnew::find($id);
        $file = base_path("DB/whatnew_list.sqlite");
        $cont = "/* ====== auto update script `{$this->wn_table}` ======== */";
        $cont .= "
UPDATE `{$this->wn_table}` SET whatnew_title='{$wn->whatnew_title}',
whatnew_body='{$wn->whatnew_body}',
is_public='{$wn->is_public}',updated_at='{$wn->updated_at}' 
WHERE id='{$wn->id}';
";
        write2text($file,$cont);
    }
    /* =========== backup script 4 Jul 2021 ================================*/
}
