<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

use DB;
use Auth;

class CommentController extends Controller
{
    protected $comment_table = '';
    protected $reply_table = '';

    public function __construct(){
        $this->comment_table = 'blog_comment';
        $this->reply_table = 'blog_reply';
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("Admin.Comment.index");
    }


    /**
     * Display a listing of the comment.
     *
     * @return json data
     */
    public function getComments()
    {
        $comments = Blog::with("user")
                        ->join($this->comment_table,
                            "{$this->comment_table}.blog_id","=",
                            "blogs.id")
                            ->select("blogs.title","{$this->comment_table}.*")
                            ->get();


        return response()->json([
            "comments" => $comments
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $comment = DB::table($this->comment_table)
                            ->join("users","users.id","=","{$this->comment_table}.user_id")
                            ->select("users.name","users.email","{$this->comment_table}.*")
                            ->where("{$this->comment_table}.id","$id")
                            ->get();
        return response()->json([
            "comment" => $comment
        ]);
                            
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function edit(Blog $blog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {

        $validate = request()->validate([
            "comment_title" => ["required"],
            "comment_body" => ["required"]
        ]);

        $validate["comment_title"] = request()->comment_title;
        $validate["comment_body"] = xx_clean(request()->comment_body);
        $validate["updated_at"] = now();

        DB::table($this->comment_table)
                    ->where("id",$id)
                    ->update($validate);
        //===== make backup from last change 

        $bk = DB::table($this->comment_table)
                        ->where("id",$id)
                        ->first();

        $file = base_path("DB/blog_comment_list.sqlite");
        $content = "/* ============== auto update script ".date("Y-m-d H:i:s"); 
        $content .= " =============== */";

        $content .= "
    UPDATE `{$this->comment_table}` SET 
    comment_title='{$bk->comment_title}',
    comment_body='{$bk->comment_body}',
    updated_at='{$bk->updated_at}',
    comment_approve='{$bk->comment_approve}' 
    WHERE id={$id};
";
        write2text($file,$content);

        //===== end of backup
        $msg = "<span class=\"alert alert-success\">
            Success : data has been save {$id}</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function destroy(Blog $blog)
    {
        //
    }
}
