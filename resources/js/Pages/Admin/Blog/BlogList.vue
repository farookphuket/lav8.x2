<template>

    <div class="row">
        <div class="col-lg-12" style="margin-top:4em;">
            <ul>
                <li v-for="bl in blogs.data" 
                    style="text-decoration:none;display:block;">
                    <div>
                        <h6>
                            <a href="" @click.prevent="$emit('openMe',bl.slug)">
                            
                                {{bl.title}}
                            </a>
                            <span>
                                <b-icon icon="person"></b-icon>
                                {{bl.user.name}}
                            </span>
                        </h6>
                        <div class="clearfix">
                            <div class="float-right">
                                <span v-for="ta in bl.tags">
                                    <b-icon icon="tags"></b-icon>
                                    {{ta.tag_name}}
                                </span>
                                <span>
                                    <b-icon icon="calendar2-day"></b-icon>
                                    <a href="" :title="moment(bl.created_at)">
                                        {{moment(bl.created_at).fromNow()}}
                                    </a>
                                </span>
                                <button class="btn btn-outline-primary" 
                                    @click.prevent="$emit('edit',bl.id)">
                                    <b-icon icon="pen"></b-icon>
                                </button>
                                <button class="btn btn-outline-danger" 
                                    @click.prevent="$emit('del',bl.id)">
                                    <b-icon icon="trash"></b-icon>
                                </button>
                            </div>
                        </div>
                        <hr style="width:80%;border:2px dotted #ff0000;">
                        
                    </div>
                </li>
            </ul>
        </div>

            <!-- ======= pagination ======= -->
            <div 
                        style="margin-top:3em;"
                class="container " v-show="blogs.data != 0">
                <div class="nav-scroller py-1 mb-2">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap ">
                            <li class="page-item">
                                <div class="page-link disabled ">
                                    
                                        showing from <span>{{blogs.from}}</span> 
                                        to <span>{{blogs.to}}</span> of 
                                        <span>{{blogs.total}}</span>
                                    
                                </div>
                            </li>
                            <li class="page-item" v-for="li in blogs.links">

                                    <a class="page-link p-2" 
                                        v-if="!li.active && li.url != null" 
                                        @click.prevent="$emit('getBlogs',li.url)"
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
                                        {{blogs.current_page}}
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <!-- ======== End pagination ==== -->


    </div>
</template>



<script>
var moment = require('moment')
export default{
    name:"BlogList",
    props:["blogs"],
    data(){
        return{
            moment:moment
        }
    },

}
</script>
