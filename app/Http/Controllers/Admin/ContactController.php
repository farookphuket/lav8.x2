<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Auth;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }




    /**
     * Display a listing of the resource.
     *
     * call by admin contact
     * @return json
     */
    public function getContact(){
        $contacts = Contact::with("user")
                                ->orderBy("created_at","DESC")
                                ->paginate(20)
                                ->onEachSide(1);
        return response()->json([
            "contacts" => $contacts
        ]);
    }




    /**
     * Search the FAQ.
     *
     * @return \Illuminate\Http\Response
     */

    public function search(){
        $search = request()->search;
        $faqs = Contact::with('user')
            ->where("title","LIKE","%{$search}%")->get();
        return response()->json(["faqs" => $faqs]);
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
            "name" => ["required"],
            "email" => ["required"],
            "title" => ["required"],
        ]);

        $validate["replied_at"] = now();
        $validate["reply_by"] = Auth::user()->name;
        $validate["body"] = xx_clean(request()->body);
        $validate["token"] = Str::random(60);
        $validate["user_id"] = Auth::user()->id;
        $validate["ip"] = getUserIp();

        $validate["date_num"] = date('Y-m-d',time());

        Contact::create($validate);
        $msg = "<span class=\"alert alert-success\">
                Success : item has been created
                </span>";
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
        
        return response()->json([
            "contact" => Contact::where("id",$contact->id)->first()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        $validate = request()->validate([
            "name" => ["required"],
            "email" => ["required"],
            "title" => ["required"],
        ]);

        if(request()->reply):
            $validate["replied_at"] = now();
        endif;

        $validate["updated_at"] = now();
        $validate["body"] = xx_clean(request()->body);
        $validate["reply_by"] = Auth::user()->name;


        Contact::where('id',$id)
                        ->update($validate);
        $msg = "<span class=\"alert alert-success\">
                Success : item has been updated
                </span>";
        return response()->json([
            "msg" => $msg

        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function destroy(Contact $contact)
    {
        $del = Contact::where('id',$contact->id)->first();
        $del->delete();

        $msg = "<span class=\"alert alert-success\">
                Success : item has been deleted
                </span>";
        return response()->json([
            "msg" => $msg

        ]);
    }
}
