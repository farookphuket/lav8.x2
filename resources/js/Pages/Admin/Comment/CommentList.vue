<template>
    <div class="card mb-4">

        <div class="card-body" v-for="co in comments.data">
            <h3 >{{co.comment_title}}</h3>
            <ul class="list-group">

                <li class="list-group-item">
                    <a href="#" :title="bl.title" v-for="bl in co.blogs" 
                    @click.prevent="$emit('openBlog',bl.slug)">
                       <span >
                        {{bl.title}}
                        <b-icon icon="arrow-up-right"></b-icon>
                       </span>
                    </a>
                    <span >
                        <b-icon icon="person"></b-icon>                        
                        {{co.user.name}} &middot; 
                        <b-icon icon="calendar2-day"></b-icon>
                        {{moment(co.created_at)}}
                    </span>
                    <span class="float-right">
                        <a href="" 
                            :title="moment(co.created_at)">
                            {{moment(co.created_at).fromNow()}}
                        </a> 
                        <a href="" v-if="co.created_at != co.updated_at">
                            &middot; replies {{moment(co.updated_at).fromNow()}}
                        </a>
                        <button class="btn btn-outline-primary" 
                            @click.prevent="$emit('edit',co.id)">
                            <b-icon icon="pen"></b-icon>
                        </button>
                    </span>
                </li>
                <li class="list-group-item" 
                    v-html="co.comment_body">
                    {{co.comment_body}}
                </li>

            </ul>
        </div>
    </div>
</template>



<script>
var moment = require('moment')
export default{
    name:"CommentList",
    props:["comments"],
    data(){
        return{
            moment:moment,
        }
    },
    
}
</script>
