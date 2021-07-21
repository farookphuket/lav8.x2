<template>
    <div class="card mt-4">
        <div class="card-body">
            <ul style="text-decoration:none;">
                <li v-for="tm in templates.data" style="margin-top:2em;">
                    <div class="row">
                        <div class="col-lg-12">
                            <h2 class="text-center">{{tm.tm_title}}</h2>
                            <div v-html="tm.tm_excerpt">
                                {{tm.tm_excerpt}}</div>

                        </div>
                        <div class="col-lg-4" v-if="tm.user_id == user_id">
                            <span class="badge badge-success" 
                                v-if="tm.tm_public != 0">
                                <b-icon icon="unlock"></b-icon>
                            </span>
                            <span class="badge badge-warning" 
                                v-else>
                                <b-icon icon="lock"></b-icon>
                            </span>
                        </div><!-- end of div.col-lg-4 v-if -->
                        <div class="col-lg-4" v-else>
                            <span>
                                <b-icon icon="calendar2-day"></b-icon>
                                {{moment(tm.created_at)}}
                            </span>
                        </div><!-- end of div.col-lg-4 v-else -->

                        <div class="col-lg-8">
                            <div class="btn-group float-right" 
                                v-if="tm.user_id == user_id">

                                <button class="btn btn-outline-info" 
                                    @click.prevent="$emit('showTemplate',tm.id)">
                                    <b-icon icon="eye"></b-icon>
                                </button>
                                <button class="btn btn-outline-primary" 
                                    @click.prevent="$emit('edit',tm.id)">
                                    <b-icon icon="pencil"></b-icon>
                                </button>
                                <button class="btn btn-outline-danger" 
                                    @click.prevent="$emit('del',tm.id)">
                                    <b-icon icon="trash"></b-icon>
                                </button>
                            </div><!-- end of div.btn-group v-if -->
                            <div class="float-right" v-else>
                                <button class="btn btn-outline-info" 
                                    @click.prevent="$emit('showTemplate',tm.id)">
                                    <b-icon icon="eye"></b-icon>
                                </button>
                            </div>
                        </div><!-- end of div.col-lg-8 -->

                    </div><!-- end of div.row -->
                </li>

                <li style="margin-top:2em;">

                <div class="nav-scroller py-1 mb-2">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap">
                            <li class="page-item disabled">
                                <div class="page-link">
                                    showing from {{templates.from}}
                                    to <span>{{templates.to}}</span> of
                                    <span>{{templates.total}}</span>
                                </div>
                            </li>
                            <li class="page-item" v-for="li in templates.links">
                                <a class="page-link p-2" href="" v-html="li.label"
                                    v-if="!li.active && li.url != null"
                                    @click.prevent="$emit('getTemplate',li.url)">
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
                                    {{templates.current_page}}
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
                </li><!-- end of li pagination -->
            </ul>
        </div>
    </div>
</template>

<script>
var moment = require("moment")
export default{
    name:"TemplateList",
    props:["templates","user_id"],
    data(){
        return{
            moment:moment,
        }
    },
}
</script>
