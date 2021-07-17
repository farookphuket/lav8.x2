<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Auth;

class CategoryController extends Controller
{
    protected $cat_table = "categories";
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("Admin.Category.index");
    }


    public function getCategory(){
        $category = Category::orderBy("created_at","desc")
                    ->paginate(2)
                    ->onEachSide(1);
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
        $validate = request()->validate([
            "cat_title" => ["required"],
            "cat_type" => ["required"],
            "cat_section" => ["required"],
        ]);

        $validate["user_id"] = Auth::user()->id;
        //==== create category
        Category::create($validate);

        //====== make a copy 
        $this->backupInsertCategory();
        $msg = "<span class=\"alert alert-success\">
Success: category has been created</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        $cat = Category::find($category->id);
        return response()->json([
            "category" => $cat
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        $validate = request()->validate([
            "cat_title" => ["required"],
            "cat_type" => ["required"],
            "cat_section" => ["required"],
        ]);
        
        $validate["updated_at"] = now();

        Category::where("id",$id)
                ->update($validate);


        $msg = "<span class=\"alert alert-success\">
            Success : data has been updated</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        //
    }
    /* ============== make backup category 30 June 2021 =====================*/
    public function backupInsertCategory(){
        $cat = Category::latest()->first();
        $file = base_path("DB/category_list.sqlite");
        $cont = "/* ============== backup `{$this->cat_table}` ";
        $cont .= date("Y-m-d H:i:s")." ================== */";
        $cont .= "
INSERT INTO `{$this->cat_table}`(`user_id`,`cat_title`,`cat_type`,
`cat_section`,
`created_at`,`updated_at`) VALUES(
    '{$cat->user_id}',
    '{$cat->cat_title}',
    '{$cat->cat_type}',
    '{$cat->cat_section}',
    '{$cat->created_at}','{$cat->updated_at}');
";
        write2text($file,$cont);
    }
    /* ============== make backup category 30 June 2021 =====================*/
}
