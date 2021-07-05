<template>
<div class="pt-4 ">

            <div class="section-title" style="margin-bottom:1.5em;">
                <h3 class="wow fadeInUp" data-wow-delay=".2s">
                    Not the answer you looking? well, let create one now.
                </h3>
<!--
                <p class="wow fadeInUp" data-wow-delay=".4s">Lorem ipsum dolor sit amet, consetetur sadipscing </br>elitr, sed diam nonumy eirmod tempor invidunt utlabo</p>
-->
                <ol>
                    <li>enter your name </li>
                    <li>enter your email then you will get the token in your 
                        email we need the token to confirm that you are a 
                        real person
                    </li>
                </ol>
            </div>

        <form  action="#"
            @submit.prevent="sentMessage"
            @keydown="clearForm">

                <div class="row">
                    <div class="col-12" style="margin-bottom:1.2em;">
                        <div class="row">

                            <div class="col-md-6">
                                <input name="name" type="text" class="form-control"
                                id="name" placeholder="Your name..."
                                ref="name"
                                v-model="contactForm.name" required="">

                            </div>

                            <div class="col-md-6">
                                <input name="email" type="email" class="form-control"
                                id="email" placeholder="Your email..."
                                v-model="contactForm.email" ref="email"
                                @blur="sendEmail"
                                required="">
                            </div>
                        </div>
                    </div>

                </div>
                

                <div class="row">
                     <div  
                         class="col-12">
                        <input name="title" 

                               type="text" class="form-control p-2"
                        id="subject" placeholder="Subject..."
                        v-model="contactForm.title" required="">

                    </div>
                </div>

                <div class="row" v-show="showToken">
                    <div style="margin-top:1.2em;"
                        class="col-12" >
                        <textarea class="form-control"
                                v-model="token" ref="token" 
                               @blur.prevent="sentToken"
                              placeholder="we have send the token to your email  please paste the token in this text box."></textarea>
                    </div>
                </div>


                <div class="row">
                    <div class="col-12" style="margin-top:1.2em;
                        margin-bottom:2.5em;">
                        <jodit-editor
                            v-model="contactForm.body" width="100%"
                            height="450"></jodit-editor>

                    </div>
                </div>

                <div class="clearfix">
                    <div class="float-right">
                        <button 
                            class="main-btn btn-hover d-none d-md-block "
                            type="submit">
                            <i class="lni lni-telegram-original"></i>
                        </button>
                    </div>
                </div>


        </form>

        <div class="col-lg-12 pt-4">&nbsp;</div>
        <div class="text-content " v-html="res_status">
            {{res_status}}
        </div>


</div>
</template>


<script>
import JoditEditor from 'jodit-vue'
export default{
    name:"ContactForm",
    data(){
        return{
            res_status:'',
            token:'',
            showToken:false,
            contactForm:new Form({
                name:'',
                email:'',
                token:'',
                title:'',
                body:''
            }),
        }
    },
    mounted(){
      this.$emit('getFaq')
    },
    methods:{
        
        sentMessage(id){
            let url = `/contact`
            this.contactForm.token = this.token
            this.contactForm.submit("post",url)
                .then((res)=>{
                    //console.log(res.msg)
                    this.res_status = res.msg
                    this.showToken = false
                })
                .catch((err) => {
                //    console.log(err);
                    let ob = Object.values(err);
                    this.res_status = `<span
                    class="res_status alert alert-danger">
                        ${ob.join("")}</span>`;
                });
            setTimeout(()=>{
                this.clearForm()
                this.$emit('getFaqs')
            },3000)
        },
        sendEmail(){
            let url = `/confirmRealPerson`
//            console.log(this.$refs.email.value)

            if(!this.$refs.email.value){
                return
            }else{
                if(!this.$refs.name.value){
                    this.$refs.name.focus()
                }else{
                    axios.post(url,{
                        email:this.$refs.email.value,
                        name:this.$refs.name.value
                        })
                        .then(res=>{
                        //    console.log(res.data)
                            this.res_status = res.data.msg
                            this.showToken = true;
                            this.$refs.token.focus()
                        })
                }

            }

        },
        sentToken(){
            this.token = this.$refs.token.value
            let url = `/isRealPerson/${this.token}`
            axios.post(url,{token:this.token})
                .then(res=>{
                    //console.log(res.data)
                })
        },
        clearForm(){
            this.res_status = ''
          //  this.showToken = false
        },
    }

}
</script>
