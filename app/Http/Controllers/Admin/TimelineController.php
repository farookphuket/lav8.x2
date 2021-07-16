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
                    ->paginate(5)
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
        $validate["date_ref"] = date("Y-m-d H:i:s",strtotime(request()->date_ref));
        $validate["user_id"] = Auth::user()->id;

        // create new timeline
        Timeline::create($validate);

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
    public function show(Timeline $timeline)
    {
        //
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
        $validate["date_ref"] = date("Y-m-d H:i:s",strtotime(request()->date_ref));
        $validate["updated_at"] = now();
        // create new timeline
        Timeline::where("id",$id)
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
     * @param  \App\Models\Timeline  $timeline
     * @return \Illuminate\Http\Response
     */
    public function destroy(Timeline $timeline)
    {
        $del = Timeline::where("id",$timeline->id)
                        ->first();
        $del->delete();

        $msg = "<span class=\"alert alert-success\">
            Success : data has been deleted!</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }
}
