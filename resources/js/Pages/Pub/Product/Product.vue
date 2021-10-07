<template>
    <div>
        <product-list :product="product" @show="showProduct($event)" 
        :showPagination="showPagination" @getProduct="getProduct($event)">

        </product-list>
    </div>
</template>
<script>
import ProductList from './ProductList.vue'
export default{
    name:"PubProduct",
             components:{
                 ProductList,
             },
             data(){
                 return{
                     product:'',
                     showPagination:false,
                 }
             },
             mounted(){
                 this.getProduct()
             },
methods:{
            getProduct(page){
                this.showPagination = false 
                
                let url = ''
                    if(page){
                        url = page 
                        this.$cookies.set('p_product_old_page',url)
                    }
                    url = this.$cookies.get('p_product_old_page')
                    if(!url) url = `/getproduct`
                    axios.get(url)
                        .then(res=>{
                        this.product = res.data.product
                        if(this.product.total > this.product.per_page){
                            this.showPagination = true
                        }

                    })
            },
            showProduct(id){
                let url = `/product/${id}`
                location.href=url
            },
        },
}
</script>
