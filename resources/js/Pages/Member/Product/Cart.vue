<template>
    <div class="container-fluid">
        <cart-list :my_cart="my_cart" :user_id="user_id" 
        :all_cart_price="all_cart_price" :my_cart_item="my_cart_item"
        @removeFromMyCart="removeFromMyCart($event)" :isShow="isShow"></cart-list>

        <div class="mt-8" v-show="showStatus">
            <span v-html="res_status">{{res_status}}</span>
            
            <div class="float_status">
                <p>
                    this fdfdfd this kskf verufldkfld skcslckslcls ha ha
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import CartList from "./CartList.vue"
export default{
    name:"MyCart",
    props:["user_id"],
             components:{
                 CartList,
             },
             data(){
                 return{
                     my_cart:[],
                     my_cart_item:0,
                        all_cart_price:0,
                        items_set_price:[],
                        item_price:0,
                        item_quantity:0,
                        item_order_total_price:0,
                       res_status:'', 
                       showStatus:false,
                       isShow:false,
                 }
             },
             mounted(){
                this.getMyCart()


             },
methods:{
            getMyCart(page){
                this.setEmpty()
                this.showStatus = true
                this.res_status = "thisfdf fdf";

                let url = ""
                    if(page){
                        url = page
                        this.$cookies.set("m_mycart_old_page",url)
                    }
                    url = this.$cookies.get("m_mycart_old_page")
                    if(!url) url = `/member/getMyCart`
                    axios.get(url)
                    .then(res=>{
                        this.my_cart = res.data.my_cart
                        this.my_cart_item = Object.keys(this.my_cart.data).length
                        //console.log(this.my_cart.data)
                        this.my_cart.data.forEach((pr)=>{
                            this.item_quantity = pr.order_quantity 
                            this.item_price = pr.order_unit_price
                            this.item_order_total_price = pr.order_unit_price*pr.order_quantity
                            this.items_set_price.push(this.item_order_total_price)
                            
                            const reducer = (a1=0,a2=0)=> a1+a2
                            this.all_cart_price = this.items_set_price.reduce(reducer)
                                })
                        if(this.my_cart_item != 0) this.isShow = true
                            this.res_status = "I am cool"
                            console.log(this.res_status)
                    })
            },
            removeFromMyCart({cart_id,product_id}){
                
                let url = `/member/cart/${cart_id}`
                axios.delete(url)
                .then(res=>{
                    this.showStatus = true
                    this.res_status = res.data.msg
                        })
                setTimeout(()=>{
                    this.getMyCart()
                        },2500)
            },
            setEmpty(){

                this.item_quantity = 0 
                this.item_price = 0
                this.items_set_price = []
                this.item_order_total_price = 0
                this.showStatus = false
                this.isShow = false
                this.all_cart_price = 0
                this.my_cart_item = 0
                this.res_status = ''
            },
        },

}
</script>
