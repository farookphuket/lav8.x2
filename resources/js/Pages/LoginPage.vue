<template>
<div class="login-wrap">
	<div class="login-html">
		<input id="tab-1" type="radio" name="tab" class="sign-in" checked>
        <label for="tab-1" class="tab" v-if="login==false">Sign In</label>
        <label for="tab-1" class="tab" v-else>forgot</label>


		<input id="tab-2" type="radio" name="tab" class="sign-up">
    <label for="tab-2" class="tab">Sign Up</label>
		<div class="login-form">

			<div class="sign-in-htm" v-if="login == true">
          <form action="" 
              @submit.prevent="getResetPass()" 
              @keydown="resetForm.errors.clear($event.target.name)">
				<div class="group">
					<label for="user" class="label">Email</label>
					<input v-model="resetForm.email" 
                 type="email" placeholder="you email"
                ref="email"
          class="input">
          <span v-text="resetForm.errors.get('email')" 
              v-if="resetForm.errors.has('email')" 
              style="color:red;font-weight:bold;"></span>

				</div>
        <div class="group">
            <span v-html="res_status">{{res_status}}</span>
        </div>
				<div class="group">
					<input type="submit" class="button"
           value="reset password">
				</div>
          </form>
				<div class="hr"></div>
				<div class="foot-lnk">
					<a href="#forgot" @click.prevent="login=false"> 
            <i class='bx bx-log-in' ></i>
              Login</a> or
					<a href="/" >go home</a>
				</div>
			</div>

      <!-- =============== -->


			<div class="sign-in-htm" v-else>
				<div class="group">
					<label for="user" class="label">Username</label>
					<input v-model="login_email" type="text" class="input"
          ref="login_email">
				</div>

				<div class="group">
					<label for="pass" class="label">Password</label>
					<input v-model="login_password" type="password" class="input"
          data-type="password">
				</div>

<!--
				<div class="group">
					<input v-model="remember_me" type="checkbox" class="check" checked>
					<label for="check"><span class="icon"></span> Keep me Signed in</label>
				</div>
-->
				<div class="group">
            <!--
					<input type="submit" class="button" @click.prevent="getLogin"
          value="Sign In">
            -->
          <button class="button" @click.prevent="getLogin" 
              type="submit">
            <i class='bx bx-log-in' ></i>
            Login
          </button>
				</div>

				<div class="hr"></div>
				<div class="foot-lnk">
					<a href="#forgot" @click.prevent="login=true">Forgot password </a> or

					<a href="/" > 
            <box-icon name='home-alt'></box-icon>
              go home</a>
				</div>
			</div>

      <!-- ================ -->

			<div class="sign-up-htm">
          <!-- register form Start-->
          <form action=""
                @keydown="registerForm.errors.clear($event.target.name)"
              @submit.prevent="getRegister">
				<div class="group">
					<label for="user" class="label">Username</label>
					<input v-model="registerForm.name" 
                 name="name"
          type="text" class="input">
          <span class="badge badge-danger" 
              v-text="registerForm.errors.get('name')" 
              v-if="registerForm.errors.get('name')">
          </span>

				</div>
				<div class="group">
					<label for="pass" class="label">Password</label>
					<input v-model="registerForm.password" name="password" 
            type="password" class="input"
          data-type="password">

          <span class="badge badge-danger" 
              v-text="registerForm.errors.get('password')" 
              v-if="registerForm.errors.get('password')">
          </span>
				</div>


				<div class="group">
					<label for="pass" class="label">Repeat Password</label>
					<input v-model="registerForm.password_confirmation" type="password" 
            class="input" name="password_confirmation"
          data-type="password">

          <span class="badge badge-danger" 
              v-text="registerForm.errors.get('password_confirmation')" 
              v-if="registerForm.errors.get('password_confirmation')">
          </span>
				</div>


				<div class="group">
					<label for="pass" class="label">Email Address</label>
					<input v-model="registerForm.email" type="text" 
          name="email" class="input">


          <span class="badge badge-danger" 
              v-text="registerForm.errors.get('email')" 
              v-if="registerForm.errors.get('email')">
          </span>
				</div>


				<div class="group">
          <button class="button" type="submit">Register</button>
				</div>
          </form>
          <!-- register form End-->
				<div class="hr"></div>
				<div class="foot-lnk">
            <label for="tab-1">
                <a href="/">
                Back to home page</a></label>
				</div>

			</div>
		</div>
	</div>
  <b-modal title="server said :" ref="onOk" centered ok-only>
      <div class="container" v-html="res_status">
          {{res_status}}
      </div>
  </b-modal>
</div>

</template>


<script>

export default{
    name:"LoginPage",
    data(){
        return{
            login:false,
            registerForm:new Form({
                name:"",
                email:"",
                password:"",
                password_confirmation:""
            }),
            login_password:'',
            login_email:'',
            remember_me:false,
            resetForm:new Form({
                email:''
            }),
            res_status:''

        }
    },
    methods:{
        getRegister(){
           let url = `/register` 
            this.registerForm.submit("post",url)
                .then((res)=>{
                    this.res_status = res.msg
                    this.$refs["onOk"].show()
                })
                .catch((err) => {
                    //    console.log(err);
                        let ob = Object.values(err);
                        this.res_status = `<span class="badge badge-danger">
                            ${ob.join("").split(",")}</span>`;
                    });

            setTimeout(()=>{
                location.reload()
            },8000)

        },
        getLogin(){
            let url = `/login`
            axios.post(url,{email:this.login_email,password:this.login_password})
                .then(res=>{
                    let ds = res.data.user
                    if(ds.id){
                        let url = ""
                         url = `/member/dashboard`
                        //location.href=url
                        if(ds.is_admin != 0){
                            url = `/admin/dashboard`
                        }

                        location.href=url

                    }
                    this.res_status = `<span class="alert alert-success">
                        Welcome ${ds.name} </span>`

                },err=>{
                    //alert(err.response.data.message)
                    this.res_status = `<span class="alert alert-danger">
                        Error : ${err.response.data.message}</span>`
                    setTimeout(()=>{
                        this.$refs.login_email.focus()
                    },2500)
                })
            this.$refs["onOk"].show()

        },
        getResetPass(){
            let url = `/isMemberEmail`
            this.resetForm.submit("post",url)
                .then((res)=>{
                    //console.log(res.data)
                    this.res_status = res.msg

                })
                .catch((err)=>{
                    let ob = Object.values(err);
                    this.res_status = `<span class="alert alert-danger">
                        ${ob.join("")}</span>`;
                })

            setTimeout(()=>{
                this.res_status = ''
            },3000)
        },
    }
}
</script>
