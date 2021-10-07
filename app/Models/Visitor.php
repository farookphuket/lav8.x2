<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;

class Visitor extends Model
{
    use HasFactory;
    protected $fillable = [
        "ip","os","browser",
        "day_num","month_num","year_num",
        "date_visit"
    ];


    // table visitor 
    protected static $visitor_table = "visitors";

    /* ========================================================================
     * backupVisitor method 
     * create on 16 Aug 2021
     * START
     * ========================================================================
     */
    public static function backupVisitor($id,$cmd=false){
        // table 
        $table = static::$visitor_table;

        // file 
        $file = base_path("DB/visitors_list.sqlite");
    }


    /* ========================================================================
     * backupVisitor method 
     * create on 16 Aug 2021
     * END
     * ========================================================================
     */

}
