<template>
    <div class="card">
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item" 
                    v-for="tm in templates.data">
                    <div class="row">
                        <div class="col-lg-12">
                            <h3 class="mb-4 text-center">
                            {{tm.tm_title}}
                            </h3>
                            <div v-html="tm.tm_excerpt">
                                {{tm.tm_excerpt}}
                            </div>
                        </div><!-- end of div.col-lg-12 -->
                        <div class="col-lg-4">
                           <span class="badge badge-success p-2" 
                               v-if="tm.tm_approved_at != null">
                            <b-icon icon="person"></b-icon>
                            {{moment(tm.tm_approved_at)}}
                           </span>

                           <span class="badge badge-warning p-2" 
                               v-else>
                            <b-icon icon="lock"></b-icon>
                           </span>


                           <span class="badge badge-success p-2" 
                               v-if="tm.tm_public != 0">
                            <b-icon icon="unlock"></b-icon>
                            public
                           </span>

                           <span class="badge badge-warning p-2" 
                               v-else>
                            <b-icon icon="unlock"></b-icon>
                            private
                           </span>
                        </div>
                        <div class="col-lg-5">
                            <span class="badge badge-info p-2">
                                created :
                                <b-icon icon="calendar2-day"></b-icon>
                                <a href="" :title="moment(tm.created_at)" 
                                    style="color:white;font-weight:bold;">
                                    {{moment(tm.created_at).fromNow()}}
                                </a>
                            </span>
                            <span class="badge badge-info p-2">
                                updated :
                                <b-icon icon="calendar2-day"></b-icon>
                                <a href="" :title="moment(tm.updated_at)" 
                                    style="color:white;font-weight:bold;">
                                    {{moment(tm.updated_at).fromNow()}}
                                </a>
                            </span>
                        </div><!-- end of div.col-lg-4 -->
                        <div class="col-lg-3">

                            <div class="btn-group float-right">
                                <button class="btn btn-outline-info" 
                                    @click.prevent="$emit('view',tm.id)">
                                    <b-icon icon="eye"></b-icon>
                                </button>
                                <button class="btn btn-outline-primary" 
                                    @click.prevent="$emit('edit',tm.id)">
                                    <b-icon icon="pen"></b-icon>
                                </button>
                                <button class="btn btn-outline-danger" 
                                    @click.prevent="$emit('del',tm.id)">
                                    <b-icon icon="trash"></b-icon>
                                </button>
                            </div><!-- end of div.btn-group -->
                        </div><!-- end of div.col-lg-4 -->
                    </div><!-- end of div.row -->
                </li>


                <li class="list-group-item" v-show="show_pagination">
                    <!-- ======= pagination ======= -->
                    <div 
                        style="margin-top:3em;"
                        class="container ">
                        <div class="nav-scroller py-1 mb-2">
                            <nav class="nav d-flex justify-content-center">
                                <ul class="pagination flex-wrap ">
                                    <li class="page-item">
                                        <div class="page-link disabled ">
                                            
                                                showing from <span>{{templates.from}}</span> 
                                                to <span>{{templates.to}}</span> of 
                                                <span>{{templates.total}}</span>
                                            
                                        </div>
                                    </li>
                                    <li class="page-item" v-for="li in templates.links">

                                            <a class="page-link p-2" 
                                                v-if="!li.active && li.url != null" 
                                                @click.prevent="$emit('getTemplate',li.url)"
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
                                                {{templates.current_page}}
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <!-- ======== End pagination ==== -->
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
var moment = require("moment")

export default{
    name:"TemplateList",
    props:["templates","show_pagination"],
    data(){
        return{
            moment:moment,
        }
    },
}
</script>
