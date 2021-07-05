<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Timeline;
use Illuminate\Http\Request;

use Auth;

class TimelinesController extends Controller
{
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

        Timeline::create($data);

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

        $validate["updated_at"] = now();
        Timeline::where("id",$id)
                ->update($validate);
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
        //
        $del = Timeline::find($id);
        $del->delete();
        $msg = "<span class=\"alert alert-success\">
            Success : item has been remove</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }
}
