<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Auth;
use App\Models\User;

class LoginResponse implements LoginResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request)
    {

        $user = User::where('id',Auth::user()->id)->first();
       // if($request->wantsJson()){
       //     return response()->json(['two_factor' => false]);
       // }
        return response()->json([
                'user' => $user
        ]);
    }
}
