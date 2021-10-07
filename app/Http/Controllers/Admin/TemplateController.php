<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\Request;

use Auth;
//use DB;

class TemplateController extends Controller
{
    protected $tm_table = "templates";
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("Admin.Template.index");
    }

    public function getTemplate(){
        $templates = Template::with("user")
                        ->orderBy("created_at","desc")
                        ->paginate(15);

        return response()->json([
            "templates" => $templates
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
        // validate the input form
        $validate = request()->validate([
            "tm_title" => ["required"],
            "tm_method" => ["required","min:4","max:10"],
        ]); 

        // public status
        $is_pub = !request()->tm_public?0:1;

        // approve status
        $approve = !request()->tm_approved_at?0:1;

        /* ================preparing data ============= */
        if(isset($approve) && $approve != 0):
            $validate["tm_approved_at"] = date("Y-m-d H:i:s");
        endif;

        $validate["tm_public"] = $is_pub;
        $validate["user_id"] = Auth::user()->id;
        $validate["tm_method"] = xx_clean(request()->tm_method);
        $validate["tm_title"] = xx_clean(request()->tm_title);
        $validate["tm_excerpt"] = xx_clean(request()->tm_excerpt);
        $validate["tm_body"] = xx_clean(request()->tm_body);

        /* ================preparing data ============= */

        // created new Template 
        Template::create($validate);

        // get the last record 
        $tm = Template::latest()->first();

        // make backup to file 
        // last edit on 20 Aug 2021
        Template::backupTemplate($tm->id,"insert");
        //$this->backupInsertTemplate($tm->id);

        /* return response request ==================== */
        $msg = "<span class=\"alert alert-success\">
            Success : template has been created! </span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function show(Template $template)
    {
        $get = Template::find($template->id);
        return response()->json([
            "template" => $get
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function edit(Template $template)
    {
        $get = Template::find($template->id);
        return response()->json([
            "template" => $get
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        // validate the input form
        $validate = request()->validate([
            "tm_title" => ["required"],
            "tm_method" => ["required","min:4","max:10"],
        ]); 

        // public status
        $is_pub = !request()->tm_public?0:1;

        // approve status
        $approve = !request()->tm_approved_at?0:1;

        /* ================preparing data ============= */
        if(isset($approve) && $approve != 0):
            $validate["tm_approved_at"] = date("Y-m-d H:i:s");
        endif;

        $validate["tm_public"] = $is_pub;
        $validate["tm_method"] = xx_clean(request()->tm_method);
        $validate["tm_title"] = xx_clean(request()->tm_title);
        $validate["tm_excerpt"] = xx_clean(request()->tm_excerpt);
        $validate["tm_body"] = xx_clean(request()->tm_body);

        /* ================preparing data ============= */
        Template::where("id",$id)
                    ->update($validate);

        // make backup to file 
        //$this->backupUpdateTemplate($id);
        Template::backupTemplate($id,"edit");

        $msg = "<span class=\"alert alert-success\">Success : 
            Template has been updated</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // make backup to file 
        //$this->backupDelTemplate($id);
        Template::backupTemplate($id);


        $del = Template::find($id);
        $del->delete();

        // response message
        $msg = "<span class=\"alert alert-warning\">Success : 
            Template has been DELETED!</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /* ============= backup INSERT template 20 Jul 2021 ==================== */
    public function backupInsertTemplate($id){
        $tm = Template::find($id);
        $file = base_path("DB/template_list.sqlite");
        $cont = "\n
/* ============= auto backup insert ".date("Y-m-d H:i:s")." ================= */
INSERT INTO `{$this->tm_table}`(`user_id`,`tm_method`,`tm_title`,`tm_excerpt`,
`tm_body`,`tm_public`,`tm_approved_at`,`created_at`,`updated_at`) VALUES(
    '{$tm->user_id}',
    '{$tm->tm_method}',
    '{$tm->tm_title}',
    '{$tm->tm_excerpt}',
    '{$tm->tm_body}',
    '{$tm->tm_public}',
    '{$tm->tm_approved_at}',
    '{$tm->created_at}',
    '{$tm->updated_at}');
\n
";
        write2text($file,$cont);
    }

    /* ============= backup INSERT template 20 Jul 2021 ==================== */
    /* ============= backup UPDATE template 20 Jul 2021 ==================== */
    public function backupUpdateTemplate($id){
        $tm = Template::find($id);
        $file = base_path("DB/template_list.sqlite");
        $cont = "\n
/* ============= auto backup UPDATE ".date("Y-m-d H:i:s")." ================= */
UPDATE `{$this->tm_table}` SET tm_title='{$tm->tm_title}',
tm_method='{$tm->tm_method}',
tm_excerpt='{$tm->tm_excerpt}',
tm_body='{$tm->tm_body}',
tm_approved_at='{$tm->tm_approved_at}',
tm_public='{$tm->tm_public}',
updated_at='{$tm->updated_at}'
WHERE id='{$tm->id}';
\n
";
        write2text($file,$cont);
    }

    /* ============= backup UPDATE template 20 Jul 2021 ==================== */

    /* ============= backup DELETE template 20 Jul 2021 ==================== */
    public function backupDelTemplate($id){
        $tm = Template::find($id);
        $file = base_path("DB/template_list.sqlite");
        $cont = "
\n
/* =========== DELETE from `{$this->tm_table}` ".date("Y-m-d H:i:s")." ===== */
DELETE FROM `{$this->tm_table}` WHERE id='{$tm->id}';
";
        write2text($file,$cont);
    }


    /* ============= backup DELETE template 20 Jul 2021 ==================== */

}
