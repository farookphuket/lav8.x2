<template>
    <div class="container">
        <div class="row">
           <div class="col-lg-12">
               <h1>Show my timeline</h1>
               <div class="clearfix">
                   <div class="float-right">
                       <a href="" class="btn btn-outline-primary btn-xl" 
                           @click.prevent="$emit('print')">
                            <b-icon icon="printer"></b-icon>
                       </a>
                   </div>
               </div>
              
           </div>
           <div class="col-lg-12 pt-4">&nbsp;</div>
           <!-- ================== -->
           <div class="card" id="forPrint" v-for="tm in timelines.data">
               <div class="card-body">
                   <div class="row">
                       <div class="col-lg-4">
                           <span>
                                <b-icon icon="calendar2-day"></b-icon>
                                {{tm.date_ref}} 
                           </span>
                           <span>
                               <b-icon icon="clock-history"></b-icon>
                               {{moment(tm.date_ref).fromNow()}}</span>
                       </div><!-- div.col-lg-4 END -->
                       <div class="col-lg-4" v-html="tm.report">{{tm.report}}</div>
                       <div class="col-lg-12 pt-2 mb-2">
                           <div class="float-right">
                               <button class="btn btn-outline-primary" 
                                   @click.prevent="$emit('edit',tm.id)">
                                   <b-icon icon="pen"></b-icon>
                               </button>

                               <button class="btn btn-outline-danger" 
                                   @click.prevent="$emit('del',tm.id)">
                                   <b-icon icon="trash"></b-icon>
                               </button>
                           </div>
                       </div><!-- end of div.col-lg-12 -->
                   </div><!-- end of div.row -->
               </div><!-- end of div.card-body -->
           </div><!-- end of div.card -->
           <!-- ===== pagination === -->
           <div class="col-lg-12 pt-4">
               <div class="nav-scroller py-1 mb-2">
                   <nav class="nav d-flex justify-content-center">
                       <ul class="pagination flex-wrap">
                           <li class="page-item" v-for="ll in timelines.links">
                               <div class="page-link">
                                   <a href="" v-html="ll.label" 
                                              v-if="!ll.active && ll.url != null" 
                                              >{{ll.label}}</a>
                                   <span v-html="ll.label" v-else>
                                       {{ll.label}}
                                   </span>
                               </div>
                           </li>
                           <li class="page-item active">
                               <span class="page-link" >
                                   <b-icon icon="book-half"></b-icon>
                                   {{timelines.current_page}}
                               </span>
                           </li>



                       </ul>
                   </nav>
               </div>
           </div>
           <!-- ============= -->
        </div><!-- end of div.row -->
    </div><!-- end of div main -->
</template>

<script>

var moment = require('moment')
export default{
    name:"TimelineList",
    props:["timelines"],
    data(){
        return{
            moment:moment
        }
    },

}
</script>
