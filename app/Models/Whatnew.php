<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;

class Whatnew extends Model
{
    use HasFactory;

    protected $fillable = [
        "token","user_id","whatnew_title","whatnew_body",
        "is_public"
    ];

    protected static $whatnew_table = "whatnews";


    public function user(){
        return $this->belongsTo(User::class);
    }

    /* ========================================================================
     * backupWhatnew date 30 Jul 2021
     * START
     * ========================================================================
     * */
    public static function backupWhatnew($wn_id,$cmd=false){
        // table
        $table = static::$whatnew_table;

        // file to write command to 
        $file = base_path("DB/whatnew_list.sqlite");

        // get whatnew 
        $wn = Whatnew::find($wn_id);

        // command to write to file 
        $command = "";

        switch($cmd):
            case"insert":
                $command .= "\n
/* ============================================================================
 * backup INSERT Whatnew on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
INSERT INTO `{$table}`(`user_id`,`token`,`whatnew_title`,`whatnew_body`,
`is_public`,`created_at`,`updated_at`) VALUES(
    '{$wn->user_id}',
    '{$wn->token}',
    '{$wn->whatnew_title}',
    '{$wn->whatnew_body}',
    '{$wn->is_public}',
    '{$wn->created_at}',
    '{$wn->updated_at}');
";
                break;
                case"edit":

                    $command .= "\n
/* ============================================================================
 * backup UPDATE Whatnew on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */ 
UPDATE `{$table}` SET whatnew_title='{$wm->whatnew_title}',
whatnew_body='{$wn->whatnew_body}',
is_public='{$wn->is_public}' WHERE id='{$wn->id}';
";
                    break;
            default:

                    $command .= "\n
/* ============================================================================
 * backup DELETE Whatnew on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
DELETE FROM `{$table}` WHERE id='{$wn->id}';
"; 

            break;
            endswitch;


        write2text($file,$command);
    }

    /* ========================================================================
     * backupWhatnew date 30 Jul 2021
     * END
     * ========================================================================
     * */

}
