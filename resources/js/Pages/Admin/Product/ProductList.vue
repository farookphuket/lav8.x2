<template>
    <div class="card-body">
        <div class="row">
            <div class="col-lg-4 mt-2 mb-2" v-for="pd in products.data">

                <span class="badge badge-info p-2 mb-2">
                    {{pd.product_title}}
                </span>
                <!-- show product thumbnail -->
                <div style="min-height:300px;max-width:300px;"
                    class="text-center">
                    <img class="responsive d-block mx-auto" 
                    :src="pd.product_pic_absolute_path" 
                    style="max-height:280px;" 
                    :alt="pd.product_title">
                </div>
                <!-- show product thumbnail -->

                <!-- button -->
                <div class="clearfix">
                    <div class="float-left">
                        <span class="badge badge-info p-2">
                            {{pd.user.name}}
                        </span>
                        <span class="badge badge-info p-2 mr-2">
                            {{pd.product_price}}
                        </span>
                    </div>
                    <div class="btn-group float-right">
                        <span class="badge badge-success mr-2 ml-2 p-2" 
                        v-if="pd.is_sale != 0">
                            Sale
                        </span>
                        <span class="badge badge-warning p-2 mr-2 ml-2" v-else>
                            Not Sale
                        </span>
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
                <!-- button -->
            </div>

            <!-- pagination START -->
            <div class="col-lg-12">
                
                <div class="nav-scroller py-1 mb-2 mt-4" v-show="showPagination">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap">
                            <li class="page-item disabled">
                                <div class="page-link">
                                    showing from {{products.from}}
                                    to <span>{{products.to}}</span> of
                                    <span>{{products.total}}</span>
                                </div>
                            </li>
                            <li class="page-item" v-for="li in products.links">
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
                                    {{products.current_page}}
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <!-- pagination END -->

        </div><!-- end of div.row wrapper -->
    </div>
</template>

<script>
export default{
    name:"ProductList",
    props:["products","showPagination"],
    data(){
        return{
            call_pagin:0,
            isLastPage:false,
        }
    },
}
</script>
