<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;

class Template extends Model
{
    use HasFactory;
    protected $fillable = [
        "user_id","tm_title","tm_method","tm_excerpt",
        "tm_body","tm_public","tm_approved_at"
    ];

    protected static $tmp_table = "templates";

    public function user(){
        return $this->belongsTo(User::class);
    }

    /* backup Template 20 Aug 2021 
     *
     * START
     * */

    /**
     * undocumented function
     *
     * @return void
     */
    public static function backupTemplate($tmp_id,$cmd=false)
    {

        // table
        $table = static::$tmp_table;

        // get the specific template by id 
        $tmp = Template::find($tmp_id);

        // command to write
        $command = "";

        // file to write 
        $file = base_path("DB/template_list.sqlite");

        // using the switch statement to specific the command

        switch($cmd):

            case"insert":
                $command .= "\n 
/* ============================================================================
 * backup insert Template id '{$tmp_id}' on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
INSERT INTO `{$table}`(`user_id`,`tm_method`,`tm_title`,`tm_excerpt`,`tm_body`,
`tm_public`,`created_at`,`updated_at`) VALUES(
    '{$tmp->user_id}',
    '{$tmp->tm_method}',
    '{$tmp->tm_title}',
    '{$tmp->tm_excerpt}',
    '{$tmp->tm_body}',
    '{$tmp->tm_public}',
    '{$tmp->created_at}',
    '{$tmp->updated_at}');
                    ";
            break;
            case"edit":
                $command .= "\n 
/* ============================================================================
 * bckup update Template id '{$tmp_id}' on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
UPDATE `{$table}` SET tm_title='{$tmp->whatnew_title}',
tm_excerpt='{$tmp->tm_excerpt}',
tm_body='{$tmp->tm_body}',
tm_public='{$tmp->tm_public}',
tm_approved_at='{$tmp->tm_approved_at}',
updated_at='{$tmp->updated_at}' WHERE id='{$tmp_id}';
";
            break;
            default:
            $command .= "\n
/* ============================================================================
 * back up delete template id '{$tmp_id}' on ".date("Y-m-d H:i:s")."
 * 
 * the delete method will not be execute at this time being just to prevent 
 * from an Error on the refresh database
 * ============================================================================
 * */
/* DELETE FROM `$table` WHERE id='{$tmp_id}'; */
";
            break;
        endswitch;

        // write to file
        write2text($file,$command);
    }
    


    /* backup Template 20 Aug 2021 
     *
     * END
     * */
}
