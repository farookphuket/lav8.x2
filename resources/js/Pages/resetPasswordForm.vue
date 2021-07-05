<template>



<div class="login-wrap">
	<div class="login-html">
		<input id="tab-1" type="radio" name="tab" class="sign-in" checked>
        <label for="tab-1" class="tab" >form</label>


		<input id="tab-2" type="radio" name="tab" class="sign-up" disabled>
    <label for="tab-2" class="tab">reset</label>


		<div class="login-form">


      <!-- =============== -->


			<div class="sign-in-htm">

          <form action="" @submit.prevent="resetMyPassword()" 
              @keydown="formReset.errors.clear($event.target.name)">
				<div class="group">
					<label for="user" class="label">Password</label>
					<input  type="text" class="input" name="password" 
            v-model="formReset.password" ref="password" 
            >
          
          <span style="color:red;font-weight:bold;" 
              v-text="formReset.errors.get('password')"
              v-if="formReset.errors.get('password')"
              ></span>
				</div>

				<div class="group">
					<label for="pass" class="label">Confirm Password</label>
					<input  type="text" class="input" name="password_confirmation"
            v-model="formReset.password_confirmation"
          >

          <span style="color:red;font-weight:bold;" 
              v-text="formReset.errors.get('password_confirmation')"
              v-if="formReset.errors.get('password_confirmation')"
              ></span>
				</div>

				<div class="group">
            <span style="margin-top:2px;" v-html="s_msg" v-if="!is_disabled">{{s_msg}}</span>
            <button class="button" :disabled="is_disabled" 
              type="submit">
            <i class='bx bx-log-in' ></i>
            Reset ({{time_left}})
          </button>
				</div>

          </form>
				<div class="hr"></div>
				<div class="foot-lnk">
					<a href="#forgot" >Forgot password </a> or

					<a href="/" > 
            <box-icon name='home-alt'></box-icon>
              go home</a>
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
    name:"ResetPassword",
    data(){
        return{
            res_status:'',
            time_left:window.time_left,
            s_msg:window.msg,
            is_disabled:false,
            token:window.token,
            formReset:new Form({
                password:'',
                password_confirmation:''
            }),


        }
    },
    mounted(){
        this.getCount()


    },
    methods:{
        resetMyPassword(){
            
            let url = `/passwordreset/${this.token}`
            this.formReset.submit('put',url)
                .then((res)=>{
                    //console.log(res.msg)
                    this.res_status = res.msg
                    this.$refs["onOk"].show()
                    setTimeout(()=>{
                        location.href='/'
                    },7000)
                })

        },
        getCount(){
            //will be reload page until the off
            //then will disabled the send button 
            let timmer;
            if(this.time_left <= 1){
                //console.log(`the time is clear ${this.time_left}`)
                this.is_disabled = true
                clearTimeout(timmer)
            }else{
                
                timmer = setTimeout(()=>{
                    //alert(`ha ha go `)
                    location.reload()
                },32500) 
            }

        },
    }
}
</script>
