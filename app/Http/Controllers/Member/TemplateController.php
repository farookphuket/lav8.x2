<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\Request;

use Auth;


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
        return view("Member.Template.index");
    }


    /*
     * ============= getTemplate 21 Jul 2021 ======================
     *
     */
    public function getTemplate(){
        $tmp = Template::with("user")
                        ->where("user_id",Auth::user()->id)
                        ->orWhere("tm_approved_at","!=",NULL)
                        ->orderBy("created_at","desc")
                        ->paginate(15);
        return response()->json([
            "templates" => $tmp
        ]);
    }


    /*
     * ============= getTemplate 21 Jul 2021 ======================
     *
     */

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
    public function store(Request $request)
    {
        $valid = request()->validate([
            "tm_title" => ["required","min:4","max:80"],
            "tm_excerpt" => ["required"]
        ]);

        // public his own template
        $pub = !request()->tm_public?0:1;

        
        $method = request()->tm_method;
        
        /* ========== preparing data to insert ==================*/ 
        $valid["user_id"] = Auth::user()->id;
        $valid["tm_title"] = xx_clean(request()->tm_title);
        $valid["tm_excerpt"] = xx_clean(request()->tm_excerpt);
        $valid["tm_body"] = xx_clean(request()->tm_body);
        $valid["tm_public"] = $pub;
        $valid["tm_method"] = xx_clean($method);
        /* ========== preparing data to insert ==================*/ 

        // create template
        Template::create($valid);

        // get the last insert field 
        $tm = Template::latest()->first();

        /* ========= make backup to file =======================*/
        $this->backupInsertTemplate($tm->id);
        /* ========= make backup to file =======================*/

        $msg = "<span class=\"alert alert-success\">Success : Template has 
            been created</span>";
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
        return response()->json([
            "template" => $template
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $tmp = Template::find($id);
        return response()->json([
            "template" => $tmp
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
        //

        $valid = request()->validate([
            "tm_title" => ["required","min:4","max:80"],
            "tm_excerpt" => ["required"]
        ]);

        // public his own template
        $pub = !request()->tm_public?0:1;

        
        $method = request()->tm_method;
        
        /* ========== preparing data to insert ==================*/ 
        $valid["tm_title"] = xx_clean(request()->tm_title);
        $valid["tm_excerpt"] = xx_clean(request()->tm_excerpt);
        $valid["tm_body"] = xx_clean(request()->tm_body);
        $valid["tm_public"] = $pub;
        $valid["tm_method"] = xx_clean($method);
        $valid["updated_at"] = now();
        /* ========== preparing data to insert ==================*/ 

        // update field 
        Template::where("id",$id)->update($valid);

        /* ========== make backup to file =======================*/
        $this->backupUpdateTemplate($id);
        /* ========== make backup to file =======================*/


        $msg = "<span class=\"alert alert-success\">Success : Template has 
            been updated</span>";
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
    public function destroy(Template $template)
    {
        // make a backup to file 
        $this->backupDelTemplate($template->id);


        $del = Template::find($template->id);
        $del->delete();

        $msg = "<span class=\"alert alert-warning\" 
            style=\"color:red;font-weight:bold;\">Success : Template has 
            been deleted!</span>";
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
