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

        // get the last photo 
        $photo = Photo::latest()->first();

        // backup to file 
        $this->backupPhoto($photo->id,"insert");


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


        // backup to file 
        $this->backupPhoto($photo->id,"edit"); 

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

        // backup to file 
        $this->backupPhoto($photo->id);


        $del = Photo::find($photo->id);
        $del->delete();

        $msg = "<span class=\"alert alert-success\">
            Success : data has been deleted </span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /* =============== backup to file 12 Jul 2021 =========================== */
    public function backupPhoto($id,$command=false){
        $photo = Photo::find($id);
        $file = base_path("DB/photo_list.sqlite");

        $cont = "";

        switch($command):
            case"insert":
                $cont .= "\n
    /* ============= auto INSERT script ".date("Y-m-d H:i:s")." ================ */
        INSERT INTO `{$this->photo_table}`(`user_id`,`title`,`url`,`created_at`,
    `updated_at`)VALUES(
            '{$photo->user_id}',
            '{$photo->title}',
            '{$photo->url}',
            '{$photo->created_at}',
            '{$photo->updated_at}');
    ";
            break;
            case"edit":

                $cont .= "
UPDATE {$this->photo_table} SET title='{$photo->title}',
url='{$photo->url}',
updated_at='{$photo->updated_at}' 
WHERE id={$photo->id};
";
            break;
            default:
            $cont .= "
/* ========== delete photo ".date("Y-m-d H:i:s")." ========================= */
DELETE FROM `{$this->photo_table}` WHERE id='{$photo->id}';
";
            break;
        endswitch;
        write2text($file,$content);
    }

    /* =============== backup to file 12 Jul 2021 =========================== */
}
