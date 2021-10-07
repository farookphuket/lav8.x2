<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;


    protected $fillable = [
        "user_id","pay_title","pay_url",
        "pay_des","pay_pic_absolute_path","pay_method"
    ];


    protected static $payment_table = "payments";
    /**
     * undocumented function
     *
     * @return void
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }


    /*
     * backup Payment 4 Oct 2021 START
     * */
    public static function backupPaymentMethod($payment_id,$cmd=false){
        // command 
        $command = "";

        // file 
        $file = base_path("DB/PaymentMethods.sqlite");

        // table 
        $table = static::$payment_table;

        // data 
        $pa = Payment::find($payment_id);

        // switch case
        switch($cmd):
            case"insert":
                $command = "
/* ===================== Insert '{$table}' ======================== */
INSERT INTO `{$table}`(`user_id`,`pay_title`,`pay_method`,`pay_des`,
`pay_url`,`pay_pic_absolute_path`,`created_at`,`updated_at`) 
VALUES(
'{$pa->user_id}',
'{$pa->pay_title}',
'{$pa->pay_method}',
'{$pa->pay_des}',
'{$pa->pay_url}',
'{$pa->pay_pic_absolute_path}',
'{$pa->created_at}',
'{$pa->updated_at}');
";
            break;
            case"edit":
                $command = "
/* ===========================================================================
 * Update id '{$payment_id}' on  ".date("Y-m-d H:i:s")." 
 * =========================================================================== 
 * */
UPDATE `{$table}` SET pay_title='{$pa->pay_title}',
pay_method='{$pa->pay_method}',
pay_url='{$pa->pay_url}',
pay_des='{$pa->pay_des}',
pay_pic_absolute_path='{$pa->pay_pic_absolute_path}',
updated_at='{$pa->updated_at}' WHERE id='{$payment_id}';
";
            break;
            default:
            $command = "
/* =========================================================================== 
 * DELETE '{$payment_id}' on ".date("Y-m-d H:i:s")."
 * the DELETE command will not execute yet due to error on migrate fresh 
 * command.
 * */
/* DELETE FROM `{$table}` WHERE id='{$payment_id}'; */
/* ========================================================================= */
";
            break;
        endswitch;

        write2text($file,$command);
    }

    /*
     * backup Payment 4 Oct 2021 END
     * */
    
}
