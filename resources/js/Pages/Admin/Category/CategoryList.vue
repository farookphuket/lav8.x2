<template>
    <div class="card pt-4 mb-4">
        <div class="card-header">
            <h2 class="card-title text-center">
                Category List
            </h2>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item" v-for="ct in category.data">
                    <div class="container">
                        <p>{{ct.cat_title}}</p>
                    </div>
                </li>
            </ul>

            <!-- ======= pagination ======= -->
            <div  
                style="margin-top:3em;" class="container " 
                 v-show="showP"               
                 >
                <div class="nav-scroller py-1 mb-2">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap ">
                            <li class="page-item">
                                <div class="page-link disabled ">
                                    
                                        showing from <span>{{category.from}}</span> 
                                        to <span>{{category.to}}</span> of 
                                        <span>{{category.total}}</span>
                                    
                                </div>
                            </li>
                            <li class="page-item" v-for="li in category.links">

                                    <a class="page-link p-2" 
                                        v-if="!li.active && li.url != null" 
                                        @click.prevent="$emit('getCategory',li.url)"
                                        v-html="li.label">
                                        {{li.label}} 
                                    </a>
                                    <span class="page-link active" 
                                        v-html="li.label" v-else>
                                        {{li.label}}
                                    </span>

                            </li>
                            <li class="page-item active">
                                <div class="page-link">
                                    <span>
                                        <b-icon icon="book-half"></b-icon>
                                        {{category.current_page}}
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <!-- ======== End pagination ==== -->
        </div>
    </div>
</template>
<script>
var moment = require('moment')
export default{
    name:"CategoryList",
    props:["category","showP"],
    data(){
        return{
            moment:moment,
        }
    },
    mounted(){

    },
}
</script>
