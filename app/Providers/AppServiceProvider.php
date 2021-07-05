<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Config;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     *
        $my_twitter = Config::get("DEFAULT_CONTACT.my_twitter");
        $my_facebook = Config::get("DEFAULT_CONTACT.my_facebook");
        $my_instagram = Config::get("DEFAULT_CONTACT.my_instagram");
        $my_google = Config::get("DEFAULT_CONTACT.my_google");
        $my_linkedin = Config::get("DEFAULT_CONTACT.my_linkedin");
        $my_skype = Config::get("DEFAULT_CONTACT.my_skype");
     */
    public function boot()
    {

        Config::set([
            "DEFAULT_CONTACT" => [
                "my_mobile" => "+66 95 954-3920",
                "my_email" => "farookphuket@gmail.com",
                "my_address" => "56 M.3 T.Lamsak A.Ao-Luk Krabi Thailand 81110",
                "my_twitter" => "",
                "my_facebook" => "",
                "my_google" => "farookphuket@gmail.com",
                "my_instagram" => "",
                "my_skype" => "https://join.skype.com/invite/vuxfIjs54MPS",
                "my_linkedin" => "https://www.linkedin.com/in/farook-fuu-time-480a9a47/",
            ]
        ]);
    }
}
