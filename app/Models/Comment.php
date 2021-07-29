<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id","comment_title","comment_body","comment_approved_at"
    ];

    protected static $blog_comment_link_table = 'blog_comment';

    protected static $comment_table = 'comments';

    /**
     * undocumented function
     *
     * @return void
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    /**
     * undocumented function
     *
     * @return void
     */
    public function blogs()
    {
        return $this->belongsToMany(Blog::class)->with("user");
    }
    

    /* ============= backupComment 27 Jul 2021 START =================== */

    public static function backupComment($comment_id,$cmd=false){
        
        // the comment table
        $table = static::$comment_table;

        $cmt = Comment::find($comment_id);
        $file = base_path("DB/comment_list.sqlite");
        $command = "";

        switch($cmd):
            case"insert":
                $command .= "\n 
/* ============================================================================
 * backup insert to {$table} the id '{$cmt->id}'
 *
 * ============================================================================
 * */
INSERT INTO `{$table}`(`user_id`,`comment_title`,`comment_body`,`created_at`,
`updated_at`) VALUES(
    '{$cmt->user_id}',
    '{$cmt->comment_title}',
    '{$cmt->comment_body}',
    '{$cmt->created_at}',
    '{$cmt->updated_at}');
";
                
            break;
            case"edit":
                $command .= "\n 
/* ============================================================================
 * update script on comment table '{$cmt->id}'
 * on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
UPDATE `{$table}` SET comment_title='{$cmt->comment_title}',
comment_body='{$cmt->comment_body}',
updated_at='{$cmt->updated_at}' WHERE id='{$cmt->id}';
";
            break;
            default:
        $command .= "\n
/* ============================================================================
 * DELETE comment id {$comment_id} as the link table has been delete 
 * on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
DELETE FROM `{$table}` WHERE id='{$comment_id}';
"; 
            break;
        endswitch;

        write2text($file,$command);
    }
    /* ============= backupComment 27 Jul 2021 END   =================== */

    /* ============= backupBlogCommentLink 27 Jul 2021 START================ */
    public static function backupBlogCommentLink($blog_id,$cmd=false){

        $table = static::$blog_comment_link_table;

        $file = base_path("DB/blog_comment_list.sqlite");
        $cmt = DB::table($table)
                    ->where("blog_id",$blog_id)
                    ->get();
        $comment_id = "";

        if(count($cmt) != 0):
            foreach($cmt as $item):
                $comment_id = $item->comment_id;
            endforeach;
        endif;

        // command to write 
        $command = "";

        // will be using switch statement to define the command
        switch($cmd):
            case"edit":
                if(count($cmt) != 0):
                    $command .= "\n 
/* ============================================================================
 * delete the link just to prevent from having repetition 
 * ============================================================================
 * */
DELETE FROM `{$table}` WHERE blog_id='{$blog_id}';
";
                endif;
                foreach($cmt as $comment):

                    $command .= "\n
/* ============================================================================
 * backup blog comment link  ".date("Y-m-d H:i:s")." 
 * blog id '{$blog_id}' linking to '{$comment->comment_id}'
 * ============================================================================
 * */
INSERT INTO `{$table}`(`user_id`,`blog_id`,`comment_id`,
`created_at`,`updated_at`) VALUES(
    '{$comment->user_id}',
    '{$comment->blog_id}',
    '{$comment->comment_id}',
    '{$comment->created_at}',
    '{$comment->updated_at}');
";
                endforeach;
            break;

            default:
                
                $command .= "\n
/* ============================================================================
 * Delete comment that linking to the blog id {$blog_id} as the blog 
 * has been deleted on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
DELETE FROM `{$table}` WHERE blog_id='{$blog_id}';
";     

                // delete the comment 
                static::backupComment($comment_id);
            break;
        endswitch;

        // write backup to file
        write2text($file,$command);

    }


    /* ============= backupBlogCommentLink 27 Jul 2021 END  ================ */
    
}
