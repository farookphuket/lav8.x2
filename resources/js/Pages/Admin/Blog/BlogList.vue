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
                        <div v-html="bl.excerpt">
                            {{bl.excerpt}}
                        </div>

                        <div class="row">

                            <!-- show category -->
                            <div class="col-lg-4 mt-4">
                                Category :
                                <span v-for="ca in bl.category" 
                                    class="badge badge-info p-2">
                                    <b-icon icon="bookmark-star"></b-icon>
                                    {{ca.cat_title}}
                                </span>
                            </div>
                            <!-- show category -->

                            <!-- show public status -->
                            <div class="col-lg-8">
                                <div class="float-right">
                                    <span>
                                        <b-icon icon="calendar2-day"></b-icon>
                                        create :
                                        <a href="" :title="moment(bl.created_at)">
                                            {{moment(bl.created_at).fromNow()}}
                                        </a>
                                        &middot;
                                        update :
                                        <a href="" :title="moment(bl.updated_at)">
                                            {{moment(bl.updated_at).fromNow()}}
                                        </a>
                                    </span>
                                    <span class="badge badge-success p-2" 
                                        v-if="bl.is_public != 0">
                                        <b-icon icon="unlock"></b-icon>
                                    </span>

                                    <span class="badge badge-warning p-2" 
                                        v-else>
                                        <b-icon icon="lock"></b-icon>
                                    </span>
                                </div>
                            </div>
                            <!-- show public status -->

                            <!--show comment count START    -->
                            <div class="col-md-8 mt-4 mb-4">

                                <span>
                                    <b-icon icon="chat-quote"></b-icon>
                                    {{bl.comments.length}} comment(s).
                                </span>
                            </div>
                            <!--show comment count END      -->

                            <!--show comment count START    -->
                            <div class="col-md-4 mt-4 mb-4">
                                <div class="float-right">
                                    <span >
                                        <b-icon icon="eye"></b-icon>
                                        {{bl.read_count}}
                                    </span>
                                </div>
                            </div>
                            <!--show comment count END      -->

                            <!-- show tags -->
                            <div class="col-md-4 mt-4">
                              <div>
                              Tags <b-icon icon="tags"></b-icon> :
                                <span class="mr-2" v-for="ta in bl.tags">
                                    {{ta.tag_name}}
                                </span>
                              </div>  
                            </div>
                            <!-- show tags -->
                            <!-- show button -->
                            <div class="col-md-8 mt-4 mb-4">
                                <div class="float-right">
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
                            <!-- show button -->
                        </div><!-- end of div.row -->
                        <hr style="margin-top:2em;
                        margin-bottom:2em;width:80%;border:2px dotted #ff0000;">
                        
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
