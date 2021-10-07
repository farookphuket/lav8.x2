<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;
class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id","product_title","product_pic_absolute_path",
        "product_price","is_sale","product_des"
    ];

    protected static $product_table = "products";

    protected static $category_link_table = "category_product";

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function category(){
        return $this->belongsToMany(Category::class);
    }

    public function cart(){
        return $this->belongsToMany(Cart::class);
    }


    /* ========================================================================
     * backupProduct this method will write the specified item's command to file
     * 29 Aug 2021
     * START
     * */
    public static function backupProduct($id,$cmd=false){
        // table 
        $table = static::$product_table;

        // item 
        $pd = Product::find($id);

        // file
        $file = base_path("DB/product_list.sqlite");

        // command 
        $command = "";

        // switch 
        switch($cmd):
            case"insert":
                $command .= "\n
/* ============================================================================
 * Insert item id '{$id}' on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
INSERT INTO `{$table}`(`user_id`,`product_title`,`product_price`,
`product_pic_absolute_path`,`product_des`,`is_sale`,`created_at`,`updated_at`) 
VALUES(
    '{$pd->user_id}',
    '{$pd->product_title}',
    '{$pd->product_price}',
    '{$pd->product_pic_absolute_path}',
    '{$pd->product_des}',
    '{$pd->is_sale}',
    '{$pd->created_at}',
    '{$pd->updated_at}');
";
            break;
            case"edit":
                $command .= "\n
/* ============================================================================
 * Update item '{$id}' on ".date("Y-m-d H:i:s")."
 * 
 * ============================================================================
 * */
    UPDATE `{$table}` SET product_title='{$pd->product_title}',
    product_price='{$pd->product_price}',
    product_pic_absolute_path='{$pd->product_pic_absolute_path}',
    product_des='{$pd->product_des}',
    is_sale='{$pd->is_sale}',
    updated_at='{$pd->updated_at}' WHERE id='{$id}';
";
            break;
            default:
            $command .= "\n
/* ============================================================================
 * Delete the product item '{$id}'
 * on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */

    /* DELETE FROM `{$table}` WHERE id='{$id}'; */

/* ============================================================================
 * DELETE command will not be execute yet just to prevent script from Error on 
 * Refresh Database
 * */
";
            break;
        endswitch;

        write2text($file,$command);
    } 


    /* ========================================================================
     * backupProduct this method will write the specified item's command to file
     * 29 Aug 2021
     * END
     * */

    /* ======================================================================== 
     * backup category link
     * 5 Oct 2021
     * START 
     * ========================================================================
     * */

    public static function backupCategoryLink($product_id,$cmd=false)
    {
        // table
        $table = static::$category_link_table;

        // data 
        $lnk = DB::table($table)->where('product_id',$product_id)
                    ->get();
        // file 
        $file = base_path("DB/product_category.sqlite");

        // command
        $command = "";


        if(count($lnk) != 0):
            $command .= "
/* ============================================================================
 * need a delete command just to prevent from repeatitive add for 
 * product id '{$product_id}'
 * ============================================================================
 * */
DELETE FROM `{$table}` WHERE product_id='{$product_id}';
";
        endif;
        // switch 
        switch($cmd):
            case"edit":
                foreach($lnk as $ln):
                    $command .= "
/* ============================================================================
 * link to category table for product id '{$product_id}' with category id 
 * '{$ln->category_id}' on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
INSERT INTO `{$table}`(`product_id`,`category_id`,`created_at`,`updated_at`) 
VALUES(
'{$ln->product_id}',
'{$ln->category_id}',
'{$ln->created_at}',
'{$ln->updated_at}');
";
                endforeach;
            break;
            default:
        $command = "
/* ============================================================================
 * DELETE command on ".date("Y-m-d H:i:s")." for product id '{$product_id}'
 * ============================================================================
 * */
/* DELETE FROM `{$table}` WHERE product_id='{$product_id}'; */
/* ========================================================================= */
";
            break;
        endswitch;

        // write to file
        write2text($file,$command);
    }
    
    /* ======================================================================== 
     * backup category link
     * 5 Oct 2021
     * END 
     * ========================================================================
     * */


}
