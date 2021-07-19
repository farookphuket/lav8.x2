<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Timeline;
use Illuminate\Http\Request;

use Auth;

class TimelinesController extends Controller
{
    protected $timeline_table = "timelines";
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("Member.Timeline.index");
    }

    public function getTimelines(){
        $timelines = Timeline::with('user')
                        ->where('user_id',Auth::user()->id)
                        ->orderBy("date_ref",'asc')
                        ->paginate(15);
        return response()->json(["timelines" => $timelines]);
    }

    public function printTimeLine(){
        $timelines = Timeline::where("user_id",Auth::user()->id)
                            ->orderBy('date_ref','asc')
                            ->paginate(15);
        return view("Member.Timeline.print")->with(["print" => $timelines]);
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
        $data = request()->validate([
            "date_ref" => ["required"],
            "report" => ["required"]
    ]);
        $time = date("Y-m-d",strtotime(request()->date_ref));
        $data["date_ref"] = $time;
        $data["user_id"] = Auth::user()->id;
        // clean the input body
        $data["report"] = xx_clean(request()->report);

        Timeline::create($data);

        // get the last record 
        $tn = Timeline::latest()->first();

        // make a backup to file 
        $this->backupUpdateTimeline($tn->id);

        $msg = "<span class=\"alert alert-success\">Success {$time}</span>";
        return response()->json(["msg" => $msg]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Timeline  $timeline
     * @return \Illuminate\Http\Response
     */
    public function show(Timeline $timeline)
    {
        return response()->json(["timeline" => $timeline]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Timeline  $timeline
     * @return \Illuminate\Http\Response
     */
    public function edit(Timeline $timeline)
    {
        //
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
            "date_ref" => ["required"],
            "report" => ["required"]
        ]); 

        // clean the input body
        $validate["report"] = xx_clean(request()->report);

        $validate["updated_at"] = now();
        Timeline::where("id",$id)
                ->update($validate);

        // make a backup to file 
        $this->backupUpdateTimeline($id);

        $msg = "<span class=\"alert alert-success\">
            Success : item has been updated</span>";
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
    public function destroy($id)
    {
        // make a backup to file 
        $this->backupDelTimeline($id);

        $del = Timeline::find($id);
        $del->delete();

        $msg = "<span class=\"alert alert-success\">
            Success : item has been remove</span>";
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
