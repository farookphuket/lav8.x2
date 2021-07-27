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
        // ===== backup blog link to category 
        $this->backupCategoryLink($cat->blog_id,"edit");

        // ===== make a backup for this post
        $this->backupBlog($newPost->id,"insert");




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
            $tag = Tag::last()->first();

            // make backup tag
            $this->backupTag($tag->id,"insert");
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
        $this->updateReadCount($get->id);



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
        $this->backupBlog($id,"edit");


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
        $this->backupBlog($id);

        $del = Blog::where('id',$id)->first();
        $del->tags()->detach();
        $del->delete();


        $msg = "<span class=\"alert alert-success\">
            Success : item has been remove</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }



    /* this method "backupBlog" will write the sql to file for backup 
     * the method will call some other method like "backupTagLink",
     * "backupCategoryLink","backupCommentLink"
     *
     * */
    /* =============== backup Blog ========================================= */
    public function backupBlog($id,$cmd=false)
    {
        // === backup blog 
        $blog = Blog::find($id);
        $blog_file = base_path("DB/blog_list.sqlite");



        $command = "";
        switch($cmd):
            case"insert":

                $command .= "\n 
/* ============================================================================
* backup script blog id {$id} on ".date("Y-m-d H:i:s")."
* =============================================================================
* */
INSERT INTO `{$this->blog_table}`(`user_id`,`slug`,`title`,`excerpt`,`body`,
`is_public`,`created_at`,`updated_at`) VALUES(
    '{$blog->user_id}',
    '{$blog->slug}',
    '{$blog->title}',
    '{$blog->excerpt}',
    '{$blog->body}',
    '{$blog->is_public}',
    '{$blog->created_at}',
    '{$blog->updated_at}');
";
                // ======= backup tag link
                $this->backupTagLink($blog->id,"edit");

            break;
            case"edit":

                $command .= "\n
/* ============================================================================
* backup update blog id {$blog->id} on ".date("Y-m-d H:i:s")."
* =============================================================================
* */
UPDATE `{$this->blog_table}` SET title='{$blog->title}',
slug='{$blog->slug}',
excerpt='{$blog->excerpt}',
body='{$blog->body}',
is_public='{$blog->is_public}',
updated_at='{$blog->updated_at}'
WHERE id='{$blog->id}';
";

                
                // ======= backup tag link
                $this->backupTagLink($blog->id,"edit");
            break;
            default:
                $command .= "\n
/* ============================================================================
 * Delete blog {$blog->id} on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
DELETE FROM `{$this->blog_table}` WHERE id='{$blog->id}';
";

            /*
             * after we have delete the specific blog id 
             * all of the link table will be orphan so we have to make sure 
             * that this will not be an orphan link left on the next migrate
             * other wise the command will be Error as it's cannot find the 
             * specific id for the blog id 
             * the table link that relatest to this blog id in case delete
             * has 4 tables 
             * "blog_category","blog_tag","blog_comment","blog_count_read"
             * */
            // ======= delete backup tag link
            $this->backupTagLink($blog->id);

            // == delete category link 
            $this->backupCategoryLink($blog->id);

            // == delete read count 
            $this->backupReadCount($blog->id);

            // delete the comment link 
            Comment::backupBlogCommentLink($blog->id);

            break;
        endswitch;

        write2text($file,$command);
    }


    // ============= tag table backup
    public function backupTag($id,$cmd=false){
        /*
         * this method will be call when to create new tag 
         * relatest to store,update method on blog
         * */
        $tag = Tag::find($id);
        $file = base_path("DB/tag_list.sqlite");

        $command = "";
    
        switch($cmd):

        case"insert":

            $command .= "\n
/* ============================================================================
* backup insert new tag {$id} on ".date("Y-m-d H:i:s")."
* =============================================================================
* */
INSERT INTO `{$this->tag_table}`(`user_id`,`tag_name`,`created_at`,
`updated_at`) VALUES(
    '{$tag->user_id}',
    '{$tag->tag_name}',
    '{$tag->created_at}',
    '{$tag->updated_at}');
";
        break;
        case"edit":
            $command .= "\n
/* ============================================================================
 * backup update tag id {$id} on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
UPDATE `{$this->tag_table}` SET tag_name='{$tag->tag_name}',
updated_at='{$tag->updated_at}' WHERE id='{$tag->id}';
";
        break;
        default:
            $command .= "\n
/* ============================================================================
 * DELETE command for tags table on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
DELETE FROM `{$this->tag_table}` WHERE id='{$id}';
";
        break;
        endswitch;


        write2text($file,$command);
    }

    /* ============= backupCategoryLink 16 Jul 2021 =========================*/
    public function backupCategoryLink($blog_id,$cmd=false){
        $cat_link = DB::table($this->category_link)
                    ->where("blog_id",$blog_id)
                    ->get();
        $file = base_path("DB/blog_category.sqlite");
        $cont = "";

        switch($cmd):
            case"edit":

                if(count($cat_link) != 0):
                    $cont .= "\n 
/* ============================================================================
 * just to prevent from the repetition so delete the old link to 
 * blog id {$blog_id} on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */                    
DELETE FROM `{$this->category_link}` WHERE blog_id='{$blog_id}';\n";

               endif; 

                    foreach($cat_link as $cat):
                        $cont .= "\n
/* ============================================================================
 * backup the blog id {$blog_id} to link to {$cat->category_id} 
 * on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */                    
        INSERT INTO `{$this->category_link}`(`category_id`,`blog_id`,`created_at`,
        `updated_at`) VALUES(
            '{$cat->category_id}','{$cat->blog_id}',
            '{$cat->created_at}','{$cat->updated_at}');
        "; 
                    endforeach;

            break;
            default:

                $cont .= "\n
/* ============================================================================
 * backup DELETE category as The blog id {$blog_id} 
 * has deleted on ".date("Y-m-d H:i:s")."   
 * ============================================================================
*/ 
DELETE FROM `{$this->category_link}` WHERE blog_id='{$blog_id}';";
            break;
        endswitch;


        write2text($file,$cont);
    }

    /* ============= backupCategoryLink 16 Jul 2021 =========================*/

    /* ============= backupTagLink 27 Jul 2021 START ======================= */
    public function backupTagLink($id,$cmd=false){
        /*
         * this method will call by "backupBlog" 
         * this method will write the insert command to file 
         * "DB/blog_tag.sqlite" to backup the blog tag link 
         *
         * */

        // file to write the command
        $file = base_path("DB/blog_tag.sqlite");

        // get the tag that link to the specific blog_id 
        $tags = DB::table($this->tag_link)
                        ->where("blog_id",$id)
                        ->get();

        // the command to write
        $command = "";

        switch($cmd):
            case"edit":
                if(count($tags) != 0):

                    $command .= "\n
/* ============================================================================
 * delete the tag link from blog id {$id} on ".date("Y-m-d H:i:s")."
 * to prevent this command from repetition
 * ============================================================================
 * */
DELETE FROM `{$this->tag_link}` WHERE blog_id='{$id}';\n
";
                endif;
                
                // tag link can be more than one 
                foreach($tags as $ta):
                    $command .= "\n 
/* ============================================================================
 * backup tag link for blog id {$id} on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
INSERT INTO `{$this->tag_link}`(`blog_id`,`tag_id`,`created_at`,`updated_at`) 
VALUES(
    '{$ta->blog_id}',
    '{$ta->tag_id}',
    '{$ta->created_at}',
    '{$ta->updated_at}');
";
                endforeach;

            break;
            default:
                $command .= "\n
/* ============================================================================
 * delete the tag link from blog id {$id} on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
DELETE FROM `{$this->tag_link}` WHERE blog_id='{$id}';
";
            break;
        endswitch;

        // write the command to file
        write2text($file,$command);
    }

    /* ============= backupTagLink 27 Jul 2021 END   ======================= */



    /* ============ update read count 26 Jul 2021 ========================== */
    public function updateReadCount($blog_id){

        $blog = Blog::find($blog_id);

        $count_read = DB::table($this->read_count_table)
                    ->where("blog_id",$blog_id)
                    ->whereDay("last_readed_at","=",date("Y-m-d"))
                    ->where("ip",getUserIp())
                    ->get();
        $new_read = "";
        if(count($count_read) == 0):
            $new_read = [
                "blog_id" => $blog_id,
                "ip" => getUserIp(),
                "os" => getUserOs(),
                "browser" => getUserBrowser(),
                "last_readed_at" => now(),
                "created_at" => now(),
                "updated_at" => now()
            ];
        DB::table($this->read_count_table)
            ->insert($new_read);

        // get the read count of this blog id
        $new_count = DB::table($this->read_count_table)
                        ->where("blog_id",$blog->id)
                        ->get();
                        
        // update field read count
        Blog::where("id",$blog_id)
            ->update([
                "read_count" => count($new_count)
            ]);

        // make backup to file
        $this->backupReadCount($blog->id,"insert");

        endif;
    }

    public function backupReadCount($id,$cmd=false){
        $file = base_path("DB/blog_count_read.sqlite");

        $r_count = DB::table($this->read_count_table)
                        ->where("blog_id",$id)
                        ->latest()
                        ->first();
        $command = "";
        switch($cmd):
            case"insert":
                $command .= "\n
/* ============================================================================
*  read count for blog id {$id} on ".date("Y-m-d H:i:s")."
* =============================================================================
*/
INSERT INTO `{$this->read_count_table}`(`blog_id`,`ip`,`browser`,`os`,
`last_readed_at`,`created_at`,`updated_at`) VALUES(
    '{$r_count->blog_id}',
    '{$r_count->ip}',
    '{$r_count->browser}',
    '{$r_count->os}',
    '{$r_count->created_at}',
    '{$r_count->updated_at}');
";
            break;
            default:
                $command .= "\n 
/* ============================================================================
 *  delete this read count link as the blog id {$r_count->blog_id} has been 
 *  removed , this command created on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
DELETE FROM `{$this->read_count_table}` WHERE blog_id='{$r_count->blog_id}';
";
            break;
        endswitch;

        write2text($file,$command);

    }
    /* ============ update read count 26 Jul 2021 ========================== */


}
