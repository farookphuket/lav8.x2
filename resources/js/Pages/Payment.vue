<template>
    <div class="container-fluid">
        <payment-list :payments="payments"></payment-list>


    </div>
</template>

<script>
import PaymentList from './PaymentList.vue'
export default{
    name:"PaymentMethods",
             components:{
                 PaymentList,
             },
             data(){
                 return{
                    payments:'',
                 }
             },
             mounted(){
                 this.getPayment()
             },
methods:{
            getPayment(){
                // no need pagination
                let url = `/getpayment`
                axios.get(url)
                .then(res=>{
                    this.payments = res.data.payments
                        })
            }, 
        },
}
</script>
