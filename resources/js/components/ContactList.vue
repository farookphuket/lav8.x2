<template>

<div class="row">

        <div class="container">
            <!-- ===== Start loop throught the object item ======== --> 
            <div class="card mt-2" 
                v-for="li in faqs.data">
                <div class="card-header">
                    <h3>{{li.title}}</h3>
                </div><!-- end of div.card-header -->

                <div class="card-body">
                    <div v-html="li.body">
                    {{li.body}}
                    </div>

                </div><!-- end of div.card-body -->

                <div class="card-footer">
                    <div class="row">
                        <div class="col-md-6">
                            by :
                            <span>
                                <b-icon icon="person"></b-icon>
                                {{li.name}}
                            </span>
                            &nbsp;
                            <span>
                                <b-icon icon="calendar2-day"></b-icon>
                                {{moment(li.created_at)}} &middot;
                                {{moment(li.created_at).fromNow()}}
                            </span>
                        </div><!-- end div.col-md-6 -->

                        <div class="col-md-6">

                                <span v-if="li.replied_at != 'NO'">
                                    <span class="float-right">
                                    replied
                                    <b-icon icon="person"></b-icon>
                                    {{li.reply_by}}
                                    </span>
                                     &middot;
                                    <p>
                                        {{moment(li.replied_at)}} &middot;
                                        {{moment(li.replied_at).fromNow()}}
                                    </p>
                                </span>
                                <span v-else>No reply yet!</span>



                        </div><!-- end of div.col-md-6 -->

                    </div><!-- end div.row -->


                </div><!-- END of div.card-footer -->

            </div><!-- end div.card show item loop -->
            <!-- ===== End   loop throught the object item ======== --> 


 <!-- ========================= Show pagination 5 Jul 2021 =============== -->

    <div class="nav-scroller py-1 mb-2 mt-4" v-show="faqs.data != 0">
        <nav class="nav d-flex justify-content-center">
            <ul class="pagination flex-wrap">
                <li class="page-item disabled ">
                    <div class="page-link" style="padding:0.5em;">
                        showing from
                        <span>{{ faqs.from }}</span> to
                        <span>{{ faqs.to }}</span> of
                        <span>{{ faqs.total }}</span>
                    </div>
                </li>
                <li class="page-item " v-for="li in faqs.links">
                    <a
                        href=""
                        class="page-link p-2"
                        v-html="li.label"
                        v-if="li.active != true && li.url != null"
                        @click.prevent="getFaqs(li.url)"
                        >{{ li.label }}</a
                    >
                    <span class="page-link disabled"
                        v-html="li.label" v-else>
                        {{ li.label  }}
                    </span>

                </li>
                <li class="page-item active ">
                    <span class="page-link">
                        <b-icon icon="book-half"></b-icon>
                        {{ faqs.current_page }}
                    </span>
                </li>
            </ul>
        </nav>
    </div>

 <!-- ========================= Show pagination 5 Jul 2021 =============== -->


    <div style="margin-top:2em;magin-bottom:2em;">
       <faq-form @getFaqs="getFaqs($event)"></faq-form>
    </div>


        </div><!-- End of div.container 5 Jul 2021 -->
        







</div><!-- end of div.row -->


</template>


<script>
var moment = require("moment")
import FaqForm from './ContactForm.vue'
export default{

    name:"FaqUs",
    components:{
        FaqForm,
    },
    data(){
        return{
            faqs:[],
            moment:moment,
        }
    },
    mounted(){
        this.getFaqs()
    },
    methods:{
        getFaqs(page){
            let url = ''
            if(page){
                url = page
                this.$cookies.set('pubfaq_old_page',url)
            }
            url = this.$cookies.get('pubfaq_old_page')
            if(!url){
                url = `/api/getContact`
            }
            axios.get(url)
                .then(res=>{
                    //console.log(res.data)
                    this.faqs = res.data.getFaqs

                })
        },
    }
}
</script>
