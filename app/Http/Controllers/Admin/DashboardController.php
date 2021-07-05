<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

use App\Models\Landing;
use App\Models\Contact;
use App\Models\User;
use App\Models\Blog;
use App\Models\Whatnew;

use DB;

class DashboardController extends Controller
{


    protected $comment_table;

    protected $wn_table;
    public function __construct(){
        $this->comment_table = "blog_comment";
        $this->wn_table = "whatnews";
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(Gate::denies('adminRight')):
            return redirect()->route('/login');
        endif;
        $last_user = User::latest()
                            ->limit(4)
                            ->get();
        $last_contact = Contact::latest()
                            ->limit(4)
                            ->get();
        $last_blog = Blog::latest()
                            ->limit(4)
                            ->get();

        $last_comment = DB::table($this->comment_table)
                            ->latest()
                            ->limit(4)
                            ->get();
        return view("Admin.index")
            ->with([
                "last_user" => $last_user,
                "last_contact" => $last_contact,
                "last_blog" => $last_blog,
                "last_comment" => $last_comment
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Landing  $landing
     * @return \Illuminate\Http\Response
     */
    public function show(Landing $landing)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Landing  $landing
     * @return \Illuminate\Http\Response
     */
    public function edit(Landing $landing)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Landing  $landing
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Landing $landing)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Landing  $landing
     * @return \Illuminate\Http\Response
     */
    public function destroy(Landing $landing)
    {
        //
    }
}
