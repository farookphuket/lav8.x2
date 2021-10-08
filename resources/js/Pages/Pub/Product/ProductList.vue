<template>
    <div class="row">
           <div class="col-lg-4" v-for="pd in product.data">
                <div class="clearfix">
                    <div class="float-left">
                        <span class="badge badge-info p-2">
                            <a href="" class="text-white" 
                            @click.prevent="getExchange(pd.product_price)">
                                {{pd.product_price}}
                            </a>
                        </span>        
                    </div>
                    <div class="float-right">
                        <button class="btn btn-outline-primary" 
                        @click.prevent="$emit('show',pd.id)">
                            <b-icon icon="eye"></b-icon>
                        </button>
                    </div>
                </div>
                <div class="text-center pt-4">

                    <a href="" @click.prevent="$emit('show',pd.id)">
                        <img class="rounded mx-auto d-block responsive" 
                        style="max-height:250px;"
                        :src="pd.product_pic_absolute_path" alt="">
                    </a>
                </div>
                <p class="text-center">{{pd.product_title}}</p>
           </div>

        <!-- pagination wrapper Start-->
          <div class="col-lg-12">
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
        <!-- pagination wrapper Start-->
    </div>
</template>
<script>
export default{
    name:"ProductList",
    props:["product","showPagination"],
    methods:{
        getExchange(price){
            let url = `https://google.com/search?q=${price}+thaibath+to+usd`
            window.open(url,"_blank")
        },
    },

}
</script>
