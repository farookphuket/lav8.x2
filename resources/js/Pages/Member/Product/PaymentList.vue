<template>
    <div class="row">
        <div class="col-lg-12">
            <h2>Payment Method</h2>
            <p class="pt-2 mb-4">please select your payment method</p>
        </div>
        <div class="col-lg-4" v-for="pa in payments">
           <div 
           style="min-height:250px;"
           class="text-center">
            <a href="" @click.prevent="openPaymentPic(pa.pay_url)">
                <img class="responsive d-block mx-auto" 
                style="max-height:240px;"
                :src="pa.pay_pic_absolute_path" 
                :alt="pa.pay_title">
            </a>
           </div>
           <p class="text-center pt-2">
            <input v-model="payment_method" 
            :value="pa.id" @change.prevent="$emit('selectPayment',pa.id)"
            class="" type="radio" 

            name="payment_method">
                {{pa.pay_title}}
           </p>
        </div>
    </div>
</template>

<script>
export default{
    name:"PaymentList",
             data(){
                 return{
                     payments:[],
                     payment_method:'',
                 }
             },
             mounted(){
                 this.getPayment()
             },
methods:{
            getPayment(){
                let url = `/getpayment`
                axios.get(url)
                .then(res=>{
                    this.payments = res.data.payments
                        })
            },
            openPaymentPic(url){
                window.open(url,"_blank")
            },
        },
}
</script>
