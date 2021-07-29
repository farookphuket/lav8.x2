<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id","name","email","title",
        "body","date_num","ip","token",
        "reply_by"
    ];

    protected static $faq_table = "contacts";

    protected static $user_table = "users";


    public function user(){
        return $this->belongsTo(User::class);
    }

    /* ========================================================================
     * backup contact create 29 Jul 2021
     *
     * START
     * ========================================================================
     * */
    public static function backupContact($contact_id,$cmd=false){

        // the faq table
        $table = static::$faq_table; 

        // get the faq
        $ct = Contact::find($contact_id);

        // file to write command 
        $file = base_path("DB/faq_list.sqlite");

        // command to write
        $command = "";

        switch($cmd):
        case"insert":
            $command .= "
/* ============================================================================
 * INSERT command for backup faq id '{$ct->id}' on ".date("Y-m-d H:i:s")." 
 * ============================================================================
 * */
INSERT INTO `{$table}`(`user_id`,`name`,`email`,`title`,`ip`,`token`,`date_num`,
`body`,`created_at`,`updated_at`) VALUES(
    '{$ct->user_id}',
    '{$ct->name}',
    '{$ct->name}',
    '{$ct->name}',
    '{$ct->name}',
    '{$ct->name}',
    '{$ct->name}',
);
";
        break;
        default:
            $command .= "\n
/* ============================================================================
 * DELETE faq id '{$ct->id}' just so you to know that the delete command will
 * not be execute due to the relationship error occoure
 * ============================================================================
 * */
/* DELETE FROM `{$table} WHERE id='{$contact_id}';`*/
";
        break;
        endswitch;

        write2text($file,$command);
    }

    /* ========================================================================
     * backup contact create 29 Jul 2021
     *
     * END
     * ========================================================================
     * */
}
