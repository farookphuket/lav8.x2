<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;


class Category extends Model
{
    use HasFactory;

    protected static $category_table = "categories";

    protected static $blog_category_link_table = "blog_category";

    protected static $product_category_table = "category_product";


    protected $fillable = [
        "user_id","cat_title",
        "cat_type","cat_section"
    ];



    public function users(){
        return $this->belongsTo(User::class);
    }

    public function blogs(){
        return $this->belongsToMany(Blog::class);
    }


    /**
     * link product function
     *
     * 
     */
    public function product()
    {
        return $this->belongsToMany(Product::class);
    }
    

    /* ========================================================================
     * backupCategory method will write the backup script to file
     * the method create on 28 Jul 2021
     * START
     * ========================================================================
     * */

    public static function backupCategory($category_id,$cmd=false)
    {
        // file to write the command to
        $file = base_path("DB/category_list.sqlite");

        // table category
        $table = static::$category_table;

        // get the category to backup 
        $category = Category::find($category_id);

        // command to write to file 
        $command = "";

        // switch statement to specified command 
        switch($cmd):

        case"insert":

                $command .= "\n
/* ============================================================================
 * backup INSERT category command to table `{$table}` 
 * on ".date("Y-m-d H:i:s")." 
 *
 * ============================================================================
 * */
INSERT INTO `{$table}`(`user_id`,`cat_title`,`cat_type`,`cat_section`,
`created_at`,`updated_at`) VALUES(
    '{$category->user_id}',
    '{$category->cat_title}',
    '{$category->cat_type}',
    '{$category->cat_section}',
    '{$category->created_at}',
    '{$category->updated_at}');
";
            break;
            case"edit":

                $command .= "\n
/* ============================================================================
 * backup UPDATE category command in table `{$table}` 
 * on ".date("Y-m-d H:i:s")." 
 *
 * ============================================================================
 * */
UPDATE `{$table}` SET cat_title='{$category->cat_title}',
cat_type='{$category->cat_type}',
cat_section='{$category->cat_section}',
updated_at='{$category->updated_at}'
WHERE id='{$category_id}';
";
            break;
            default:
                $command .= "\n
/* ============================================================================
 * backup DELETE category id from `{$table}` on ".date("Y-m-d H:i:s")." 
 *
 * ============================================================================
 * */
/* DELETE FROM `{$table}` WHERE id='{$category_id}'; */
";
            break;
        endswitch;


        write2text($file,$command);
    }
    


    /* ========================================================================
     * backupCategory method will write the backup script to file
     * the method create on 28 Jul 2021
     * END
     * ========================================================================
     * */

    /* ========================================================================
     * backupBlogCategoryLink method will write the backup script to file
     * the method create on 28 Jul 2021
     * START
     * ========================================================================
     * */

    public static function backupBlogCategoryLink($blog_id,$cmd=false)
    {
        // file to write backup command
        $file = base_path("DB/blog_category.sqlite");

        // table to backup 
        $table = static::$blog_category_link_table;

        // get the category 
        $category = DB::table($table)
                        ->where("blog_id",$blog_id)
                        ->get();

        // the command to write to file
        $command = "";


        // use switch statement to specified command
        switch($cmd):
            case"edit":
                if(count($category) != 0):
                    $command .= "\n
/* ============================================================================
 * backup DELETE row command to prevent from redundant row of the blog_id
 * ============================================================================
 * */
/* DELETE FROM `{$table}` WHERE blog_id='{$blog_id}'; */ \n
";
                endif;
                foreach($category as $ca):
                    $command .= "\n
/* ============================================================================
 * backup INSERT link blog id {$blog_id} to category id {$ca->category_id} 
 * on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
INSERT INTO `{$table}`(`blog_id`,`category_id`,`created_at`,`updated_at`) 
VALUES(
    '{$ca->blog_id}',
    '{$ca->category_id}',
    '{$ca->created_at}',
    '{$ca->updated_at}');\n
";
                endforeach;

            break;
            default:
            $command .= "\n 
/* ============================================================================
 * backup DELETE category link as the blog id '{$blog_id}' has been removed
 * on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
/* DELETE FROM `{$table}` WHERE blog_id='{$blog_id}'; */
"; 
            break;
        endswitch;

        write2text($file,$command);
    }
    

    /* ========================================================================
     * backupBlogCategoryLink method will write the backup script to file
     * the method create on 28 Jul 2021
     * End
     * ========================================================================
     * */

    /* ========================================================================
     * backup product category link 
     * Date 28 Aug 2021
     * START
     * ========================================================================
     * */
    public static function backupProductCategoryLink($id,$cmd=false){
        // table 
        $table = static::$product_category_table;

        // file 
        $file = base_path("DB/product_category.sqlite");

        // get item for backup 
        $pd = DB::table($table)
                ->where("product_id",$id)
                ->get();


        // command 
        $command = "";

        if(count($pd) != 0):
            $command .= "\n
/* ============================================================================
 * remove the redundant product item id '{$id}' on 
 * ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
DELETE FROM `{$table}` WHERE product_id='{$id}';
/* ============================================================================
 * End of delete item
 * ============================================================================
 * */
\n
";
        endif;


        // switch case
        switch($cmd):
        case"edit":
            foreach($pd as $item):
                $command .= "\n
/* ============================================================================
 *
 * ============================================================================
 * */
INSERT INTO `{$table}`(`product_id`,`category_id`,`created_at`,`updated_at`)
VALUES(
    '{$item->product_id}',
    '{$item->category_id}',
    '{$item->created_at}',
    '{$item->updated_at}');
/* ============================================================================
 * End of insert category link
 * ============================================================================
 * */
";
            endforeach;
        break;
        default:
            $command .= "\n
/* ============================================================================
 * Delete item command on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
/* DELETE FROM `{$table}` WHERE product_id='{$id}'; */
/* ============================================================================
 * End of delete item.
 * ============================================================================
 * */
";
        break;
        endswitch;

        write2text($file,$command);
         
    }

    /* ========================================================================
     * backup product category link 
     * Date 28 Aug 2021
     * END
     * ========================================================================
     * */


}
