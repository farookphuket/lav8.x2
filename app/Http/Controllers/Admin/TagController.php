<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Tag;
use App\Models\Blog;
use Auth;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return view("Admin.Tag.index");
    }




    /**
     * Display a listing of the resource.
     *
     * @return json 
     */
    public function getTags()
    {
        $tags = Tag::with("blogs")
                        ->join("users","users.id","=","tags.user_id")
                        ->select("users.name","users.email","tags.*")
                        
                        ->orderBy("created_at","desc")
                        ->paginate(2)
                        ->onEachSide(1);

        return response()->json([
            "tags" => $tags
        ]);
    }

    public function getTagBlogs(){

        $tag_blog = Blog::with("tags")
                    ->with("user")
                    ->orderBy("created_at","desc")
                    ->paginate(2)
                    ->onEachSide(1);

                        
        return response()->json([
            "tag_blog" => $tag_blog
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
        $tag = request()->tag_name;

        $validate = request()->validate([
            "tag_name" => ["required","min:3","max:15"]
        ]);

        $validate["user_id"] = Auth::user()->id;
        $validate["tag_name"] = $tag;
        Tag::create($validate);

        $msg = "<span class=\"alert alert-success\">
            Success : new item has been created<span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function show(Tag $tag)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function edit(Tag $tag)
    {
        return response()->json([
            "tag" => $tag
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        $tag = request()->tag_name;

        $validate = request()->validate([
            "tag_name" => ["required","min:3","max:15"]
        ]);

        $validate["tag_name"] = $tag;
        $validate["updated_at"] = now();
        Tag::where("id",$id)
                ->update($validate);

        $msg = "<span class=\"alert alert-success\">
            Success : tag has been updated</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $del = Tag::where("id",$id)->first();
        $del->delete();


        $msg = "<span class=\"alert alert-success\">
            Success : tag has been deleted<span>";
        return response()->json([
            "msg" => $msg
        ]);

    }

    /* =============== backup insert tag START ===============*/
    public function backupInsertTag(){
        $tag = Tag::latest()->first();
        $file = base_path("DB/tag_list.sqlite");
        $content = "/* ================ auto script ".date("Y-m-d H:i:s");
        $content .= " for tags table ========== */";
        $content .= "
    INSERT INTO `tags`(`user_id`,`tag_name`,`created_at`,`updated_at`) 
VALUES(
    '{$tag->user_id}','{$tag->tag_name}',
    '{$tag->created_at}','{$tag->updated_at}');
";
        write2text($file,$content);
    }
    /* =============== backup insert tag END   ===============*/


}
