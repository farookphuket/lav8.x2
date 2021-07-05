<template>
    
    <div class="review-item-wrapper">
        <div class="review-item pt-60 mb-30" 
            v-for="co in comments.data">
            <div class="media">
                <div class="info">
                    <h4 class="">{{co.name}} " 
                    </h4>
                </div>
                <div class="rating">
                    <div class="float-right">
                        <span>{{moment(co.created_at).fromNow()}}</span>
                    </div>
                </div>
            </div>
            <h3 class="text-center">{{co.comment_title}}</h3>
            <div v-html="co.comment_body">
                {{co.comment_body}}
            </div>
        </div>
        <div class="col-lg-12">

                <div class="nav-scroller py-1 mb-2">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap">
                            <li class="page-item disabled">
                                <div class="page-link">
                                    showing from {{comments.from}}
                                    to <span>{{comments.to}}</span> of
                                    <span>{{comments.total}}</span>
                                </div>
                            </li>
                            <li class="page-item" v-for="li in comments.links">
                                <a class="page-link p-2" href="" v-html="li.label"
                                    v-if="!li.active && li.url != null"
                                    @click.prevent="$emit('getComments',li.url)">
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
                                    {{comments.current_page}}
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
        </div>
    </div>
</template>


<script>
var moment = require("moment")
export default{
    name:"CommentList",
    props:["comments","blog_id","slug"],
    data(){
        return{
            moment:moment
        }
    },

}
</script>
