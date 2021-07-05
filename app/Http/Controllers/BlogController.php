<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\User;
use Illuminate\Http\Request;

use DB;

class BlogController extends Controller
{

    protected $comment_table;

    public function __construct(){
        $this->comment_table = "blog_comment";
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $last_blog = Blog::with("user")
            ->where([
                "is_public" => 1
            ])
            ->latest()->first();

        return view("Pub.blog.index")
            ->with([
                "blog" => $last_blog
            ]);
    }


    /**
     * Display a listing of the resource.
     * call by ajax on search
     * @return json data
     */
    public function search(){
        $search = request()->search;
        $blogs = Blog::with("user")
            ->with("tags")
            ->where("title","LIKE","%{$search}%")
            ->where("is_public",1)
            ->orderBy("created_at","desc")
            ->get();
        return response()->json([
            "blogs" => $blogs
        ]);
    }



    /**
     * Display a listing of the resource.
     * call by ajax on get
     * @return json data
     */
    public function getBlogs(){
        $blogs = Blog::with("user")
            ->with("tags")
            ->where("is_public",1)
            ->orderBy("created_at","desc")
            ->paginate(15)
            ->onEachSide(1);

        // show tag on the right side
        $tag_blog = Blog::with("tags")
                    ->with("user")
                    ->orderBy("created_at")
                    ->get();
        return response()->json([
            "blogs" => $blogs,
            "tag_blog" => $tag_blog
        ]);
    }



    /**
     * getComments depen on blog id.
     *
     * @return json
     */

    public function getComments(){
        $blog_id = request()->blog_id;
        $blog = Blog::where("id",$blog_id)->first();
        $slug = $blog->slug;
        $comments = DB::table("users")
            ->join("{$this->comment_table}","{$this->comment_table}.user_id",
            "=","users.id")
            ->select("users.name","users.email","{$this->comment_table}.*")
            ->where("{$this->comment_table}.blog_id",$blog_id)
            ->orderBy("created_at","desc")
            ->paginate(2)
            ->onEachSide(2);

        return response()->json([
            "comments" => $comments,
            "slug" => $slug
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
    public function show(Blog $blog)
    {
        $get_recent = Blog::with("user")
            ->with("tags")
            ->where("is_public",1)
            ->orderBy("created_at","desc")
            ->limit(5)
            ->get();
        $show = Blog::with("user")
                    ->with("tags")
                    ->where([
                        "is_public" => 1,
                        "slug" => $blog->slug
                    ])
                    ->get();

        return view('Pub.blog.show')->with([
            "blog" => $show,
            "blog_recent" => $get_recent
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
    public function update(Request $request, Blog $blog)
    {
        //
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
