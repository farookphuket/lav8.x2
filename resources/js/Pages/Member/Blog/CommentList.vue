<template>
    
    <div class="review-item-wrapper">
        <div class="review-item pt-60 mb-30" 
            v-for="co in comments.data">
            <div class="media">
                <div class="info mr-4">
                    <h4 class="">
                        {{co.user.name}} 
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

                <div class="nav-scroller py-1 mb-2 mt-4" v-show="showPagination">
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
</template>


<script>
var moment = require("moment")
export default{
    name:"CommentList",
    props:["comments","blog_id","slug","showPagination"],
    data(){
        return{
            moment:moment
        }
    },

}
</script>
