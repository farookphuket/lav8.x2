<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Blog;
use App\Models\Tag;
use Auth;
use DB;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    
    
    
    protected $comment_table;
    protected $tag_link;
    protected $tag_table;
    protected $blog_table;

    public function __construct(){
        $this->comment_table = "blog_comment";
        $this->tag_link = "blog_tag";
        $this->tag_table = "tags";
        $this->blog_table = "blogs";
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        // get the last row for the meta title on blog page
        $last_blog = Blog::with('user')
                        ->latest()->first();

        return view('Member.Blog.index')->with([
            "last_blog" => $last_blog
        ]);
    }



    /**
     * Display a listing blog.
     *
     * @return json data for ajax call
     */
    public function getBlogs()
    {
        $blogs = Blog::with('user')
            ->with("tags")
            ->where("is_public",1)
            ->orWhere("user_id",Auth::user()->id)
            ->orderBy("created_at","desc")
            ->paginate(10)
            ->onEachSide(1);

        return response()->json([
            "blogs" => $blogs
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

        $is_public = !request()->is_public?$is_public = 0:$is_public = 1;
        $newtag = request()->new_tag;
        $tags = request()->user_tag;
        $validate = request()->validate([
            "title" => ["required","min:8","max:80"],
            "new_tag" => ["min:3","max:15","nullable"]
        ]);

        // filter the body
        $newBody = xx_clean(request()->body);
        
        $validate["slug"] = request()->slug;
        $validate["user_id"] = Auth::user()->id;
        $validate["excerpt"] = xx_clean(request()->excerpt);
        $validate["body"] = xx_clean(request()->body);
        $validate["is_public"] = $is_public;

        // === create post 
        Blog::create($validate);

        $newPost = Blog::latest()->first();
        $newPost->tags()->attach($tags);
        if($newtag):
            $this->makeTag($newPost);
        endif;

        // ====== make a backup for new post
        $this->backupInsertBlog();

        $msg = "<span class=\"alert alert-success\">
            success : data has been created </span>";
        return response()->json([
            "msg" => $msg
        ]);
    }



    public function makeTag($tag){
        $validate = request()->validate([
            "new_tag" => ["min:3","max:15"]
        ]);

        $get = Tag::with("blog")
                ->where("tag_name",request()->new_tag)->first();
            
        if(!$get):
            Tag::create([
                "tag_name" => request()->new_tag,
                "user_id" => Auth::user()->id
            ]);
            $newTag = Tag::latest()->first();
            $tag->tags()->attach($newTag);

            // === make backup tag
            $this->backupInsertTag();
        endif;
        return $get;
    }

    // =========== saveComment ===============

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function saveComment()
    {

        $validate = request()->validate([
            "comment_title" => ["required","min:5","max:80"],
            "comment_body" => ["required","max:2500"]
        ]);
        $data = $this->makeValidComment(); 

        $validate["comment_title"] = $data["comment_title"];
        $validate["comment_body"] = $data["comment_body"];
        $validate["user_id"] = Auth::user()->id;
        $validate["blog_id"] = request()->blog_id;
        $validate["comment_approve"] = true;
        $validate["created_at"] = now();
        $validate["updated_at"] = now();

        DB::table($this->comment_table)->insert($validate);

        // ===== make backup for comment
        $this->backupInsertComment();
        
        $msg = "<span class=\"alert alert-success\">
            your comment has been created  </span>";
        return response()->json([
            "msg" => $msg,
            "data" => $data,
        ]);
    }

    // ===========================================
    //  
    // =========== Make valid comment ============
    public function makeValidComment(){

        $title = xx_clean(request()->comment_title);
        $body = xx_clean(request()->comment_body);

        $data = [
            "comment_title" => $title,
            "comment_body" => $body
        ];

        return $data;

    } 
    
   // ============= End of make vilidComment 
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function show(Blog $blog)
    {

        $bl = Blog::with('user')
            ->with("tags")
            ->where('slug',$blog->slug)
            ->get();
        return view('Member.Blog.show')->with([
            "blog" => $bl
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
            ->where('id',$id)->get();
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


        $is_public = !request()->is_public?$is_public = 0:$is_public = 1;
        $newtag = request()->new_tag;
        $tags = request()->user_tag;
        $validate = request()->validate([
            "title" => ["required","min:8"]
        ]);

        $validate["excerpt"] = xx_clean(request()->excerpt);
        $validate["body"] = xx_clean(request()->body);

        $validate["is_public"] = $is_public;
        $validate["updated_at"] = now();
        $validate["slug"] = request()->slug;

        Blog::where('id',$id)->update($validate);
        $blog = Blog::where("id",$id)->first();

        // update tag
        $blog->tags()->sync($tags);
        if($newtag):
            $newtag = $this->makeTag($blog);
        endif;

        $msg = "<span class=\"alert alert-success\">
            success : data has been updated </span>";
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
        //
        $del = Blog::where('id',$id)->first();
        $del->delete();

        $msg = "<span class=\"alert alert-success\">
            success : data has been deleted </span>";
        return response()->json([
            "msg" => $msg
        ]);
    }


    /* backup for comment START */

    public function backupInsertComment(){

        // get the last insert row
        $bk = DB::table($this->comment_table)
                ->latest()->first();
        $file = base_path("DB/blog_comment_list.sqlite");
        $content = "/* ====== auto back up INSERT ".date("Y-m-d H:i:s");
        $content .= " table {$this->comment_table} ===== */";
        $content .= " 
    INSERT INTO `{$this->comment_table}`(`user_id`,`blog_id`,`comment_title`,
    `comment_body`,`comment_approve`,`created_at`,`updated_at`) VALUES(
        '{$bk->user_id}','{$bk->blog_id}','{$bk->comment_title}',
        '{$bk->created_at}','{$bk->updated_at}'
);
";
        write2text($file,$content);
    }


    /* backup for comment END */

    /* ===================== backup insert blog START =================== */
    public function backupInsertBlog(){
        // get the last insert row
        $blog = Blog::latest()->first();
        
        $blog_file = base_path("DB/blog_list.sqlite");
        $blog_content = "/* ===== auto backup blogs table ".date("Y-m-d H:i:s");
        $blog_content .= " ======== */";
        $blog_content .= "
INSERT INTO `{$this->blog_table}`(`user_id`,`slug`,`title`,`excerpt`,`body`,
`is_public`,`created_at`,`updated_at`) VALUES(
    '{$blog->user_id}','{$blog->slug}','{$blog->title}',
    '{$blog->excerpt}',
    '{$blog->body}',
    '{$blog->is_public}',
    '{$blog->created_at}','{$blog->updated_at}'
);
";
        write2text($blog_file,$blog_content);

        // the command attach will leave the field created_at,updated_at NULL
        // we have to update that 2 fields
        DB::table($this->tag_link)
                ->where("blog_id",$blog->id)
                ->update([
            "created_at" => now(),
            "updated_at" => now()
                ]);
        // tag can be more than one 
        $get_tag = DB::table($this->tag_link)
                            ->where("blog_id",$blog->id)
                            ->get();
        foreach($get_tag as $item):
            $file = base_path("DB/blog_tag.sqlite");
        $con2 = "/* ============== auto tags ".date("Y-m-d H:i:s");
        $con2 .= " ======== make link for blog {$blog->id} ===== */";
        $con2 .= "
INSERT INTO `{$this->tag_link}`(`blog_id`,`tag_id`,`created_at`,`updated_at`) 
VALUES(
    '{$item->blog_id}','{$item->tag_id}',
    '{$item->created_at}','{$item->updated_at}'
);
";
        write2text($file,$con2);
        endforeach;
    }
    /* ===================== backup insert blog END   =================== */

    /* ================= backup TAGS START ============= */
    public function backupInsertTag(){
        $tag = Tag::latest()->first();

        $file = base_path("DB/tag_list.sqlite");
        $content = "/* ====== auto insert tags table ".date("Y-m-d H:i:s");
        $content .= " ====== */";
        $content .= "
INSERT INTO `{$this->tag_table}`(`user_id`,`tag_name`,`created_at`,
`updated_at`) VALUES(
    '{$tag->user_id}','{$tag->tag_name}','{$tag->created_at}',
    '{$tag->updated_at}'
);
";

        write2text($file,$content);
    } 
    /* ================= backup TAGS END  ============= */


}
