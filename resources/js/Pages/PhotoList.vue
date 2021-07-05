<template>
    <div class="row gallery-5">
            <div class="col-lg-4 col-md-6 gallery-item " 
                v-if="photos.data == 0">

                    <div class="single-gallery">
                        <div class="image">

                            <img class="responsive" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-chevrolet-corvette-z06-1607016574.jpg?crop=0.737xw:0.738xh;0.181xw,0.218xh&resize=640:*" alt="default image 1" />
                        </div>
                        <div class="overlay">
                            <div class="overlay-content">
                                <div class="info">
                                    <h5>No photo</h5>
                                    <p>There is no photo found</p>
                                </div>
                                <div class="action">
                                    <a href="#0">
                                        _<i class="lni lni-link"></i>_
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>



            </div>
                <div class="col-lg-4 col-md-6 gallery-item " 
                    v-for="pi in photos.data" v-else
                    >
                    <div class="single-gallery">
                        <div class="image" style="max-height:250px;">
                            <img :src="pi.url" alt="" style="min-height:250px;
                            border:1px dotted #ff0000">
                        </div>
                        <div class="overlay">
                            <div class="overlay-content">
                                <div class="info">
                                    <h5 class="pt-4">Photo</h5>
                                    <p>{{pi.title}}</p>
                                </div>
                                <div class="action">
                                    <a :href="pi.url" :title="pi.title" 
                                        target="_blank">
                                        _<i class="lni lni-link"></i>_
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            
            <!-- ======== space ====== -->
            <div class="col-lg-12 pt-2 mb-2">&nbsp;</div>
            <!-- ======= pagination ======= -->
            <div class="container " v-show="photos.data != 0">
                <div class="nav-scroller py-1 mb-2">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap ">
                            <li class="page-item">
                                <div class="page-link disabled ">
                                    
                                        showing from <span>{{photos.from}}</span> 
                                        to <span>{{photos.to}}</span> of 
                                        <span>{{photos.total}}</span>
                                    
                                </div>
                            </li>
                            <li class="page-item" v-for="li in photos.links">

                                    <a class="page-link p-2" 
                                        v-if="!li.active && li.url != null" 
                                        @click.prevent="$emit('getPhotos',li.url)"
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
                                        {{photos.current_page}}
                                    </span>
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
export default {
    name: "PhotoList",
    props: ["photos"],
    data(){
        return{
            moment:moment,
            s_title:'',
        }
    },
    mounted(){
        this.s_title = new CustomText()
    },
};
</script>
