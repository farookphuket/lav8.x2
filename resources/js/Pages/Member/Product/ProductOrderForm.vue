<template>
    <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    
                    <form action="" class="form-horizontal">

                        <div class="form-group">

                            <label for="">Quantity(จำนวน)</label>
                            <input v-model="orderForm.quantity" 
                            class="form-control" @change.prevent="getTotalPrice"
                            type="number" name="product_quantity" 
                            :disabled="isDisabled" >
                            <input type="hidden" name="product_id" 
                            v-model="orderForm.product_id" >
                        </div>
                        <div class="form-group">
                            <div class="btn-group float-right" 
                            v-if="user_id == product.user.id">
                                <p class="alert alert-warning p-2">
                                    you're own "{{product.product_title}}".
                                </p>
                            </div>
                            <div class="btn-group float-right" v-else>
                               <button class="btn btn-outline-primary" 
                               @click.prevent="saveToMyCart(my_cart_id)" type="submit"
                               >
                                   <b-icon icon="cart-plus"></b-icon>
                               </button>
                            </div>
                            <div class="float-left mr-4">
                                <span v-html="res_status" class="mr-4 p-2">
                                    {{res_status}}
                                </span>
                            </div>
                        </div>
                    </form><!-- order form END -->



                </div><!-- End of div.col-lg-8  order form wrapper -->

                <div class="col-lg-4">
                    <p class="ml-4">
                        Total price : 
                        <span class="badge-info p-2">
                            {{total_price}}
                        </span> 
                    </p>
                </div>

                
            </div><!-- end of div.row -->

    </div>
</template>

<script>

export default{
    name:"ProductOrderForm",
    props:["user_id","product","my_cart"],
             data(){
                 return{
                    isDisabled:false,
                    price:0,
                    total_price:0,
                    cart_url:'',
                    res_status:'',
                    my_cart_id:0,
                    items_in_my_cart:[],
                    my_product_id:'',
                    orderForm:new Form({
                            product_id:0,
                            order_unit_price:0,
                            order_total_price:0,
                            quantity:1,
                                  })
                 }
             },
             mounted(){
                 this.checkUser()
                 this.price = this.product.product_price
                 this.total_price = this.price
                 this.isItemInMyCart()

                // get the product id in the form model
                this.orderForm.product_id = this.product.id
                this.orderForm.order_unit_price = this.price
             },
methods:{
            checkUser(){
                if(this.user_id == this.product.user.id) this.isDisabled = true

            },
            getTotalPrice(){
                let total = this.price*this.orderForm.quantity
                this.total_price = total
            },
            isItemInMyCart(){
                this.res_status = ''
                this.my_cart_id = 0

                let get_my_cart_url = `/member/getMyCart`
                axios.get(get_my_cart_url)
                .then(res=>{
                    this.items_in_my_cart = res.data.my_cart.data

                    //console.log(this.items_in_my_cart)
                    this.items_in_my_cart.forEach((ca)=>{
                            ca.product.forEach((pd)=>{
                                //console.log(pd)
                                if(pd.id == this.product.id){
                                    this.orderForm.quantity = ca.order_quantity
                                    this.total_price = ca.order_quantity*this.price
                                    
                                        // this item is in my cart
                                        this.my_cart_id = ca.id
                                        // update cart 
                                        this.cart_url = `/member/cart/${this.my_cart_id}`
                                    }
                            })
                    })
                })

            },
            saveToMyCart(my_cart_id){
                //alert(`my id is ${my_cart_id}`)
                    if(my_cart_id == 0){
                        this.cart_url = `/member/cart`
                        this.orderForm.submit('post',this.cart_url)
                            .then((res)=>{
                                this.res_status = res.msg
                                    })
                    }else{
                        //alert(`update ${my_cart_id} to url ${this.cart_url}`)
                        this.orderForm.submit('put',this.cart_url)
                            .then((res)=>{
                                this.res_status = res.msg
                                    })
                    }
                    setTimeout(()=>{
                        this.isItemInMyCart()
                            },2500)
            },

        },
}
</script>
