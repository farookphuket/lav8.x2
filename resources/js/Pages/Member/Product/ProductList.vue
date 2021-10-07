<template>
    <div class="row">

        <!-- list of product START -->
        <div class="col-lg-4" 
        v-for="pd in product.data">

            <!-- is owner START -->
            <div class="row" v-if="pd.user_id == user_id">
                <div class="col-lg-4" >
                   <span class="badge badge-success p-2" 
                   v-if="pd.is_sale != 0">
                    Sale
                   </span>
                   <span class="badge badge-warning p-2"
                   v-else>
                    Not Sale
                   </span>
                </div>
                <div class="col-lg-8">
                    <div class="btn-group float-right">
                        <button class="btn btn-outline-primary" 
                        @click.prevent="$emit('edit',pd.id)">
                            <b-icon icon="pen"></b-icon>
                        </button>
                        <button class="btn btn-outline-danger" 
                        @click.prevent="$emit('del',pd.id)">
                            <b-icon icon="trash"></b-icon>
                        </button>
                    </div>
                </div>
            </div>
            <!-- is owner END -->
            <div class="row" v-else>
                <div class="col-lg-12">
                    <div class="btn-group float-right">
                        <button class="btn btn-outline-primary" 
                        @click.prevent="$emit('show',pd.id)">
                            <b-icon icon="eye"></b-icon>
                            view
                        </button>
                    </div>
                </div>
            </div>
                
            <div class="text-center mt-4 pt-2" 
            style="min-height:250px;">

                <img :src="pd.product_pic_absolute_path" :alt="pd.product_title" 
                class="responsive d-block mx-auto"
                style="max-height:250px;">
            </div>
            <p class="mt-2 text-center">
                {{pd.product_title}} 
                <span class="mr-4 ml-4 p-2 badge badge-info">
                    {{pd.product_price}}
                </span>
            </p>
        </div>
        <!-- list of product End -->
        

            <!-- pagination START -->
                <div class="nav-scroller py-1 mb-2 mt-4" v-show="showPagination">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap">
                            <li class="page-item disabled">
                                <div class="page-link">
                                    showing from {{product.from}}
                                    to <span>{{product.to}}</span> of
                                    <span>{{product.total}}</span>
                                </div>
                            </li>
                            <li class="page-item" v-for="li in product.links">
                                <a class="page-link p-2" href="" v-html="li.label"
                                    v-if="!li.active && li.url != null"
                                    @click.prevent="$emit('getProduct',li.url)">
                                    {{li.label}}
                                </a>
                                <span class="page-link active"
                                    v-html="li.label" v-else>
                                    {{li.label}}
                                </span>
                            </li>
                            <li class="page-item active">
                                <span class="page-link ">
                                    <b-icon icon="book-half"></b-icon>
                                    {{product.current_page}}
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
            <!-- pagination END -->
    </div>
</template>


<script>
export default{
    name:"ProductList",
    props:["product","user_id","showPagination"],
    data(){
        return{
            file:'',
            pic_name:'',
        }
    },


}
</script>
