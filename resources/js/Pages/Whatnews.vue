<template>
<div class="row">
            <div class="float_status">this isn cmmc te
                <p>thisnf cmxlc shkdsj</p>
            </div>
        <div class="item" v-if="whatnews.data == 0">
            <div class="image">
                <img src="https://i.ibb.co/JBskcQ9/2021-04-15-laravel-X2-index.png" alt="NO DATA">
            </div>
            <div class="text-content">
                <h2>I don't have data now 🤘</h2>

                <p>if you want to be the first post please go ahead and </p>

                <div class="text-center view-all-btn">
                <a 
                class="main-btn btn-hover" 
                 href="/login"
                    title="login or register "> login/register</a> 
                </div>
            </div>
        </div>
        <div  
            class="mt-10" v-for="wn in whatnews.data" v-else>
            <!--
            <div class="image">
                <img src="https://i.ibb.co/JBskcQ9/2021-04-15-laravel-X2-index.png" alt="NO DATA">
                <div class="featured-button button">
                    <a href="#blog">Continue Reading</a>
                </div>
            </div>
            -->
            <div style="margin-top:2em;"
                class="text-content">
                <h4>{{wn.whatnew_title}}</h4>
                <div class="clearfix">
                    <div class="float-right">
                        <span>
                            <b-icon icon="person"></b-icon>
                            {{wn.user.name}}
                        </span> &nbsp;
                        <span>
                            <a href="#" :title="moment(wn.created_at)">
                                <b-icon icon="calendar2-date-fill"></b-icon>
                            </a>
                            {{moment(wn.created_at).fromNow()}}
                        </span> 
                    </div>
                </div>
                <div v-html="wn.whatnew_body">
                    {{wn.whatnew_body}}
                </div>
                <hr style="width:80%;color:#e7e7e7;text-align:center;
                margin-top:2em;">
                
            </div>
        </div>

            <!-- ======= pagination ======= -->
            <div style="margin-top:4em;"
                class="container " v-show="whatnews.data != 0">
                <div class="nav-scroller py-1 mb-2">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap ">
                            <li class="page-item">
                                <div class="page-link disabled ">

                                        showing from <span>{{whatnews.from}}</span>
                                        to <span>{{whatnews.to}}</span> of
                                        <span>{{whatnews.total}}</span>

                                </div>
                            </li>
                            <li class="page-item"
                                v-for="li in whatnews.links">
                                    <a class="page-link"
                                       style="padding:0.5em;"
                                        v-if="!li.active && li.url != null"
                                        @click.prevent="getWhatnew(li.url)"
                                        v-html="li.label">
                                        {{li.label}}
                                    </a>
                                    <span class="page-link active disabled"
                                       style="padding:0.5em;"
                                        v-html="li.label" v-else>
                                        {{li.label}}
                                    </span>
                            </li>
                            <li class="page-item active">
                                <div class="page-link">

                                        <b-icon icon="book-half"></b-icon>
                                        {{whatnews.current_page}}

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
    name:"PubWhatnews",
    data(){
        return{
            whatnews:[],
            moment:moment,
        }
    },
    mounted(){
        this.getWhatnew()
    },
    methods:{
        getWhatnew(page){
            let url =''
            if(page){
                url = page
                this.$cookies.set("pwhatnews_old_page",url)
            }
            url = this.$cookies.get("pwhatnews_old_page")
            if(!url){
                url = `/api/getWhatnew`
            }
            axios.get(url)
                .then(res=>{
                    //console.log(res.data.whatnews)
                    this.whatnews = res.data.whatnews
                })

        }
    }
}
</script>
