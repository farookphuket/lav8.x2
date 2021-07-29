<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Tag;
use App\Models\User;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Template;
use Auth;
use DB;
use Illuminate\Http\Request;

class BlogController extends Controller
{

    protected $blog_table = '';
    protected $tag_link = '';
    protected $tag_table = '';
    protected $category_link = "blog_category";
    protected $read_count_table = "blog_count_read";

    protected $comment_table = "comments";
    protected $comment_link_table = "blog_comment";

    public function __construct(){
        $this->blog_table = "blogs";
        $this->tag_link = "blog_tag";
        $this->tag_table = "tags";
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       $category = Category::all(); 
       $template = Template::where('tm_method','blog')->get();

       
       return view("Admin.Blog.index")->with([
           "category" => $category,
           "template" => $template
       ]);
    }




    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getBlogs()
    {
        $blogs = Blog::with("user")        
                    ->with("tags")
                    ->with("category")
                    ->with("comments")
                    ->orderBy("created_at","desc")
                    ->paginate(3)
                    ->onEachSide(1);
        $tags = Tag::all();
        return response()->json([
            "blogs" => $blogs,
            "tags" => $tags
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

        $is_public = !request()->is_public?$is_public=0:$is_public=1;
        $new_tag = request()->new_tag;
        $user_tag = request()->user_tag;

        $slug = request()->slug;
        $validate = request()->validate([
            "title" => ["required","min:5","max:80"]
        ]);

        // category 
        $cat_id = request()->category;

        $validate["user_id"] = Auth::user()->id;
        $validate["is_public"] = $is_public;
        $validate["title"] = xx_clean(request()->title);
        $validate["excerpt"] = xx_clean(request()->excerpt);
        $validate["body"] = xx_clean(request()->body);
        $validate["slug"] = $slug;
        Blog::create($validate);

        $newPost = Blog::latest()->first();
        $newPost->tags()->attach($user_tag); 

        if($new_tag):
            $new_tag = $this->makeTag($newPost);
        endif;

        // make this blog link to the category 
        DB::table($this->category_link)
            ->insert([
                "category_id" => $cat_id,
                "blog_id" => $newPost->id,
                "created_at" => now(),
                "updated_at" => now()
            ]);

        // get the last insert row from blog_category table 
        $cat = DB::table($this->category_link)
                    ->latest()->first();

        // ===== make a backup for this post
        Blog::backupBlog($newPost->id,"insert");




        $msg = "<span class=\"alert alert-success\">
            Succes : data has been created</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }


    public function makeTag($obj){
        $get = Tag::where("tag_name",request()->new_tag)->get();
        $new_tag = '';


        if(count($get) == 0):
            $new_tag = Tag::create([
                "user_id" => Auth::user()->id,
                "tag_name" => request()->new_tag
            ]);

            $obj->tags()->attach($new_tag);

            // get the last row
            $tag = Tag::latest()->first();

            // make backup tag
            Tag::backupTag($tag->id,"insert");
        endif;

        $new_tag = Tag::latest()->first();
        return $new_tag;
    }






    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $get = Blog::with("user")
                    ->with("tags")
                    ->where("slug",$slug)
                    ->first();

        // update read count 
        Blog::blogCountRead($get->id);




        return view("Admin.Blog.show")->with([
            "blog" => $get
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $blog = Blog::with("tags")
                        ->with("category")
                        ->where("id",$id)
                        ->first();
        return response()->json([
            "blog" => $blog
        ]);
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


        $is_public = !request()->is_public?$is_public=0:$is_public=1;
        $new_tag = request()->new_tag;
        $user_tag = request()->user_tag;
        $cat_id = request()->category;
        $slug = request()->slug;
        $validate = request()->validate([
            "title" => ["required","min:5","max:80"]
        ]);


        $validate["is_public"] = $is_public;
        $validate["title"] = xx_clean(request()->title);
        $validate["excerpt"] = xx_clean(request()->excerpt);
        $validate["body"] = xx_clean(request()->body);
        $validate["slug"] = $slug;
        $validate["updated_at"] = now();

        Blog::where("id",$id)
                ->update($validate);

        $newPost = Blog::where("id",$id)->first();
        $newPost->tags()->sync($user_tag); 

        if($new_tag):
            $new_tag = $this->makeTag($newPost);
        endif;


        // make a backup to file 
        Blog::backupBlog($id,"edit");


        $msg = "<span class=\"alert alert-success\">
            Succes : data has been updated</span>";
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
    public function destroy($id)
    {

        // backup to file 
        Blog::backupBlog($id);


        $del = Blog::where('id',$id)->first();
        $del->tags()->detach();
        $del->delete();


        $msg = "<span class=\"alert alert-success\">
            Success : item has been remove</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }







}
