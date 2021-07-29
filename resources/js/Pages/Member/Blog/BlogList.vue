<template>

    <div>
       <div v-for="bl in blogs.data" 
           class="card-body">
        
           <h3>
                <a href="" title="click to read more"
                    @click.prevent="$emit('show',bl.slug)">
                    {{bl.title}}
                    <b-icon icon="eye"></b-icon>
                </a>
                
           </h3>
           <p>{{bl.slug}}</p>
           <div v-html="bl.excerpt">{{bl.excerpt}}</div>
           <div class="clearfix mb-4">
               <div class="float-left" 
                    v-if="user_id == bl.user.id"
                   >
                   <span class="alert alert-success" 
                       v-if="bl.is_public == '1'">
                        <b-icon icon="unlock"></b-icon>
                   </span>
                   <span class="alert alert-warning" v-else>
                        <b-icon icon="lock"></b-icon>
                   </span>
               </div>
               <!-- === tags -->
               <div>

                    <span style="magin-top:1.3em;">
                        <ul style="text-decoration:none;">
                            <li v-for="ta in bl.tags" 
                                style="display:inline-block;
                                padding:2px;"
                                >
                                    <span style="font-weight:bold;
                                        color:blue;margin:1em;">
                                    <b-icon icon="tags"></b-icon>
                                    {{ta.tag_name}}
                                    </span>
                                </li>

                        </ul>
                    </span>

                    <div class="float-right">
                        category :
                        <span class="badge badge-info p-2" 
                            v-for="ca in bl.category">
                            {{ca.cat_title}}
                        </span>
                    </div>

               </div>
               <!-- === tags end -->

               <div class="row">
                    <div class="col-md-4">
                        <div v-if="bl.created_at == bl.updated_at">

                            <span>
                                <a href="#" :title="moment(bl.created_at)">
                                    <b-icon icon="calendar2-day"></b-icon>
                                    {{moment(bl.created_at).fromNow()}}
                                </a>
                            </span>
                        </div>
                        <div v-else>
                            <span>
                                <a href="#" :title="moment(bl.created_at)">
                                    <b-icon icon="calendar2-day"></b-icon>
                                    {{moment(bl.created_at).fromNow()}}
                                </a>
                            </span>
                            last update
                            <span>
                                <a href="#" :title="moment(bl.updated_at)">
                                    <b-icon icon="calendar2-day"></b-icon>
                                    {{moment(bl.updated_at).fromNow()}}
                                </a>
                            </span>
                        </div>
                    </div><!-- end of div.col-md-4 show edit time -->

                    <div class="col-md-8">
                        <div class="btn-group float-left">
                            <span class="badge badge-info p-2 mr-2">
                                <b-icon icon="chat-left-text"></b-icon>
                                {{bl.comment_count}}
                            </span>
                            <span class="badge badge-info p-2">
                                <b-icon icon="eye"></b-icon>
                                {{bl.read_count}}
                            </span>
                        </div>
                        <div class="btn-group float-right">

                            <span v-if="user_id == bl.user.id">
                                <button class="btn btn-outline-primary" 
                                    @click.prevent="$emit('edit',bl.id)">
                                    <b-icon icon="pen"></b-icon>
                                </button>
                                <button class="btn btn-outline-danger" 
                                    @click.prevent="$emit('del',bl.id)">
                                    <b-icon icon="trash" variant="danger"></b-icon>
                                </button> 
                                <b-icon icon="person"></b-icon>
                                {{bl.user.name}}
                            </span>
                            <span v-else>
                                <b-icon icon="person"></b-icon>
                                {{bl.user.name}} 
                            </span>
                        </div><!-- end of div.btn-group -->

                    </div><!-- end of div.col-md-8 show edit button -->
               </div><!-- end of div.row -->

           </div>
           <hr style="width:80%;border:2px solid #e7e7e7;
           margin:auto;">

           
       </div>

       <!-- pagination -->


          <div class="col-xl-12" v-show="blogs.data != 0">

                <div class="nav-scroller py-1 mb-2">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap">
                            <li class="page-item disabled">
                                <div class="page-link">
                                    showing from {{blogs.from}}
                                    to <span>{{blogs.to}}</span> of
                                    <span>{{blogs.total}}</span>
                                </div>
                            </li>
                            <li class="page-item" v-for="li in blogs.links">
                                <a class="page-link p-2" href="" v-html="li.label"
                                    v-if="!li.active && li.url != null"
                                    @click.prevent="$emit('getBlogs',li.url)">
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
                                    {{blogs.current_page}}
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
          </div>
    </div>
</template>

<script>
var moment = require('moment')
export default{
    name:"BlogList",
    props:["blogs"],
    data(){
        return{
            moment:moment,
            user_id:window.user_id,
        }
    },
}
</script>
