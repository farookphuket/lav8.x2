<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;

class Tag extends Model
{
    protected static $blog_tag_link_table = 'blog_tag';

    protected static $tag_table = 'tags';


    use HasFactory;
    protected $fillable = [
        "user_id","tag_name"
    ];

    public function blogs(){
        return $this->belongsToMany(Blog::class);
    }
    public function users(){
        return $this->belongsTo(User::class);
    }



    /* ============= backupTag 28 Jul 2021 START =========================== */
    public static function backupTag($tag_id,$cmd=false){
        $table = static::$tag_table;

        $tag = Tag::find($tag_id);

        $file = base_path("DB/tag_list.sqlite");

        $command = "";

        switch($cmd):
        case"insert":
            $command .= "\n
/* ============================================================================
 * backup tag id {$tag->id} CREATE on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
INSERT INTO `{$table}`(`user_id`,`tag_name`,`created_at`,`updated_at`) VALUES(
    '{$tag->user_id}',
    '{$tag->tag_name}',
    '{$tag->created_at}',
    '{$tag->updated_at}');
";
            break;
        case"edit":

            $command .= "\n
/* ============================================================================
 * backup tag id {$tag->id} UPDATE on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
UPDATE `{$table}` SET tag_name='{$tag->tag_name}',
updated_at='{$tag->updated_at}' WHERE id='{$tag->id}';
";
            break;
        default:
            $command .= "\n
/* ============================================================================
 * backup tag id {$tag->id}  DELETE on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
/* DELETE FROM `{$table}` WHERE id='{$tag->id}'; */
";
        break;
        endswitch;


        write2text($file,$command);

    }


    public static function backupBlogTagLink($blog_id,$cmd=false){
        // pivot table to link tag and blog 
        $table = static::$blog_tag_link_table;

        // file to write backup command 
        $file = base_path("DB/blog_tag.sqlite");


        // the attach will leave the field "created_at","updated_at" 
        // in the pivot table as blank so we have to update it
        DB::table($table)
            ->where("blog_id",$blog_id)
            ->update([
                "created_at" => now(),
                "updated_at" => now()
            ]);


        // get the tag that has a specific blog id
        $tags = DB::table($table)
                        ->where("blog_id",$blog_id)
                        ->get();
        $tag_id = "";
        $command = "";

        

        if(count($tags) != 0):

            
            foreach($tags as $ta):
                $tag_id = $ta->tag_id;
            endforeach;
        endif;

        switch($cmd):

            case"edit":
                if(count($tags) != 0):

                    $command .= "\n
/* ============================================================================
 * DELETE tag link just to prevent from having a repetition 
 * on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
/* DELETE FROM `{$table}` WHERE blog_id='{$blog_id}'; */
";
                endif;

                foreach($tags as $ta):
                    $command .= "\n
/* ============================================================================
 * backup tag id '{$ta->tag_id}' link to blog id '{$ta->blog_id}' 
 * on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
INSERT INTO `{$table}`(`blog_id`,`tag_id`,`created_at`,`updated_at`) VALUES(
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
 * DELETE tag link as the current blog id '{$blog_id}' has been removed 
 * on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
/* DELETE FROM `{$table}` WHERE blog_id='{$blog_id}'; */
";
               // the tag itself can be empty so no need to delete 
               // we just delete the link as the blog id has already removed. 
        break;
        endswitch;

        // write to file
        write2text($file,$command);

    }

    /* ============= backupTag 28 Jul 2021 END ============================= */
}
