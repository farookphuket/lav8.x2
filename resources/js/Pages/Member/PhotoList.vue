<template>
    <div>
        <hr>
        
        <div class="row">
            <div class="col-md-3 pt-2 p-2" 
                v-for="pi in photos.data">
                <div class="card">
                    <a :href="pi.url" target="_blank" :title="pi.title">
                        <img :src="pi.url" class="responsive" alt="" 
                        style="min-height:220px;max-height:250px">
                    </a>
                    <div class="card-body">
                        <p>
                            <span>
                                <b-icon icon="camera"></b-icon>
                                {{s_title.smartTitle(pi.title,9)}}
                            </span>
                        </p>
                        <span>
                            <b-icon icon="person"></b-icon>
                            {{pi.user.name}}
                        </span>
                        <span>
                            <b-icon icon="clock-history"></b-icon>
                            {{moment(pi.created_at).fromNow()}}
                        </span>
                        <div class="clearfix">
                            <div class="float-right" v-if="ownId == pi.user.id">
                                <button class="btn btn-outline-primary btn-sm" 
                                    @click.prevent="$emit('editPic',pi.id)">
                                    <b-icon icon="pen"></b-icon>
                                    </button>
                                    
                                <button class="btn btn-outline-danger btn-sm" 
                                    @click.prevent="$emit('delPic',pi.id)">
                                    <b-icon icon="trash"></b-icon>
                                    </button>
                            </div>
                        </div>
                    </div><!-- === end of div.card-bory === -->
                </div><!-- end of div.card -->
            </div>
            <div class="col-lg-12 pt-2 mb-2">&nbsp;</div>
            <div class="col-lg-12" v-show="photos.data != 0">
                <div class="nav-scroller py-1 mb-2">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap">
                            <li class="page-item disabled">
                                <div class="page-link">
                                    showing from {{photos.from}} 
                                    to <span>{{photos.to}}</span> of 
                                    <span>{{photos.total}}</span>
                                </div>
                            </li>
                            <li class="page-item" v-for="li in photos.links">
                                <a class="page-link p-2" href="" v-html="li.label" 
                                    v-if="!li.active && li.url != null" 
                                    @click.prevent="$emit('getPhotos',li.url)">
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
                                    {{photos.current_page}}
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div><!-- end of div.col-lg-12 -->
        </div><!-- end of div.row -->
    </div>
</template>

<script>
var moment = require('moment')
export default{
    name:"PhotoList",
    props:["photos"],
    data(){
        return{
            s_title:'',
            moment:moment,
            ownId:window.ownId
        }
    },
    mounted(){
        this.s_title = new CustomText()
    },
}
</script>
