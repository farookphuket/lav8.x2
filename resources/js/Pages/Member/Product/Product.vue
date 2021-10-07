<template>
    <div class="container-fluid">

        <div class="row">
            <div class="col-lg-12">
                <div class="btn-group float-right">
                    <button class="btn btn-outline-primary" 
                    @click="showProductForm=true" v-if="showProductForm == false">
                        <b-icon icon="file-plus"></b-icon>
                        New Product
                    </button>
                    <button class="btn btn-outline-danger" 
                    @click="showProductForm = false" v-else>
                        <b-icon icon="x-circle"></b-icon>
                    </button>
                </div>
            </div>
        </div>
        <p class="mt-4">&nbsp;</p>
        <category-list></category-list>

        <p class="mt-4">&nbsp;</p>
        <product-form v-show="showProductForm" :category="category" 
        @getProduct='getProduct($event)' :editId="editId" 
        :res_status="res_status" 
        @showResponseMessage="showResponseMessage($event)"></product-form>

        <div class="col-lg-12">
            <p class="mt-4 mb-4">&nbsp;</p>
        </div>
        <product-list :user_id="user_id" :product="product" 
        @edit="edit($event)" @del="del($event)"  
        :showPagination="showPagination"
        @show="openMe($event)" @getProduct="getProduct($event)"></product-list>


        <!-- res_status START =========================================== -->
        <b-modal ref='onOk' :title='md_title' ok-only>
            <div class="container">
                <span v-html="res_status">{{res_status}}</span>
            </div>
        </b-modal>
        <!-- res_status END =========================================== -->
    </div>
</template>

<script>

import CategoryList from './CategoryList.vue'
import ProductList from './ProductList.vue'
import ProductForm from './ProductForm.vue'
import ProductOrderForm from './ProductOrderForm.vue'

export default{
    name:"MemberProduct",
             components:{
                 CategoryList,
                 ProductList,
                 ProductForm,
                 ProductOrderForm,
             },
             props:["user_id","category"],
                   mounted(){
                       this.getProduct()
                   },
                   data(){
                       return{
                           product:[],
                           showProductForm:false,
                           showPagination:false,
                           res_status:'',
                           md_title:'Server said : ',
                           editId:0,
                       }
                   },
methods:{
            getProduct(page){
                this.res_status = ''
                this.showPagination = false
                let url = ''
                    if(page){
                        url = page
                        this.$cookies.set('m_old_product_page',url)
                    }
                    url = this.$cookies.get('m_old_product_page')
                    if(!url) url = `/member/getProduct`
                    axios.get(url)
                        .then(res=>{
                            this.product = res.data.product
                            if(Object.keys(this.product.data).length >= 10) this.showPagination = true
                                })

            },
            openMe(id){
                window.location.href=`/member/product/${id}`
            },
            edit(id){
                this.editId = id
                this.showProductForm = true
                this.res_status = `<span class="alert alert-info">
                editing product id ${id}</span>`
            },
            del(id){
                if(confirm(`will remove the product id ${id}`) == true){
                    let url = `/member/product/${id}`
                    axios.delete(url)
                    .then(res=>{
                        this.res_status = res.data.msg
                            })
                    .catch((err)=>{
                        this.res_status = `<span class="alert alert-danger">
                        ${Object.values(err.response.data.errors).join()}
                        </span>`
                            })
                }else{
                    this.getProduct()
                }
            },
            showResponseMessage(msg){
                this.res_status = msg
                
            },
            showBox(msg){
                this.res_status = msg 
                this.$refs["onOk"].show()
            },
            closeBox(){
                this.res_status = ''
                this.$refs['onOk'].hide()
            },
        },
}
</script>
