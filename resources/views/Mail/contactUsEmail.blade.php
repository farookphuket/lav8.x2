
   <div style="background-color:#e7e7e7;padding:15px 45px;margin:0 auto;">
        <div style="background-color:white;color:blue;padding:2px;">
            <h1>Dear {{$name}} we notice that 
                you've sent the request for 
                email confirmation</h1>
            <p>{{$title}}</p>
            <p>
                this maybe cause by the contact us form <br />
                please copy and paste the token key below into  
                contact form page to complete your confirmation.
            </p>
            <p style="margin-top:2em;">
                you can login by using user name : {{$email}} and your password 
is "password"
            </p>
            <p style="margin-top:4em;">Token : {{$reset_link}}</p>
        </div>
        <div style="border:2px dashed #ff0000;
        background-color:#000000;color:red;font-weight:bold;
            margin-top:4em;">
            <p>
                if this is not you please ignore this message.
            </p>
        </div>
   </div>
