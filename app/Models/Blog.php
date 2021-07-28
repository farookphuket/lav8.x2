<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id","slug","title","excerpt",
        "body","is_public"
    ];

    protected static $blog_table = "blogs";

    protected static $blog_count_read_table = 'blog_count_read';

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function tags(){
        return $this->belongsToMany(Tag::class);
    }

    public function category(){
        return $this->belongsToMany(Category::class);
    }

    public function comments(){
        return $this->belongsToMany(Comment::class)->with("user");
    }

    /* ============== backup blog 28 Jul 2021 START ======================== */

    public static function backupBlog($blog_id,$cmd=false){
        $table = static::$blog_table;

        // get the specific blog by id
        $blog = Blog::find($blog_id);

        // backup command 
        $command = "";

        // file to write command to
        $file = base_path("DB/blog_list.sqlite");

        /* 
         * use switch statment to specified command default to delete
         * */
        switch($cmd):

            case"insert":
                $command .= "\n
/* ============================================================================
 * blog id {$blog->id} backup INSERT on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
INSERT INTO `{$table}`(`user_id`,`slug`,`title`,`excerpt`,`body`,`is_public`,
`read_count`,`comment_count`,`created_at`,`updated_at`) VALUES(
    '{$blog->user_id}',
    '{$blog->slug}',
    '{$blog->title}',
    '{$blog->excerpt}',
    '{$blog->body}',
    '{$blog->is_public}',
    '{$blog->read_count}',
    '{$blog->comment_count}',
    '{$blog->created_at}',
    '{$blog->updated_at}');
";
            break;
            case"edit":
                $command .= "\n
/* ============================================================================
 * blog id {$blog->id} backup UPDATE on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
UPDATE `{$table}` SET title='{$blog->title}',
slug='{$blog->slug}',
excerpt='{$blog->excerpt}',
body='{$blog->body}',
is_public='{$blog->is_public}',
updated_at='{$blog->updated_at}' WHERE id='{$blog->id}';
";
            break;
            default:

                $command .= "\n
/* ============================================================================
 * blog id {$blog->id} backup DELETE on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
DELETE FROM `{$table}` WHERE id='{$blog->id}';

";
            /*
             * blog id will be relatest to another 4 pivot table 
             * "blog_count_read","blog_comment","blog_tag","blog_category"
             * if you delete the blog all of the relatest pivot table will go 
             * orphan this will lead an error on the next reset 
             * so make sure that all of this table will get the delete command 
             * as well
             *
             * */

            // delete the blog id from blog_count_read_table
            static::backupBlogCountRead($blog->id);

            // delete from blog_tag_table 
            Tag::backupBlogTagLink($blog->id);

            // delete from blog_comment table 
            Comment::backupBlogCommentLink($blog->id);

            // delete from blog_category_table 
            Category::backupBlogCategoryLink($blog->id);

            break;
        endswitch;

        // write command to file 
        write2text($file,$command);

    }

    /* ============== backup blog 28 Jul 2021 END ========================== */


    /*
     * count read 
     * */
    public static function blogCountRead($blog_id,$cmd=false){
        $table = static::$blog_count_read_table;

        $blog_table = static::$blog_table;

        //get the previous reader info 
        $get_reader = DB::table($table)
                    ->whereDate("last_readed_at",date("Y-m-d")) 
                    ->where("ip",getUserIp())
                    ->where("blog_id",$blog_id)
                    ->get();

        // only if this ip has not in the record today
        // then will create a new record
        if(count($get_reader) == 0):
            $new_data = [
                "blog_id" => $blog_id,
                "ip" => getUserIp(),
                "os" => getUserOs(),
                "browser" => getUserBrowser(),
                "last_readed_at" => now(),
                "created_at" => now(),
                "updated_at" => now()
            ];

            // create new record
            DB::table($table)
                    ->insert($new_data);

            // get all record include the new record
            $new_read_count = DB::table($table)
                                    ->where("blog_id",$blog_id)
                                    ->get();

            // update read count field in blogs table 
            Blog::where("id",$blog_id)
                ->update([
                    "read_count" => count($new_read_count)
                ]);

            // get the last record
            $bk_view = DB::table($table)
                                ->latest()
                                ->first();
            // make a backup to file 
            static::backupBlogCountRead($bk_view->blog_id,"edit"); 

        endif;

    }

    /* ===================================================================== */

    /* ========================================================================
     * backup blog read count 28 Jul 2021
     * ========================================================================
     * */
    public static function backupBlogCountRead($blog_id,$cmd=false){

        // get the blog 
        $blog = Blog::find($blog_id);

        // table link
        $table = static::$blog_count_read_table;

        // file to write command 
        $file = base_path("DB/blog_count_read.sqlite");

        // the command to write 
        $command = "";

        $get_count = DB::table($table)
                    ->where("blog_id",$blog_id)
                    ->get();
        switch($cmd):

            case"edit":

                foreach($get_count as $co):
                    $command .= "\n
/* ============================================================================
 * backup read count for blog id '{$co->blog_id}' on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
INSERT INTO `{$table}`(`blog_id`,`ip`,`os`,`browser`,`last_readed_at`,
`created_at`,`updated_at`) VALUES(
    '{$co->blog_id}',
    '{$co->ip}',
    '{$co->os}',
    '{$co->browser}',
    '{$co->last_readed_at}',
    '{$co->created_at}',
    '{$co->updated_at}');
";
                endforeach;

            break;
            default:
                $command .= "\n
/* ============================================================================
 * delete the record as the blog id '{$blog_id}' has been removed
 * script on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
DELETE FROM `{$table}` WHERE blog_id='{$blog_id}';
";
            break;
        endswitch;

        write2text($file,$command);
    }

    /* ========================================================================
     * backup blog read count 28 Jul 2021
     * ========================================================================
     * */

}
