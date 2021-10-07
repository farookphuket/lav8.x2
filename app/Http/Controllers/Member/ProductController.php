<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

use Auth;
use DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    protected $category_table = "category_product";
    public function index()
    {
        $product = Product::with("user")
                            ->orderBy("created_at","desc")
                            ->paginate(2);

        $category = Category::where("cat_type","product")
                            ->get();

        return view("Member.Product.index")
            ->with([
                "category" => $category
            ]);
    }


    /* ============ getProduct
     *
     * */
    public function getProduct(){
        $product = Product::with("category")
                        ->with("user")
                        ->where("is_sale","!=",0)
                        ->orWhere("user_id",Auth::user()->id)
                        ->orderBy("created_at","desc")
                        ->paginate(15);

        $meta_title = "Products";

        return response()->json([
            "product" => $product,
            "meta_title" => $meta_title
        ]);
    }


    /**
     * will get the category specifig to product 
     *
     * @return all category of product
     */
    public function categoryProduct()
    {
        $category = Category::with("product")
                            ->get();

        return response()->json([
            "category" => $category
        ]);
    }
    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        $valid = request()->validate([
            "product_title" => ["required","min:8","max:80"],
            "product_des" => ["required"],
            "product_price" => ["required"],
            
        ]);

        
        $cat_id = request()->product_category;
        $is_sale = !request()->is_sale?0:1;


        /* ===== upload image
         *
         * */
        $pub_path = public_path("upload_from_user"); 
        $new_name = Auth::user()->email."_".date("Y-m-d")."_".request()->file("product_pic")->getClientOriginalName();

        $image_location = "";
        // check if the file has file input file has name "product_pic"
        if(request()->hasFile('product_pic')):
           request()->file('product_pic')->move($pub_path,$new_name); 

            $image_location = "/upload_from_user/".$new_name;

        else:
            if(request()->product_pic_url != ''):
                $image_location = request()->product_pic_url;
            endif;
            $image_location = "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg";
        endif; 

        
        // preparing data to save
        $valid["user_id"] = Auth::user()->id;
        $valid["product_pic_absolute_path"] = $image_location;
        $valid["is_sale"] = $is_sale;
        

        // create product
        Product::create($valid);

        // get the last insert product for backup
        $pd = Product::latest()->first();

        // link to category
        DB::table($this->category_table)
            ->insert([
                "product_id" => $pd->id,
                "category_id" => $cat_id,
                "created_at" => now(),
                "updated_at" => now()
            ]);

        // make a backup category link to file 
        Category::backupProductCategoryLink($pd->id,"edit");

        // make backup product
        Product::backupProduct($pd->id,"insert");


        $msg = "<span class=\"alert alert-success\">
           Success : item has been created. 
            </span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        $pd = Product::with("user")
                            ->with("category")
                            ->where("id",$product->id)
                            ->first();

        $my_cart = Cart::with('user')
                        ->with('product')
                        ->where('checkout_at',null)
                        ->where('user_id',Auth::user()->id)
                        ->get();
        $meta_title = $pd->product_title;

        return view("Member.Product.show")->with([
            "product" => $pd,
            "my_cart" => $my_cart,
            "meta_title" => $meta_title
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        $pd = Product::with("user")
                        ->with("category")
                        ->where("id",$product->id)
                        ->first();
        return response()->json([
            "product" => $pd
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {


        $valid = request()->validate([
            "product_title" => ["required"],
            "product_price" => ["required"],
            "product_des" => ["required"]
        ]);

        //dd(request()->product_pic_url);
        $pd = Product::find($id);
        // old pic data 
        $old_pic = $pd->product_pic_absolute_path;

        $is_sale = !request()->is_sale?0:1;

        //dd($is_sale);
        $pub_path = "";
        $new_name = "";

        // check if the file has file input file has name "product_pic"
        if(request()->hasFile('product_pic')):

            // delete the old image
            if(file_exists(public_path($old_pic))):
                unlink(public_path($old_pic));
            endif;
            /* ===== upload image
             *
             * */
            $image_location = "";
            $pub_path = public_path("upload_from_user"); 
            $new_name = Auth::user()->email."_".date("Y-m-d")."_".request()->file("product_pic")->getClientOriginalName();

            request()->file('product_pic')->move($pub_path,$new_name); 

            $image_location = "/upload_from_user/".$new_name;

        else:
            if(request()->product_pic_url != null):
                $image_location = request()->product_pic_url; 
            else:
                $image_location = $old_pic;
            endif;

        endif; 

        // preparing data to save
        $valid["product_pic_absolute_path"] = $image_location;
        $valid["is_sale"] = $is_sale;
        $valid["updated_at"] = now();

        // update product 
        Product::where("id",$id)
                ->update($valid);

        $msg = "<span class=\"alert alert-success\">
Success : item has been updated</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $del = Product::find($product->id);

        // delete the upload file 
        if(file_exists(public_path($del->product_pic_absolute_path))):
            unlink(public_path($del->product_pic_absolute_path));
        endif;

        $del->delete();

        $msg = "<span class=\"alert alert-success\">
Success : item has been deleted</span>";
        return response()->json([
            "msg" => $msg
        ]);

    }
}
