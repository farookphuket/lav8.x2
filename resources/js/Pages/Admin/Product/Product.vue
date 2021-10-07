<template>

    <div class="card mb-4">
        

            <div class="card-header">
                <h1 class="mt-4">product {{pd_count}}</h1>
            </div>

        <product-form :category="category" :res_status="res_status" 
        :editId="editId" @showResponseMessage="showResponseMessage($event)" 
        @getProduct="getProduct($event)"></product-form>
        <p class="mt-4 mb-4">&nbsp;</p>

        <product-list :products="products" :showPagination="showPagination" 
        @del="del($event)" @edit="edit($event)" @getProduct="getProduct($event)"
        @showProduct="showProduct($event)"></product-list>
    </div>
</template>

<script>
import ProductList from './ProductList.vue'
import ProductForm from './ProductForm.vue'
export default{
    name:"ManProduct",
    props:["user_id","category"],
             components:{
                 ProductList,
                 ProductForm,
             },
             data(){
                 return{
                     products:'',
                     pd_count:0,
                     showPagination:false,
                     editId:0,
                     res_status:'',
                 }
             },
             mounted(){
                 this.getProduct()

             },
methods:{
            getProduct(page){
                this.res_status = ''
                this.editId = 0
                let url = ""
                    if(page){
                        url = page
                        this.$cookies.set("a_product_old_page",url)
                    }
                    url = this.$cookies.get("a_product_old_page")
                    if(!url) url = `/admin/getProduct`
                    axios.get(url)
                        .then(res=>{
                            this.products = res.data.product
                            this.pd_count = res.data.product.total
                            if(this.products.total > this.products.per_page){
                                this.showPagination = true
                            }
                })
            },
            showProduct(id){
                let url = `/admin/product/${id}`
                location.href=url
            },
            edit(id){
                this.editId = id
                this.res_status = `<span class="alert alert-info">
                Editing id ${id}...</span>`
            },
            del(id){
                    if(confirm(`this will remove the product id ${id} are you sure?`) == true){
                        let url = `/admin/product/${id}`
                        axios.delete(url)
                        .then(res=>{
                            this.res_status = res.data.msg
                                })
                    }

                    setTimeout(()=>{
                        this.res_status = ''
                        this.getProduct()
                            },2500)
            },
            showResponseMessage(msg){

                this.res_status = msg

            },
        },
}
</script>
