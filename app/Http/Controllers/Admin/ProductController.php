<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

use Auth;
use DB;

class ProductController extends Controller
{

    protected $category_link_table = "category_product";
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $category = Category::where("cat_type","product")
                                    ->get();
        $product = Product::with("user")
                            ->get();
        return view("Admin.Product.index")->with([
            "category" => $category,
            "product" => $product
        ]);
    }


    /**
     * getProduct function
     *
     * @return product
     */
    public function getProduct()
    {
        $product = Product::with("user")
                            ->with("category")
                            ->paginate(30);

        return response()->json([
            "product" => $product
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
            "product_title" => ["required"],
            "product_price" => ["required"],
            "product_des" => ["required"],
        ]);


        $image_new_name = "";
        $image_location = "";

        if(request()->hasFile('product_pic')):
            $image_new_name = Auth::user()->email."_".date('Y-m-d')."_".request()->file("product_pic")->getClientOriginalName();

            $image_location = "/upload_from_user/".$image_new_name;
            request()->file('product_pic')
                     ->move(public_path('upload_from_user'),$image_new_name);
        else:
            if(request()->product_pic_url != null):
                $image_location = request()->product_pic_url;
            else:
                $image_location = "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg";
            endif;
        endif;

        // prepare data to insert 
        $valid["user_id"] = Auth::user()->id;
        $valid["product_pic_absolute_path"] = $image_location;
        $valid["is_sale"] = !request()->is_sale?0:1;

        // create new product 
        Product::create($valid);

        // get the last row 
        $pd = Product::latest()->first();

        // product category link
        $cat_id = request()->cat_id;

        // link to product category 
        DB::table($this->category_link_table)
            ->insert([
                "product_id" => $pd->id,
                "category_id" => $cat_id,
                "created_at" => now(),
                "updated_at" => now()
            ]);

        // backup product 
        Product::backupProduct($pd->id,"insert");
        // backup category link
        Product::backupCategoryLink($pd->id,"edit");

        $msg = "<span class=\"alert alert-success\">
            Success : product has been created!</span>";
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
        $pd = Product::where('id',$product->id)
                        ->first();
        return response()->json([
            "product" => $product
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
        $pd = Product::with('category')
                        ->where('id',$product->id)
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
        $pd = Product::find($id);
        $old_pic = $pd->product_pic_absolute_path;

        $valid = request()->validate([
            "product_title" => ["required"],
            "product_price" => ["required"],
            "product_des" => ["required"],
        ]);


        $image_new_name = "";
        $image_location = "";

        if(request()->hasFile('product_pic')):
            
            // if the user upload new file we have to delete old file
            if(file_exists(public_path($old_pic))):
                unlink(public_path($old_pic));
            endif;


            $image_new_name = Auth::user()->email."_".date('Y-m-d')."_".request()->file("product_pic")->getClientOriginalName();

            $image_location = "/upload_from_user/".$image_new_name;
            request()->file('product_pic')
                     ->move(public_path('upload_from_user'),$image_new_name);
        else:
            if(request()->product_pic_url != null):
                $image_location = request()->product_pic_url;
            else:
                $image_location = "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg";
            endif;
        endif;

        // prepare data to insert 
        $valid["product_pic_absolute_path"] = $image_location;
        $valid["is_sale"] = !request()->is_sale?0:1;
        $valid["updated_at"] = now();

        // update  product 
        Product::where('id',$id)
                    ->update($valid);



        // backup product 
        Product::backupProduct($id,"edit");

        // backup category link
        Product::backupCategoryLink($id,"edit");

        $msg = "<span class=\"alert alert-success\">
            Success : product has been updated!</span>";
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
        
        // the image file 
        $image = $del->product_pic_absolute_path;
        
        // delete upload pic 
        if(file_exists(public_path($image))):
            unlink(public_path($image));
        endif;
        // backup product ,category 
        Product::backupProduct($del->id);
        Product::backupCategoryLink($del->id);

        // delete product item
        $del->delete();

        $msg = "<span class=\"alert alert-success\">
            Success : product has been deleted!</span>";
        return response()->json([
            "msg" => $msg
        ]);

    }
}
