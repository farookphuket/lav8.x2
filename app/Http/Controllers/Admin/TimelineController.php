<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Timeline;
use App\Models\User;
use Illuminate\Http\Request;
use Auth;
use DB;

class TimelineController extends Controller
{
    protected $timeline_table = "timelines";
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("Admin.Timeline.index");
    }


    public function getTimeline(){
        $timeline = Timeline::with("user")
                    ->orderBy("created_at","desc")
                    ->paginate(15)
                    ->OnEachSide(1);
        return response()->json([
            "timeline" => $timeline
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
    public function store(Request $request)
    {
        $validate = request()->validate([
            "report" => ["required"],
            "date_ref" => ["required"]
        ]);
        $validate["date_ref"] = date("Y-m-d",strtotime(request()->date_ref));
        $validate["user_id"] = Auth::user()->id;

        // clean the input report 
        $validate["report"] = xx_clean(request()->report);

        // create new timeline
        Timeline::create($validate);

        // get the last created 
        $tn = Timeline::latest()->first();

        // write backup data to file
        $this->backupInsertTimeline($tn->id);

        $msg = "<span class=\"alert alert-success\">
            Success : data has been save</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Timeline  $timeline
     * @return \Illuminate\Http\Response
     */
    public function show($user_id)
    {
        $show_list = $this->showUserTimeline($user_id);
        return response()->json([
            "timeline" => $show_list
        ]);
    }

    public function showUserTimeline($id){
        $get = Timeline::where("user_id",$id)
                        ->with("user")
                        ->orderBy("date_ref","asc")
                        ->paginate(2)
                        ->OnEachSide(1);
        return $get;
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Timeline  $timeline
     * @return \Illuminate\Http\Response
     */
    public function edit(Timeline $timeline)
    {
        $tl = Timeline::with("user")
                    ->where("id",$timeline->id)
                    ->first();
        return response()->json([
            "timeline" => $tl
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Timeline  $timeline
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        $validate = request()->validate([
            "report" => ["required"],
            "date_ref" => ["required"]
        ]);
        $validate["date_ref"] = date("Y-m-d",strtotime(request()->date_ref));
        $validate["updated_at"] = now();

        // clean the input report 
        $validate["report"] = xx_clean(request()->report);

        // update timeline
        Timeline::where("id",$id)
            ->update($validate);

        // write backup data to file
        $this->backupUpdateTimeline($id);

        $msg = "<span class=\"alert alert-success\">
            Success : data has been updated</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Timeline  $timeline
     * @return \Illuminate\Http\Response
     */
    public function destroy(Timeline $timeline)
    {

        // write backup to file
        $this->backupDelTimeline($timeline->id);

        $del = Timeline::where("id",$timeline->id)
                        ->first();
        $del->delete();



        $msg = "<span class=\"alert alert-success\">
            Success : data has been deleted!</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }


    /* ============ backupInsertTimeline 18 Jul 2021 ======================= */
    public function backupInsertTimeline($id){
        $tn = Timeline::find($id);
        $file = base_path("DB/timeline_list.sqlite");
        $cont = "
/* ===== insert to `{$this->timeline_table}` ".date("Y-m-d H:i:s")." ======= */\n
INSERT INTO `$this->timeline_table`(`user_id`,`date_ref`,`report`,`created_at`,
`updated_at`) VALUES(
    '{$tn->user_id}',
    '{$tn->date_ref}',
    '{$tn->report}',
    '{$tn->created_at}',
    '{$tn->updated_at}');\n
";
        write2text($file,$cont);
    }
    /* ============ backupInsertTimeline 18 Jul 2021 ======================= */


    /* ============ backupUpdateTimeline 18 Jul 2021 ======================= */
    public function backupUpdateTimeline($id){
        $tn = Timeline::find($id);
        $file = base_path("DB/timeline_list.sqlite");
        $cont = "
/* ===== update to `{$this->timeline_table}` ".date("Y-m-d H:i:s")." ======= */\n
UPDATE `$this->timeline_table` SET date_ref='{$tn->date_ref}',
report='{$tn->report}',
updated_at='{$tn->updated_at}' WHERE id='{$tn->id}';\n
";
        write2text($file,$cont);
    }
    /* ============ backupUpdateTimeline 18 Jul 2021 ======================= */
    /* ============ backupDelTimeline 18 Jul 2021 ======================= */
    public function backupDelTimeline($id){
        $tn = Timeline::find($id);
        $file = base_path("DB/timeline_list.sqlite");
        $cont = "
/* ===== delete script `{$this->timeline_table}` ".date("Y-m-d H:i:s")." ======= */\n
DELETE FROM `{$this->timeline_table}` WHERE id='{$tn->id}';

";
        write2text($file,$cont);
    }
    /* ============ backupDelTimeline 18 Jul 2021 ======================= */

}
