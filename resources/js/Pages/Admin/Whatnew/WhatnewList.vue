<template>
    <div class="card-body">
        <div class="row">
            <div class="col-lg-12">
                <ul class="list-group">
                    <li class="list-group-item"
                       v-for="wn in whatnew.data">
                        <div class="container">
                                <h3 class="text-center">
                                    {{wn.whatnew_title}}
                                </h3>
                                <div v-html="wn.whatnew_body" 
                                    style="margin-top:2em;margin-bottom:2em;">
                                    {{wn.whatnew_body}}
                                </div>
                                <div class="row">
                                    <div class="col-lg-8">
                                        <span>
                                            <b-icon icon="calendar2-day"></b-icon>
                                            {{moment(wn.created_at)}} &middot; 
                                            {{moment(wn.created_at).fromNow()}}
                                        </span>
                                    </div>
                                    <div class="col-lg-4">

                                        <span class="float-right btn-group">
                                            <button 
                                              @click.prevent="$emit('edit',wn.id)"
                                                class="btn btn-primary btn-sm">
                                                <b-icon icon="pen"></b-icon>
                                            </button>
                                            <button 
                                              @click.prevent="$emit('del',wn.id)"
                                                class="btn btn-danger btn-sm">
                                                <b-icon icon="trash"></b-icon>
                                            </button>
                                        </span>

                                        <span class="float-right"
                                            style="margin-right:1em;">
                                            <b-icon icon="person"></b-icon>
                                            {{wn.user.name}}
                                        </span>
                                    </div>
                                </div>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- =================== pagination path START =============== -->
            <div class="col-lg-12" style="margin:0 auto;margin-top:2em;">

                <div class="nav-scroller py-1 mb-2">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap ">
                            <li class="page-item">
                                <div class="page-link disabled ">
                                    
                                        showing from <span>{{whatnew.from}}</span> 
                                        to <span>{{whatnew.to}}</span> of 
                                        <span>{{whatnew.total}}</span>
                                    
                                </div>
                            </li>
                            <li class="page-item" v-for="li in whatnew.links">

                                    <a class="page-link p-2" 
                                        v-if="!li.active && li.url != null" 
                                        @click.prevent="$emit('getWn',li.url)"
                                        v-html="li.label">
                                        {{li.label}} 
                                    </a>
                                    <span class="page-link disabled" v-html="li.label" v-else>
                                        {{li.label}}
                                    </span>

                            </li>
                            <li class="page-item active">
                                <div class="page-link">
                                    <span>
                                        <b-icon icon="book-half"></b-icon>
                                        {{whatnew.current_page}}
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <!-- =================== pagination path START =============== -->

        </div>
    </div>
</template>

<script>
var moment = require("moment")
export default{
    name:"WhatnewList",
    props:["whatnew"],
    data(){
        return{
            moment:moment,
        }
    },
}
</script>
