<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Illuminate\Support\Facades\DB;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected static $user_table = "users";

    protected static $fag_user_link_table = "contacts";

    protected static $role_user_link_table = "role_user";


    public function roles(){
        return $this->belongsToMany(Role::class);
    }

    public function photos(){
        return $this->hasMany(Photo::class);
    }

    public function timelines(){
        return $this->hasMany(Timeline::class);
    }

    public function blog(){
        return $this->hasMany(Blog::class);
    }


    public function whatnews(){
        return $this->hasMany(Whatnew::class);
    }

    public function contact(){
        return $this->hasMany(Contact::class);
    }

    public function tags(){
        return $this->hasMany(Tag::class);
    }

    public function products(){
        return $this->hasMany(Product::class);
    }

    public function category(){
        return $this->hasMany(Category::class);
    }

    public function template(){
        return $this->hasMany(Template::class);
    }
    public function comments(){
        return $this->hasMany(Comment::class);
    }



    /* ========================================================================
     * backup user to file Create on 30 Jul 2021
     * START
     * ========================================================================
     * */
    public static function backupUser($user_id,$cmd=false){
        // the users table
        $table = static::$user_table;

        // get the user to backup 
        $user = User::find($user_id);

        // file to write backup command to
        $file = base_path("DB/user_list.sqlite");


        // command to write to file 
        $command = "";

        // use switch statement to specified the command
        switch($cmd):
        case"insert":

            $command .= "\n
/* ============================================================================
 * CREATE user `{$user->id}` on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
INSERT INTO `$table`(`name`,`email`,`password`,`email_verified_at`,
`created_at`,`updated_at`) VALUES(
    '{$user->name}',
    '{$user->email}',
    '{$user->password}',
    '{$user->email_verified_at}',
    '{$user->created_at}',
    '{$user->updated_at}');
";
                
                // backup user link
                static::backupUserRoleLink($user->id,"edit");
            break;
        case"edit":
            $command .= "\n
/* ============================================================================
 * UPDATE user `{$user->id}` on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
UPDATE `{$table}` SET name='{$user->name}',
email='{$user->email}',
email_verified_at='{$user->email_verified_at}',
password='{$user->password}',
updated_at='{$user->updated_at}' WHERE id='{$user->id}';
\n
";
            
                // backup user link
                static::backupUserRoleLink($user->id,"edit");
            break;
        default:
            $command .= "\n
/* ============================================================================
 * Delete user '{$user->id}' from table `{$table}` on ".date("Y-m-d H:i:s")."
 * please notice the command script will be commented and it will not be 
 * execute 
 * ============================================================================
 * */
/* DELETE FROM `{$table}` WHERE id='{$user->id}'; */
";
                // backup user link
                static::backupUserRoleLink($user->id);
            endswitch;


        // write to file 
        write2text($file,$command);


    }

    /* ========================================================================
     * backup user to file Create on 30 Jul 2021
     * END
     * ========================================================================
     * */

    /* ========================================================================
     * backup role user link
     * on 30 Jul 2021
     * START
     * ========================================================================
     * */
    public static function backupUserRoleLink($user_id,$cmd=false){
        // file to write backup command 
        $file = base_path("DB/role_user_list.sqlite");

        // table user role 
        $table = static::$role_user_link_table;

        // get the user role
        $user_roles = DB::table($table)
                            ->where("user_id",$user_id)
                            ->get();
        $command = "";

        if(count($user_roles) != 0):

            $command .= "\n
/* ============================================================================
 * DELETE the row to prevent from repetition
 * ============================================================================
 * */
DELETE FROM `{$table}` WHERE user_id='{$user_id}';
";
            endif;

        switch($cmd):
        case"edit":
                foreach($user_roles as $role):
                    $command .= "\n
/* ============================================================================
 * backup user role ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
INSERT INTO `{$table}`(`role_id`,`user_id`,`created_at`,
`updated_at`) VALUES(
    '{$role->role_id}',
    '{$role->user_id}',
    '{$role->created_at}',
    '{$role->updated_at}'); 
"; 
                endforeach;
            break;
        default:

            $command .= "\n
/* ============================================================================
 * DELETE the row 
 * ============================================================================
 * */
DELETE FROM `{$table}` WHERE user_id='{$user_id}';
";
            break;
           endswitch; 

            // write to file
            write2text($file,$command);
    }

    /* ========================================================================
     * backup role user link
     * on 30 Jul 2021
     * END
     * ========================================================================
     * */

}
