<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-4" v-for="pa in payments">
                <div class="form-group"
                style="max-height:250px;margin:0 auto;">
                    <a :href="pa.pay_url" target="_blank">
                        <img class="responsive mx-auto" 
                        :src="pa.pay_pic_absolute_path" 
                        style="display:block;max-width:220px;"
                        :alt="pa.pay_title">
                    </a>
                    <p class="text-center">
                       <input id="" type="radio" name="">
                        {{pa.pay_title}}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name:"PaymentList",
    props:["payments"],
             data(){
                 return{

                 }
             },
methods:{

        },
}
</script>
