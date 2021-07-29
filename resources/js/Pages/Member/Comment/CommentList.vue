<template>
    <div class="container">
        <div class="alert alert-warning" v-if="comments.data == 0">
            <h2>no comment</h2>
        </div>
        <div class="card" v-else v-for="cm in comments.data">
            <div class="card-header">
                <h4 class="card-title" v-for="bl in cm.blogs">{{bl.title}}</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-12">
                        <span class="badge badge-info p2">
                            <b-icon icon="chat-left-text"></b-icon>
                            {{cm.comment_title}}
                        </span>

                        <div v-html="cm.comment_body">
                            {{cm.comment_body}}
                        </div>
                    </div><!-- end of div.col-lg-12 -->

                </div><!-- end of div.row -->

            </div><!-- end of div.card-body -->

            <div class="card-footer">
                <div class="row">
                    <div class="col-md-8">
                        <span>
                            <b-icon icon="calendar2-day"></b-icon>
                            {{moment(cm.created_at)}}
                            &middot;
                            {{moment(cm.created_at).fromNow()}}
                        </span>
                    </div>
                    <div class="col-md-4">
                        <div class="float-right btn-group" v-if="user_id == cm.user_id">
                            <button class="btn btn-outline-danger" 
                            @click.prevent="$emit('del',cm.id)">
                                <b-icon icon="trash"></b-icon>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div><!-- end of div.card -->

        <!-- ====== pagination START ======== -->

        <!-- ====== pagination END ======== -->
    </div>
</template>

<script>
var moment = require('moment')
export default{
    name:"CommentList",
    props:["comments","showPagination","user_id"],
    data(){
        return{
            moment:moment
        }
    },
}
</script>
