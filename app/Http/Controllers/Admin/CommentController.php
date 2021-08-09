<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Comment;
use Illuminate\Http\Request;

use DB;
use Auth;

class CommentController extends Controller
{
    protected $comment_table = '';
    protected $blog_comment_link = 'blog_comment';
    protected $reply_table = '';

    public function __construct(){
        $this->comment_table = 'comments';
        
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
        $comments = Comment::with("user")
                        ->with("blogs")
                        ->orderBy("created_at","desc")
                        ->paginate(3);


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
            "comment_body" => ["required","min:50"]
        ]);

        $get_comment = Comment::find($id);
        $tmp_reply = "{$get_comment->comment_body} 
            <hr class=\"mt-4 mb-4\" />
            <div class=\"card\">
                <div class=\"card-body mt-2 mb-2\">
                    ".xx_clean(request()->comment_body)."
                    <div class=\"row\">
                       <div class=\"col-lg-6\">
                            <span>
                                <b-icon icon=\"calendar2-day\"></b-icon>
                                ".date("Y-m-d H:i:s")."
                            </span>
                        </div> 
                       <div class=\"col-lg-6\">
                            <div class=\"float-right badge badge-info p-2\">
                                ".Auth::user()->name."
                            </div> 
                        </div> 
                    </div>
                </div>
            </div>
";
        Comment::where("id",$id)
            ->update([
                "comment_body" => $tmp_reply,
                "updated_at" => now()
            ]);
        $msg = "<span class=\"alert alert-success\">
            Success : data has been save to comment id {$id}</span>";
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

    /* ============ backupComment 25 Jul 2021 ============================== */
    public function backupComment($id,$command=false){
        // get the comment 
        $comment = DB::table($this->comment_table)
                        ->where("id",$id)
                        ->first();

        // write to this file
        $file = base_path("DB/blog_comment_list.sqlite");
        $cm = "";

        switch($command):
        case"insert":

        break;
        case"edit":

            $cm .= "\n
/* ======== update comment id {$id}*/
    UPDATE `{$this->comment_table}` SET 
    comment_title='{$comment->comment_title}',
    comment_body='{$comment->comment_body}',
    updated_at='{$comment->updated_at}',
    comment_approve='{$comment->comment_approve}' 
    WHERE id={$id};
";

        break;
        default:
        $cm .= "\n
/* =========== delete comment {$id} ".date("Y-m-d H:i:s")." ================ */
DELETE FROM `$this->comment_table` WHERE id='{$id}';
";
        break;
        endswitch;
        write2text($file,$cm);
    }

    /* ============ backupComment 25 Jul 2021 ============================== */
}
