<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;

class Timeline extends Model
{
    use HasFactory;
    protected $fillable = ["user_id","date_ref","report"];


    protected static $timeline_table = "timelines";

    public function user(){
        return $this->belongsTo(User::class);
    }


    /* ========================================================================
     * backup user timeline date 20 Aug 2021
     *
     * START
     * ========================================================================
     * */

    /**
     * undocumented function
     *
     * @return void
     */
    public static function backupTimeline($tn_id,$cmd=false)
    {
        // table 
        $table = static::$timeline_table;

        // file to write 
        $file = base_path("DB/timeline_list.sqlite");

        // get the specific timeline from the id
        $tn = Timeline::find($tn_id);

        // command to write
        $command = "";

        switch ($cmd) {
            case 'insert':
                $command .= "\n
/* ============================================================================
 * backup insert timeline id '{$tn_id}' on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
INSERT INTO `{$table}`(`user_id`,`date_ref`,`report`,`created_at`,
`updated_at`) VALUES(
    '{$tn->user_id}',
    '{$tn->date_ref}',
    '{$tn->report}',
    '{$tn->created_at}',
    '{$tn->updated_at}');
";                
                break;
            
            case 'edit':
                
                $command .= "\n
/* ============================================================================
 * backup update timeline id '{$tn_id}' on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */ 
UPDATE `{$table}` SET date_ref='{$tn->date_ref}',
report='{$tn->report}',
updated_at='{$tn->updated_at}' WHERE id='{$tn_id}';
";
                break;
            default:
                $command .= "\n
/* ============================================================================
 * backup delete timeline id '{$tn_id}' on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
/* DELETE FROM `{$table}` WHERE id='{$tn_id}'; */
"; 
                break;
        }
        // write command to file
        write2text($file,$command);
    }
    
    /* ========================================================================
     * backup user timeline date 20 Aug 2021
     *
     * END
     * ========================================================================
     * */
}
