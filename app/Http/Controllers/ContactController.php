<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Http\Request;

use DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\URL;

class ContactController extends Controller
{
    
    protected $user_table;
    protected $faq_table;

    protected $today_short;

    public function __construct(){
        $this->user_table = 'users';
        $this->faq_table = 'contacts';
        $this->today_short = date("Y-m-d");
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        //
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
     * Show the list of faq in the index page.
     *
     * @return json
     */
    public function getContact(){

        $wasted = Contact::where("user_id",null)
                                ->get();
       if(count($wasted) != 0): 
            foreach($wasted as $del):
                $this->destroy($del->id);
            endforeach;
        endif;


        $getFaqs = Contact::with('user')
                            ->latest()
                            ->paginate(3)
                            ->onEachSide(1);

        return response()->json(["getFaqs" => $getFaqs]);

    }


    /**
     * isRealPerson to confirm person via email.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function isRealPerson($token){

        $get_person = Contact::where('token',$token)->first();

        $name = $get_person->name;
        $pass = Hash::make("password");
        $email = $get_person->email;

        $get_from_user = User::where('email',$email)->get();
        $user_id = "";

        if(count($get_from_user ) == 0):
            $newMember = User::create([
                "name" => $name,
                "email" => $email,
                "password" => $pass
            ]);
            $user_id = $newMember->id;

            // make a backup for new user 
            $this->makeBackupUser();
            //--- end of backup

            $msg = 'new_user';
        endif;
        $msg = 'current_user';
        foreach($get_from_user as $it):
            $user_id = $it->id;
        endforeach;
        // update user id in contact
        DB::table('contacts')
            ->where('token',$token)
            ->update([
                'user_id' => $user_id,
                'title' => 'please enter your title',
                'body' => 'please enter the body text',
                'updated_at' => now()
            ]);

        $person = User::with('contact')
                        ->where('email',$email)
                        ->get();
        return response()->json([
            "person" => $person,
            "msg" => $msg
        ]);

    }

    public function confirmRealPerson(){

        $email = request()->email;
        $name = request()->name;
        $this->sentEmailToUser($name,$email);

        $msg = "<span class=\"res_status alert alert-warning\">
        token has been send please check your email {$email}</span>";

        return response()->json(["msg" => $msg]);
    }


    public function sentEmailToUser($name,$email){

        $str_ran = Str::random(60);

        DB::table('contacts')->insert([
            'token' => $str_ran,
            'ip' => getUserIp(),
            'email' => $email,
            'name' => $name,
            'title' => 'waiting for confirm',
            'body' => 'waiting for user confirm',
            'date_num' => date("Y-m-d",time()),
            'created_at' => now()
        ]);



        $data = array(
            "name" => $name,
            "email" => $email,
            "title" => 'your confirmation token',
            "reset_link" => $str_ran
        );


        $get = array("name" => $name,"email" => $email);
        Mail::send('Mail.contactUsEmail',$data,function($msg) use ($get){
            $msg->from('no-reply@cannot-reply.nohost');
            $msg->to($get["email"],'no-reply-back')->subject("Dear {$get["name"]}
                we notice that you need confirmed");
        });




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
            "name" => ["required"],
            "email" => ["required","email"],
            "title" => ["required","min:10"],
            "token" => ["required"]
        ]);


        $valid["body"] = xx_clean(request()->body);
        $valid["date_num"] = date('Y-m-d',time());
        $valid["ip"] = getUserIp();



        unset($valid['token']);
        $valid['updated_at'] = now();


        // delete not confirm row
        $del_batch = Contact::where('user_id',null)->get();
        foreach($del_batch as $row):
            $row->delete();
        endforeach;

        $update = Contact::where('token',request()->token)
                            ->update($valid);

        // ================ backup to sqlite file 
        $this->makeBackupIfConfirm();
        // =========== End backup =================

        if(!$update):
            $msg = "<span class=\"alert alert-danger res_status\">
            Error : something went wrong please re-check the input
</span>";
        endif;

        $msg = "<span class=\"res_status alert alert-success\">
            Success : message has sent</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function edit(Contact $contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Contact $contact)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $del = Contact::find($id);
        $del->delete();
    }

    /* make backup user */ 
    public function makeBackupUser(){

            $getUser = User::latest()->first();
            $file = base_path("DB/user_list.sqlite");

            $content = "/* ============== Auto backup ".date("Y-m-d H:i:s a");
            $content .= " ============== */";
            $content .= "
    INSERT INTO `{$this->user_table}`(`name`,`email`,`password`,`created_at`
    ,`updated_at`) VALUES(
    '{$getUser->name}','{$getUser->email}',
    '{$getUser->password}',
    '{$getUser->created_at}',
    '{$getUser->updated_at}');


    /* ===== attach new user {$getUser->name} to role member  */
    INSERT INTO `role_user` (`role_id`,`user_id`,`created_at`,`updated_at`) 
    VALUES ('2','{$getUser->id}',
    '{$getUser->created_at}',
    '{$getUser->updated_at}');                                          
";

            write2text($file,$content);
    }
    /* End of backup user */ 
    
    /* ========  make backup if this user has confirm START ================ */
    public function makeBackupIfConfirm(){
        $faq = Contact::latest()->first();
        $file = base_path("DB/faq_list.sqlite");
        $con = "/* ========= auto backup ".date("Y-m-d H:i:s");
        $con .= " to table {$this->faq_table} =========== */ ";
        $con .= "
INSERT INTO `{$this->faq_table}`(`user_id`,`name`,`email`,`title`,
`ip`,`token`,`date_num`,`body`,`created_at`,`updated_at`) VALUES(
    '{$faq->user_id}','{$faq->name}','{$faq->email}','{$faq->title}',
    '{$faq->ip}','{$faq->token}','{$this->today_short}','{$faq->body}',
    '{$faq->created_at}','{$faq->updated_at}'
);
";

        write2text($file,$con);
    }
    /* ========  make backup if this user has confirm END ================ */
}
