<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Tag;
use App\Models\User;
use App\Models\Category;
use Auth;
use DB;
use Illuminate\Http\Request;

class BlogController extends Controller
{

    protected $blog_table = '';
    protected $tag_link = '';
    protected $tag_table = '';
    protected $category_link = "blog_category";

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
       return view("Admin.Blog.index")->with([
           "category" => $category
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



        $validate["user_id"] = Auth::user()->id;
        $validate["is_public"] = $is_public;
        $validate["excerpt"] = xx_clean(request()->excerpt);
        $validate["body"] = xx_clean(request()->body);
        $validate["slug"] = $slug;
        Blog::create($validate);

        $newPost = Blog::latest()->first();
        $newPost->tags()->attach($user_tag); 

        if($new_tag):
            $new_tag = $this->makeTag($newPost);
        endif;

        // set the category for this post 
        $this->updateCategoryLink($newPost->id);

        // ===== make a backup for this post
        $this->backupBlog();


        // make a backup category link for this post 
        $this->backupCategoryLink($newPost->id);


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
            // make backup tag
            $this->backupTag();
        endif;

        $new_tag = Tag::latest()->first();
        return $new_tag;
    }


    /**
     * write to backup file for insert command
     *
     * @param  
     * @return work with store function
     */
    public function backupBlog()
    {
        // === backup blog 
        $blog = Blog::latest()->first();
        $blog_file = base_path("DB/blog_list.sqlite");
        $con1 = "/* ==== auto backup {$this->blog_table} ".date("Y-m-d H:i:s");
        $con1 .= " ===== INSERT Command */";
        $con1 .= "
    INSERT INTO `{$this->blog_table}`(`user_id`,`slug`,`title`,`excerpt`,`body`,
    `is_public`,`created_at`,`updated_at`) VALUES(
        '{$blog->user_id}',
        '{$blog->slug}',
        '{$blog->title}',
        '{$blog->excerpt}',
        '{$blog->body}',
        '{$blog->is_public}',
        '{$blog->created_at}','{$blog->updated_at}'
);
";
        write2text($blog_file,$con1);

        // ==========================
        $now = now();
        // the attach will not insert created_at,updated_at field so 
        // this 2 fields will be null we have to update this 
        DB::table($this->tag_link)
                    ->where("blog_id",$blog->id)
                    ->update([
                        "created_at" => $now,
                       "updated_at" => $now 
                    ]);
        $get_tag = DB::table($this->tag_link)
            ->where("blog_id",$blog->id)
            ->get();
        //===== tag can be more than one item
        foreach($get_tag as $item):
            $file = base_path("DB/blog_tag.sqlite");
            $con2 = "/* ======= auto tag link ".date("Y-m-d H:i:s");
            $con2 .= " ======= table {$this->tag_link} ========== */";
            $con2 .= "
    INSERT INTO `{$this->tag_link}`(`blog_id`,`tag_id`,`created_at`,
    `updated_at`) VALUES(
        '{$item->blog_id}','{$item->tag_id}',
        '{$item->created_at}','{$item->updated_at}'
);
";
        write2text($file,$con2);
        endforeach;
    }


    /**
     * write to backup file for insert command
     * for backup tag
     * @param  
     * @return work with store function
     */

    public function backupTag(){
        $tag = Tag::latest()->first();
        $file = base_path("DB/tag_list.sqlite");
        $content = "/* ================= auto INSERT ".date("Y-m-d H:i:s");
        $content .= " === for {$this->tag_table} table ========== */";
        $content .= "
    INSERT INTO `{$this->tag_table}`(`user_id`,`tag_name`,`created_at`,
    `updated_at`) VALUES(
        '{$tag->user_id}','{$tag->tag_name}',
        '{$tag->created_at}','{$tag->updated_at}'
);
";
        write2text($file,$content);
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

        // update the category 
        $this->updateCategoryLink($id);

        // make a backup category link for this post 
        $this->backupCategoryLink($id);

        // make a backup to file 
        $this->backupUpdateBlog($id);
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
        $del = Blog::where('id',$id)->first();
        $del->tags()->detach();
        $del->delete();


        $msg = "<span class=\"alert alert-success\">
            Success : item has been remove</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /* =============== updateCategoryLink 16 Jul 2021 ===================*/
    public function updateCategoryLink($id){
        $get_cat = DB::table($this->category_link)
                        ->where("blog_id",$id)
                        ->get();
        if(count($get_cat) == 0):
            DB::table($this->category_link)
            ->insert([
                "category_id" => request()->category,
                "blog_id" => $id,
                "created_at" => now(),
                "updated_at" => now()
            ]); 
        else:
        DB::table($this->category_link)
            ->where("blog_id",$id) 
            ->update([
                "category_id" => request()->category,
                "updated_at" => now()
            ]);
        endif;
            
    }

    /* =============== updateCategoryLink 16 Jul 2021 ===================*/

    /* ========================== backup update blog 12 Jul 2021 =========== */
    public function backupUpdateBlog($id){
        $blog = Blog::find($id);
        $file = base_path("DB/blog_list.sqlite");

        $cont = "/* =============== update script =========================*/";
        $cont .= "
UPDATE `{$this->blog_table}` SET title='{$blog->title}',
slug='{$blog->slug}',
excerpt='{$blog->excerpt}',
body='{$blog->body}',
is_public='{$blog->is_public}',
updated_at='{$blog->updated_at}'
WHERE id='{$blog->id}';
";

        write2text($file,$cont);
        
        // update tag 
        $tags = DB::table($this->tag_link)
                    ->where("blog_id",$blog->id)
                    ->get();
        if(count($tags) != 0):

            $f2 = base_path("DB/blog_tag.sqlite");
        $c2 = "/* ===== delete the current tag link ===========*/";
        $c2 .= "DELETE FROM `$this->tag_link` WHERE blog_id='{$blog->id}';";
            foreach($tags as $tag):
                $c2 .= "/* === re-insert new update tag link ============= */";
        $c2 .= "
INSERT INTO `{$this->tag_link}`(`blog_id`,`tag_id`,`created_at`,`updated_at`) 
VALUES(
    '{$tag->blog_id}',
    '{$tag->tag_id}',
    '{$tag->created_at}','{$tag->updated_at}');
";

            endforeach; 
        write2text($f2,$c2);
        endif;

    }
    /* ========================== backup update blog 12 Jul 2021 =========== */

    /* ============= backupCategoryLink 16 Jul 2021 =========================*/
    public function backupCategoryLink($blog_id){
        $cat_link = DB::table($this->category_link)
                    ->where("blog_id",$blog_id)
                    ->get();
        $file = base_path("DB/blog_category.sqlite");
        $cont = "\n/* ======== backup blog category link ==========*/";
        if(count($cat_link) != 0):
            $cont .= "\nDELETE FROM `{$this->category_link}` 
            WHERE blog_id='{$blog_id}';\n";
            foreach($cat_link as $cat):
                $cont .= "
INSERT INTO `{$this->category_link}`(`category_id`,`blog_id`,`created_at`,
`updated_at`) VALUES(
    '{$cat->category_id}','{$cat->blog_id}',
    '{$cat->created_at}','{$cat->updated_at}');
"; 
            endforeach;

        else:

            foreach($cat_link as $cat):
                $cont .= "\n
INSERT INTO `{$this->category_link}`(`category_id`,`blog_id`,`created_at`,
`updated_at`) VALUES(
    '{$cat->category_id}','{$cat->blog_id}',
    '{$cat->created_at}','{$cat->updated_at}');
"; 
            endforeach;

       endif; 
        write2text($file,$cont);
    }

    /* ============= backupCategoryLink 16 Jul 2021 =========================*/




}
