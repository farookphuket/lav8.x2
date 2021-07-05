
   <div style="background-color:#e7e7e7;">
        <div style="background-color:white;color:blue;padding:2px;">
            <h1>Dear {{$name}} we notice that you've sent the request 
                for password reset</h1>
            <p>from {{$title}}</p>
            <p>
            this maybe cause by the lost of password please click (or copy and paste the address below into your browser's address bar) the link with in 5 minute.
            </p>
<p>
    <a href="{{$reset_link}}" target="_blank">Click here</a> to open link in 
the new tab or copy the link below  
</p>
            <p>{{$reset_link}}</p>
<p>
    if this is not you please ignore this message.
</p>
        </div>
   </div>

