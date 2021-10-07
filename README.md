# lav8.x2

> start date at 15 Apr 2021 using the free theme
lav8.x2 is the current project that I working on now (15 Ap 2021)








#  ========== My update list ==============

> this is the update code list that I have made.




---


#  ========= Shopping Cart 
## ========= date 29 Sep 2021 

> Simple shopping cart feature "list product page " will allow 
> "Authenticate user" to simeply "Add" his product as well
  

[list_product]:https://i.ibb.co/3dZpC5v/Sum-value-array-JS-20210926-061015.png
[member_add_product]:https://i.ibb.co/MNHYb7v/add-product-20210926.png
[show_product]:https://i.ibb.co/wpsQp4Y/view-product-20210926.png
[cart_list]:https://i.ibb.co/YR8LNjN/cart-list-20210926.png
[my_kasikorn_bank_acc]:https://i.ibb.co/j4Rt9Rp/Kbank-Code-for-money-transfer.jpg

### ================== List product 

> the "list product" page will all "Auth user" to simply add his product for 
sale 


![list product page][list_product]



![add product page][member_add_product]



### ================== Show product and cart list page

> **Show product** will remember the last select amount of the currently 
prview product as if the user has already pick it in the list doesn't matter how 
many times he has click the "add to cart" button the script will be update the 
selecting amount from the form. 



![show product][show_product]




> **Cart list** will show the list of product in the cart and user can remove if
he want to 



![cart list][cart_list]



> ***Money transfer method***
> to transfer money from your country(if you're not in Thailand) to my bank 
account 

My Bank Address : SAM-KONG BRANCH 264/2 Yaovaraj Road T. Talad-Yai A. Muang 
Phuket Thailand 83000

Bank Swift Code : KASITHBK
Bank Account Name : CHETSADAPHON
Bank Account Number : 489-2-057112


![my kasikorn bank account ][my_kasikorn_bank_acc]


---

## ========= date 29 Jul 2021 

> the backup script now move to "Model" for easy call from the controller
> backup method will need 2 arguments :
1.  The id of blog,tag,comment.
2.  the command "insert","edit" or leave it for the delete command(which's now 
the delete command will commented will be not really delete data on the refresh
due to the chain of id relationship throw error if the command has execute.)

> to use case :
-   call from controller :
```
// make sure you have include the model
use App\Models\Blog;


/*
* this will make  INSERT command to file  
*
*/
Blog::backupBlog($blog_id,"insert");


// this will make UPDATE command to file
Blog::backupBlog($blog_id,"edit");


// this will make DELETE command to file(with the commented)
Blog::backupBlog($blog_id);

```

> you can use this with `Comment`,`Tag`,`Whatnew`,`Category`.


> backup script will be "comment" the "delete command" as it is cannot be 
> permanently remove due to the error on refresh will be occoure 
> so now back up will be writen to the backup file for a new refresh 
> but the "has removed" item will be re-insert on the `php artisan db:seed` 
> command run so make sure you have check this very well. 

---
## ========= date 22 Jul 2021 

> update backup blog script to make less complicated.

---
## ========= date 5 July 2021 
> update the whatnew in admin and make a backup to file while insert to the DB 

> update the show list of F.A.Q to make it look better in the Desktop device(but will be shown very well responsive in mobile device)

---
## ========= date 18 June 2021 

> delete the theme "learn,base,bizland,sentra,w3s,VMD" as it's not resposive 
> for mobile device
> update to using classlist Theme just to reduce the file size



### ===== now using classlist theme

[classlist_theme]:https://i.ibb.co/WWfVPTP/2021-06-18-classlist-theme.png

![classlist them 18 June 2021][classlist_theme]



--- 
## ========= date 10 June 2021 
> start create comment system for blog
> change theme to classilist as it is well support for the mobile device and 
> to using vue is more easy




---
## ========= date 3 June 2021

> update the blog system added tags


---

## ======= date 29 May 2021

> copy the code from `https://stackoverflow.com/questions/40842277/create-line-numbers-on-pre-with-css-only` just to make the line number for code with css



> the css code is

```
pre {
  background: #303030;
  color: #f1f1f1;
  padding: 10px 16px;
  border-radius: 2px;
  border-top: 4px solid #00aeef;
  -moz-box-shadow: inset 0 0 10px #000;
  box-shadow: inset 0 0 10px #000;
  counter-reset: line;
}
pre span {
  display: block;
  line-height: 1.5rem;
}
pre span:before {
  counter-increment: line;
  content: counter(line);
  display: inline-block;
  border-right: 1px solid #ddd;
  padding: 0 .5em;
  margin-right: .5em;
  color: #888
}


/* to use it with tag span */


<pre>
    <code>
        <span>this is any code</span>
        <span>this is any code line 2</span>
        <span>this is any code line 3</span>
    </code>
</pre>



```

> the output will show line number at the front of each span


1.  this is any code
2.  this is any code
3.  this is any code



---

## ========= update 26 May 2021

> Added visitors
> copy the command from "https://hdtuto.com/article/laravel-detect-mobile-or-desktop-using-jenssegers-agent-example"
> run command for composer
> `composer require jenssegers/agent`



> add the following line to the file "config/app.php"


```
.....

'providers' => [

    // only copy the code it self at the below line
	....

	Jenssegers\Agent\AgentServiceProvider::class,

]

'aliases' => [

    // only copy the below line from 'Agent' to 'class,'
	....

	'Agent' => Jenssegers\Agent\Facades\Agent::class,

]

.....

```




---
# ======== update 20 May 2021 =======

> added "contact" feature the user can be contact to the website



[contact_see-south]:https://i.ibb.co/D4gWh2c/2021-05-20-contact.png

![contact form ][contact_see]


---

# ======== last update 9 May 2021 =====

> Added whatnews and change the template back to sentra







# ================ Photo 15 Apr 2021  ===================


[15_apr_pic_4]:https://i.ibb.co/X84zV1F/2021-04-15-laravel-X2-custom-script.png

[15_apr_pic_1]:https://i.ibb.co/JBskcQ9/2021-04-15-laravel-X2-index.png
[15_apr_pic_2]:https://i.ibb.co/0ZDpVyW/2021-04-15-laravel-X2-login.png
[15_apr_pic_3]:https://i.ibb.co/n8cB8Md/2021-04-15-laravel-X2-member.png


## =============== Home page ==========================

![index.blade.php][15_apr_pic_1]




## =============== Login Page =========================
![login page][15_apr_pic_2]



## ================ meber page ========================

![member page][15_apr_pic_3]


## ================ class from Jeffrey Way

> Custome my first class code from Jeffrey Way


![my custom first class][15_apr_pic_4]







