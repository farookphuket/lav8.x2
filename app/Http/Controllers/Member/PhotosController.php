<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Photo;
use App\Models\User;
use Illuminate\Http\Request;

use Auth;


class PhotosController extends Controller
{


    protected $photo_table = '';

    public function __construct(){
        $this->photo_table = 'photos';
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('Member.Photo.index');
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
            "title" => ["required","min:6"],
            "url" => ["required","min:8"]
        ]);

        $validate["user_id"] = Auth::user()->id;
        Photo::create($validate);

        //====== make a backup 
        $bk = Photo::latest()->first();
        $file = base_path("DB/photo_list.sqlite");

        $content = "/* ============= auto INSERT script ".date("Y-m-d H:i:s");
        $content .= " for {$this->photo_table} ============= */";
        $content .= "
    INSERT INTO `{$this->photo_table}`(
        `user_id`,`title`,`url`,`created_at`,`updated_at`
    )VALUES(
        '{$bk->user_id}',
        '{$bk->title}',
        '{$bk->url}',
        '{$bk->created_at}',
        '{$bk->updated_at}'
);
";

        write2text($file,$content);
        $msg = "<span class=\"alert alert-success pt-4\">Success</span>";

        return response()->json(["msg" => $msg]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Photo  $photo
     * @return \Illuminate\Http\Response
     */
    public function show(Photo $photo)
    {
        return response()->json(["photo" => $photo]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Photo  $photo
     * @return \Illuminate\Http\Response
     */
    public function edit(Photo $photo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Photo  $photo
     * @return \Illuminate\Http\Response
     */
    public function update(Photo $photo)
    {
        //

        $validate = request()->validate([
            "title" => ["required","min:6"],
            "url" => ["required","min:8"]
        ]);

        $validate["user_id"] = Auth::user()->id;
        Photo::where("id",$photo->id)
            ->update($validate);

        // ======= update backup script START
        $bk = Photo::where("id",$photo->id)->first();
        
        $file = base_path("DB/photo_list.sqlite");
        $content = "/* ============== auto update script ".date("Y-m-d H:i:s");
        $content .= " =============== */";

        $content .= "
    UPDATE {$this->photo_table} SET title='{$bk->title}',
    url='{$bk->url}',
    updated_at='{$bk->updated_at}' 
    WHERE id={$bk->id};
";
        write2text($file,$content);
        // ======= update backup script END

        $msg = "<span class=\"alert alert-success\">
            Success : data has been updated </span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Photo  $photo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Photo $photo)
    {

        $del = Photo::find($photo->id);
        $del->delete();

        $msg = "<span class=\"alert alert-success\">
            Success : data has been deleted </span>";
        return response()->json([
            "msg" => $msg
        ]);
    }
}
