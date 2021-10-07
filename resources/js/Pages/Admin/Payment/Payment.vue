<template>
    <div class="container-fluid">
        <h1 class="mt-4">Payment</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item">
                <a href="/admin/dashboard">Dashboard</a>
            </li>
            <li class="breadcrumb-item active">Payment</li>
        </ol>
       <payment-form :editId="editId" :res_status="res_status"
        @getPayment="getPayment($event)" @showResponseMsg="showResponseMsg($event)"
       ></payment-form>
       <p class="mt-4">&nbsp;</p>

       <payment-list :payment="payment_list" 
        @edit="edit($event)" @del="del($event)"
       ></payment-list>
       
    </div>
</template>

<script>
import PaymentList from "./PaymentList.vue"
import PaymentForm from "./PaymentForm.vue"
export default{
    name:"ManPayment",
             components:{
                 PaymentForm,
                 PaymentList,
             },
             data(){
                 return{
                     editId:0,
                     payment_list:[],
                     res_status:'',
                 }
             },
             mounted(){
                 this.getPayment()
             },
methods:{
            getPayment(page){
                this.res_status = ''
                this.editId = 0

                let url =''
                    if(page){
                        url = page
                        this.$cookies.set("apay_old_page",url)
                    }
                url = this.$cookies.get("apay_old_page")
                if(!url) url = `/admin/getpayment`
                axios.get(url)
                    .then(res=>{
                        this.payment_list = res.data.payment
                            })
            },
            edit(id){
                this.res_status = `<span class="alert alert-info">
                editing payment method id ${id}</span>`
                this.editId = id
            },
            del(id){
                if(confirm(`will delete the payment method id ${id}`) == true){
                    let url = `/admin/payment/${id}`
                    axios.delete(url)
                    .then(res=>{
                        this.showResponseMsg(res.data.msg)
                        setTimeout(()=>{this.getPayment()},500)
                            })
                    .catch((err)=>{
                        this.res_status = `<span class="alert alert-danger">
                        ${Object.values(err.response.data.errors).join()}</span>`
                            })
                }else{
                    this.getPayment()
                }
            },
            showResponseMsg(msg){
                this.res_status = msg
            },
        },
}
</script>
