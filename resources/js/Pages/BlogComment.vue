<template>
<div class="review-item-wrapper">

    <!-- START comment ITEM ===== -->
    <div class="review-item" v-for="co in comments.data">
        <div class="media">
            <div class="info">
                <h5 class="mb-30">
                    {{co.comment_title}}
                </h5>
                <div class="rating">
                    <span>
                        <b-icon icon="person"></b-icon>
                        {{co.name}}
                    </span> &middot;
                    <span>
                        <b-icon icon="calendar-day"></b-icon>
                        <a href="#" :title="moment(co.created_at)">
                            {{moment(co.created_at).fromNow()}}
                        </a>

                    </span>
                </div>
            </div>
        </div>
        <div v-html="co.comment_body" style="margin-bottom:4em;">{{co.comment_body}}</div>
        <hr>
        
    </div>
    <!-- End of comment ITEM ===== -->

          <div class="col-xl-12" v-show="comments.data != 0">

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
                                    @click.prevent="getComments(li.url)">
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
var moment = require('moment')
export default{
    name:"PubComment",
    props:["blog_id"],
    data(){
        return{
            comments:[],
            moment:moment,
            old_blog_id:'',
        }
    },

    mounted(){
        this.old_blog_id = this.$cookies.get("cook_blog_id")
        if(this.old_blog_id != this.blog_id){
            this.$cookies.remove('pcomment_old_page')
            //console.log(`this old is ${this.old_blog_id} the cur is ${this.blog_id}`)
        }
        this.getComments()
    },
    methods:{
        getComments(page){
            let url = ''
            if(page){
                url = page+'&blog_id='+this.blog_id
                this.$cookies.set("pcomment_old_page",url)
                this.$cookies.set("cook_blog_id",this.blog_id)
            }
            url = this.$cookies.get('pcomment_old_page')
            if(!url){
                url = `/getComments?blog_id=${this.blog_id}`
            }
            axios.get(url)
                .then(res=>{
                    this.comments = res.data.comments
                })

        }
    },
}

</script>
