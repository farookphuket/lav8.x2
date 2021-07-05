<template>

        <div class="row ">
          <div class="col-lg-12" style="margin-top:1.5em;min-height:220px;" 
            v-for="wn in wns.data">
                  <div data-bs-toggle="collapse" class="pt-12 mb-12"
                        @click.prevent="toggMe(wn.id)"
                        aria-expanded="false" 
                        >
                        <span style="font-weight:bold;color:green;">
                            {{wn.whatnew_title}} 
                            <b-icon icon="eye"></b-icon>
                        </span>
                        <div class="clearfix">
                            <div class="float-right">

                                <span>
                                    <b-icon icon="person"></b-icon>
                                    {{wn.user.name}}
                                </span>
                                <span>
                                    <a href="" :title="moment(wn.created_at)">
                                        <b-icon icon="calendar2-day"></b-icon>
                                    </a>
                                    {{moment(wn.created_at).fromNow()}}
                                </span>
                            </div>
                        </div>
                  </div>
                <div  class="collapse show"
                    v-show="showMe" v-html="wn.whatnew_body"
                    data-bs-parent=".faq-list" style="">
                  {{wn.whatnew_body}}
                </div>

                <div class="float-right">
                    <div  v-show="wn.user_id == ownId">
                        <span class="alert alert-warning"
                            v-if="wn.is_public == false">
                            <b-icon icon="lock-fill"></b-icon>
                        </span>
                        <span class="alert alert-success" v-else>
                            <b-icon icon="unlock"></b-icon>
                        </span>

                        <button
                            class="btn btn-outline-primary btn-sm"
                            @click.prevent="$emit('edit',wn.id)">
                            <b-icon icon="pencil"></b-icon>
                        </button>
                        <button
                            class="btn btn-outline-danger btn-sm"
                            @click.prevent="$emit('del',wn.id)">
                            <b-icon icon="trash"></b-icon>
                        </button>
                    </div>
                </div>
                <hr style="margin-top:7em;margin-bottom:2em;">
                
          </div>

          <div class="col-xl-12" v-show="wns.data != 0">

                <div class="nav-scroller py-1 mb-2">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap">
                            <li class="page-item disabled">
                                <div class="page-link">
                                    showing from {{wns.from}}
                                    to <span>{{wns.to}}</span> of
                                    <span>{{wns.total}}</span>
                                </div>
                            </li>
                            <li class="page-item" v-for="li in wns.links">
                                <a class="page-link p-2" href="" v-html="li.label"
                                    v-if="!li.active && li.url != null"
                                    @click.prevent="$emit('getWhatnew',li.url)">
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
                                    {{wns.current_page}}
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
    name:"WhatnewList",
    props:["wns"],
    data(){
        return{
            moment:moment,
            showMe:false,
            ownId:window.ownId
        }
    },
    methods:{
        toggMe(id){

            this.showMe = !this.showMe

        }
    }
}

</script>
