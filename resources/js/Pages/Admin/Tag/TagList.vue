<template>
    <div class="card mb-4 ">


            <div class="card-header">
                <h3>Tags</h3>
            </div>
            <div class="card-body" v-for="ta in tags.data">
                <h3>{{ta.tag_name}}</h3>
                <div style="margin:1.05em;">
                    <!-- ============= Show blog list in this tag START ======= -->
                    <ul>
                        <li v-for="bl in ta.blogs">
                            <a href="#" @click.prevent="$emit('openMe',bl.slug)">
                                {{bl.title}}
                            </a>
                           <span>
                                <a href="#" @click.prevent="openMe(bl.slug)"
                                    title="open in new tab">
                                    <b-icon icon="box-arrow-up-right"></b-icon>
                                </a>
                           </span>
                        </li>
                    </ul>
                    <!-- ============= Show blog list in this tag END ========= -->
                </div>

                    <div class="clearfix">
                        <div class="float-right">
                            <ul>
                                <li  
                                    style="display:block;">
                                    <a href="#" >

                                        <b-icon icon="person"></b-icon>
                                        {{ta.name}} &middot; {{ta.email}}
                                    </a>

                                </li>
                                <li
                                    style="display:block;"
                                    >
                                    <span>
                                        <b-icon icon="calendar2-day"></b-icon>
                                        <a href="" :title="moment(ta.created_at)">
                                            {{moment(ta.created_at).fromNow()}}
                                        </a>

                                    </span>
                                </li>
                                <li style="display:block;"
                                    > 
                                    <button class="btn btn-outline-primary" 
                                        @click.prevent="$emit('edit',ta.id)">
                                        <b-icon icon="pen"></b-icon>
                                    </button>

                                    <button class="btn btn-outline-danger" 
                                        @click.prevent="$emit('del',ta.id)">
                                        <b-icon icon="trash"></b-icon>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
            </div><!-- end of div.card-body -->
            <div class="card-footer">

                    <div class="row"><!-- START div.row pagination -->
                        <div class="col-sm-12 col-md-5">
                            <div
                                class="dataTables_info"
                                id="dataTable_info"
                                role="status"
                                aria-live="polite"
                            >
                                Showing {{ tags.from }} to {{ tags.to }} of
                                {{ tags.total }} entries
                            </div>
                        </div>

                        <div class="col-sm-12 col-md-7">
                            <div
                                class="dataTables_paginate paging_simple_numbers"
                                id="dataTable_paginate"
                            >
                                <ul class="pagination">
                                    <!-- Link list Start -->

                                    <li
                                        class="paginate_button page-item"
                                        v-for="pa in tags.links"
                                    >
                                        <a
                                            href="#"
                                            aria-controls="dataTable"
                                            data-dt-idx="pa.id"
                                            tabindex="0"
                                            class="page-link p-2"
                                            @click.prevent="
                                                $emit('getTags', pa.url)
                                            "
                                            v-html="pa.label"
                                            v-if="!pa.active && pa.url != null"
                                        >
                                            {{ pa.label }}
                                        </a>
                                        <span
                                            class="page-link"
                                            v-html="pa.label"
                                            v-else
                                        >
                                            {{ pa.label }}
                                        </span>
                                    </li>

                                    <!-- End Link list  -->
                                    <li
                                        class="paginate_button page-item active"
                                    >
                                        <a
                                            href="#"
                                            aria-controls="dataTable"
                                            tabindex="0"
                                            class="page-link p-2 disabled"
                                            disabled
                                        >
                                            <b-icon icon="book-half"></b-icon>
                                            {{ tags.current_page }}
                                        </a>
                                    </li>
                                </ul>
                            </div><!-- end div link list wrap -->
                        </div><!-- end of div.col-sm-12 col-md-7 -->

                    </div><!-- end of div.row pagination -->
            </div>

    </div>
</template>


<script>
var moment = require("moment")
export default{
    name:"TagList",
    props:["tags"],
    data(){
        return{
            moment:moment,
        }
    },
    methods:{
        openMe(slug){
            let url = `/admin/blog/${slug}`
            window.open(url,"_blank")
        },
    },
}
</script>
