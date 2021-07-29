<template>
    <div class="left-wrapper">
        <div class="feature-style-6 bg-white pt-0 pb-60">
            <div class="row">
                <div class="col-lg-12 pt-2" 
                    v-for="bl in blogs.data">
                        <div class="content">
                            <h5>
                                <a href="#" 
                                    :title="bl.title" 
                                    @click.prevent="$emit('openMe',bl.slug)">
                                    {{sTitle.smartTitle(bl.title,25)}}</a>
                                <span>
                                    <b-icon icon="person"></b-icon>
                                    {{bl.user.name}}
                                </span>
                            </h5>
                            <div v-html="bl.excerpt">
                            {{bl.excerpt}}
                            </div>

                            <div class="row">
                                <div class="col-lg-8">
                                    <p>{{bl.slug}}</p>
                                </div>
                                <div class="col-lg-4">
                                    <div class="float-right">
                                        <span v-for="ta in bl.tags" 
                                            style="padding-right:1em;
                                            font-weight:bold;color:blue;">
                                            <b-icon icon="tags"></b-icon>
                                            {{ta.tag_name}}
                                        </span>
                                    </div>

                                </div>
                                <!-- category -->
                                <div class="col-lg-4">
                                    category
                                    <span v-for="ca in bl.category" 
                                        class="badge badge-primary pt-2">
                                        <b-icon icon="bookmark-check"></b-icon>
                                        {{ca.cat_title}}
                                    </span>
                                    <!-- category -->
                                </div>

                                <div class="col-lg-4">

                                    created :
                                    <span class="badge badge-info p-2">
                                        <a href="" class="text-white" 
                                        :title="moment(bl.created_at)">
                                            <b-icon icon="calendar2-day"></b-icon>
                                            {{moment(bl.created_at).fromNow()}}
                                        </a>
                                    </span>
                                    <span v-if="bl.created_at != bl.updated_at" 
                                    class="">
                                        updated :
                                        <a href="" class="" 
                                        :title="moment(bl.updated_at)">
                                            <b-icon icon="calendar2-day"></b-icon>
                                            {{moment(bl.updated_at).fromNow()}}
                                        </a>
                                    </span>
                                </div><!-- end of div.col-lg-4 show date -->
                                
                                <div class="col-lg-4">
                                    <div class="float-right btn-group">
                                        <span class="badge badge-info p-2">
                                            <b-icon icon="eye"></b-icon>
                                            {{bl.read_count}}

                                        </span>

                                        <span class="badge badge-primary p-2">
                                            <b-icon icon="chat-right-text"></b-icon>
                                            {{bl.comment_count}}

                                        </span>
                                        <button @click.prevent="$emit('openMe',bl.slug)"
                                        class="btn btn-outline-info p-2">
                                            Read More...
                                        </button>
                                    </div><!-- end of div.btn-group -->
                                </div><!-- end of div.col-lg-4 show button -->
                            </div>
                        </div>
                    <hr style="margin-top:2em;margin-bottom:2em;">
                    
                </div>
            </div>
            <!-- =====nav ===-->

            <!-- ======= pagination ======= -->
                <div class="nav-scroller py-1 mb-2" v-show="showPagination">
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
            <!-- ======== End pagination ==== -->
            <!-- =====END === -->

        </div>
    </div>
</template>

<script>
var moment = require("moment")
export default{
    name:"BlogList",
    props:["blogs","showPagination"],
    data(){
        return{
            sTitle:new CustomText(),
            moment:moment,
        }
    },
}
</script>
