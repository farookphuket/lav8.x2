<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Blog;
use Illuminate\Http\Request;

use DB;
use Auth;

class CommentController extends Controller
{

    protected $blog_comment_link_table = 'blog_comment';
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {



        return view("Member.Comment.index");
    }

    public function getComment(){

        // only get his comment
        $comments = Comment::with("user")
                            ->with("blogs")
                            ->where("user_id",Auth::user()->id)
                            ->orderBy("created_at","desc")
                            ->paginate(2);

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
    public function store()
    {
        $valid = request()->validate([
            "comment_title" => ["required"],
            "comment_body" => ["required","min:50"]
        ]);

        $blog_id = request()->blog_id;

        // preparing data for comments table
        $valid["user_id"] = Auth::user()->id;
        $valid["comment_title"] = xx_clean(request()->comment_title);
        $valid["comment_body"] = xx_clean(request()->comment_body);
        $valid["comment_approved_at"] = now();

        // save comment 
        Comment::create($valid);

        // get the last insert row
        $cmt = Comment::latest()->first();

        // link comment with the blog id 
        DB::table($this->blog_comment_link_table)
            ->insert([
                "user_id" => $valid["user_id"],
                "blog_id" => $blog_id,
                "comment_id" => $cmt->id,
                "created_at" => now(),
                "updated_at" => now()
            ]);

        // backup comment 
        Comment::backupComment($cmt->id,"insert");

        // backup blog comment link 
        Comment::backupBlogCommentLink($blog_id,"edit");

        $msg = "<span class=\"alert alert-success\">
            Success comment has been created</span>";
        return response()->json([

            "msg" => $msg
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comment $comment)
    {
        //
    }
}
