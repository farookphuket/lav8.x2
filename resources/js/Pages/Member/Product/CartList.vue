<template>
    <div class="container">

        <form action="">
            <div class="row" v-for="p1 in my_cart.data">
                <div class="col-lg-4">
                    <span v-for="pic in p1.product" 
                    style="margin:0 auto;min-height:250px;">
                       <img :src="pic.product_pic_absolute_path" 
                       class="responsive" style="display:block;max-height:250px;" alt="">
                       <p class="text-center pt-2">{{pic.product_pic}}</p>
                    </span>
                </div>
                <div class="col-lg-8">
                    <span>order quantity (จำนวน){{p1.order_quantity}} = {{getSumPrice(p1.order_unit_price,p1.order_quantity)}} </span>
                    <div v-for="inf in p1.product">
                        {{inf.product_title}} - {{inf.product_pic}} 
                    </div>
                </div>

                <div class="col-lg-4">
                    <span>{{p1.order_unit_price}} x {{p1.order_quantity}} = {{getSumPrice(p1.order_unit_price,p1.order_quantity)}}</span>
                </div>
                <div class="col-lg-8">
                    <div class="float-right">
                        <button class="btn btn-outline-danger" @click.prevent="$emit('removeFromMyCart',{cart_id:p1.id,product_id:p1.product_id})">
                            <b-icon icon="trash"></b-icon>
                        </button>
                    </div>
                </div>
                <div class="mt-4">&nbsp;</div>
            </div>
            <div class="row">
                <div class="col-lg-12" v-show="isShow">
                    <!-- show total price in table START -->
                    <div class="table-responsive" v-show="isShow">
                        <table class="table table-striped">
                            <thead>
                                <th>
                                    Quantity(จำนวนรวม)
                                </th>
                                <th>total price (ราคารวม)</th>
                            </thead>
                            <tbody>
                                
                                <tr>
                                    <td>
                                        {{my_cart_item}}
                                    </td>
                                    <td>{{all_cart_price}}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <!-- show total price in table END -->

                </div>
                
                <p class="mt-4 mb-4">&nbsp;</p>
                <payment-list 
                @selectPayment="selectPayment($event)"
                ></payment-list>
                <p class="mt-4">&nbsp;</p>
                <address-form :editId="my_shipping_address_id" 
                :isDisabled="true" :isCartPage="true"></address-form>
                <div class="col-lg-4">
                    <span v-html="res_status">{{res_status}}</span>
                </div>
                <div class="col-lg-8">
                    <div class="float-right" v-show="isShow">
                        <button class="btn btn-outline-primary"  
                        type="submit" @click.prevent="purchaseMyOrder">
                            purchase
                        </button>
                    </div>
                </div>
            </div><!-- end of div.row v-for cart list --> 
        </form>

    </div>
</template>

<script>

import AddressForm from "../../AddressForm.vue"
import PaymentList from "./PaymentList.vue"
export default{
    name:"CartList",
    props:["my_cart","all_cart_price","my_cart_item","isShow","user_id"],
    components:{
        AddressForm,
        PaymentList,
    },
watch:{
          "my_cart":function(cx){
              this.getMyCartId(cx)
          }
      },
    data(){
        return{
            res_status:'',
            all_my_order:0,
            my_cart_id:0,
            payment_method_id:0,
            my_cal_price:0,
            my_shipping_address_id:0,
            payments:''
        }
    },
    mounted(){
        this.getMyShippingAddressList()
        this.getPayment()
    },

methods:{

            getSumPrice(price,quantity){
                return price*quantity
            },
            getMyShippingAddressList(){
                let url = `/member/getmydefaultshippingaddress`
                axios.get(url)
                .then(res=>{

                        let fData = res.data.address
                        if(fData || fData != null){
                            this.my_shipping_address_id = fData.id
                        }
                    })
            },
            getMyCartId(cData){
                this.my_cart_id = []
                cData.data.forEach((c)=>{
                    console.log(c)
                    this.my_cart_id.push(c.id)
                        })
            },
            purchaseMyOrder(){
                let url = `/payment`
                let submitData = {
                    payment_method_id:this.payment_method_id,
                }

                axios.post(url,submitData)
                    .then(res=>{
                        console.log(res.data.msg)
                            })
            },
            getPayment(){
                let url = `/getpayment`
                axios.get(url)
                .then(res=>{
                    this.payments = res.data.payments
                        })
            },
            selectPayment(id){
                alert(`the id ${id}`)
                this.payment_method_id = id
            },

        },
}
</script>
