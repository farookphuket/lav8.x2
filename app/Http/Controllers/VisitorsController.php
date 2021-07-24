<?php

namespace App\Http\Controllers;

use App\Models\Visitor;
use Illuminate\Http\Request;

class VisitorsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $day = '';
    protected $month = '';
    protected $year = '';
    protected $today_short = '';
    protected $today_long = '';

    protected $ip = '';
    protected $browser = '';
    protected $os = '';

    protected $visitor_table = "visitors";

    public function __construct(){
        
        // return single number with 0
        $this->day = date("d",time());
        $this->month = date("m",time());
        $this->year = date("Y",time());


        // return date format
        $this->today_short = date("Y-m-d",time());
        $this->today_long = date("Y-m-d H:i:s",time());

        $this->os = getUserOs();
        $this->ip = getUserIp();
        $this->browser = getUserBrowser();

    }

    public function index()
    {
        //
    }

    public function getVisitors(){

        $this->getNewVisitor();
        $today_visit = $this->getByDay();
        $get_month = $this->getByCurMonth();

        $get_year = $this->getByCurYear();
        $month = count($get_month);
        $year  = count($get_year);
        $day = count($today_visit);
        $all_time = Visitor::all();
        $my_info = array([
            "ip" => getUserIp(),
            "os" => getUserOs(),
            "browser" => getUserBrowser()
        ]);

        return response()->json([
            "today_visit" => $today_visit,
            "month_visit" => $month,
            "year_visit" => $year,
            "day" => $day,
            "all_time" => count($all_time),
            "my_info" => $my_info
        ]);
    }

    public function getByDay(){
        $get = Visitor::whereYear('created_at','=',$this->year)
                        ->whereMonth('created_at','=',$this->month)
                        ->whereDay('created_at','=',$this->day)
                        ->get();
        return $get;
    }


    /* return get visitor in this month of the current year */
    public function getByCurMonth(){
        $get = Visitor::whereYear('created_at','=',$this->year)
                        ->whereMonth('created_at','=',$this->month)
                        ->get();
        return $get;
    }


    /* return get visitor in this month of the current year */
    public function getByCurYear(){
        $get = Visitor::whereYear('created_at','=',$this->year)
                        ->get();
        return $get;
    }

    public function getNewVisitor(){
        
        $get = Visitor::where([
            "ip" => $this->ip,
            "date_visit" => $this->today_short
        ])->get();


        if(count($get) == 0){

            $last_sql = Visitor::create([
                "ip" => $this->ip,
                "browser" => $this->browser,
                "os" => $this->os,
                "date_visit" => $this->today_short,
                "day_num" => $this->day,
                "month_num" => $this->month,
                "year_num" => $this->year,
            ]);

            $vt = Visitor::latest()->first();
            // ============ write data to file ================
            $this->backupVisitor($vt->id,"insert");
        }

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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Visitor  $visitor
     * @return \Illuminate\Http\Response
     */
    public function show(Visitor $visitor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Visitor  $visitor
     * @return \Illuminate\Http\Response
     */
    public function edit(Visitor $visitor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Visitor  $visitor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Visitor $visitor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Visitor  $visitor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Visitor $visitor)
    {
        //
    }


    /* ============= backupVisitor 25 Jul 2021 START ======================= */
    public function backupVisitor($id,$command=false){
        // get the specific record
        $visit = Visitor::find($id);


        //open file 
        $file = base_path("DB/visitors_list.sqlite");
        $cont = "";
        switch($command):
            case"insert":

                $cont .= "\n 
/* ======== add to visitors table using auto script {$this->today_long} ==== */
INSERT INTO `{$this->visitor_table}` (
`ip`,`browser`,`os`,`day_num`,`month_num`,`year_num`,`date_visit`,`created_at`,
`updated_at`) VALUES (
    '{$visit->ip}',
    '{$visit->browser}','{$visit->os}',
    '{$visit->day_num}','{$visit->month_num}','{$visit->year_num}',
    '{$visit->date_visit}',
    '{$visit->created_at}',
    '{$visit->updated_at}');
            ";
            break;
            default:
            $cont .= "\n 
/* ============= DELETE Record {$id} on ".date("Y-m-d H:i:s")." ============ */
DELETE FROM `{$this->visitor_table}` WHERE id='{$visit->id}';
";
            break;
        endswitch;

       // save backup to file
       write2text($file,$cont); 
    }
    /* ============= backupVisitor 25 Jul 2021 END ========================= */
}
