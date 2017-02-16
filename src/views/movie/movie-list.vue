<template>
  <section class="grid has-search-bar" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" >
    <h2>{{movieList.title}}</h2>
    <div class="card" v-if="movieList.subjects.length > 0">
      <router-link :to="{name: 'movie-detail', params: {id: item.id}}" class="item"
                   v-for="item in movieList.subjects">
        <div class="cover">
          <div class="wp">
            <img class="img-show" :src="item.images.medium"/>
          </div>
        </div>
        <div class="info">
          <h3>{{item.title}}</h3>
        </div>
      </router-link>
    </div>
    <p v-if="busy" class="text-center">loading....</p>
    <spinner :show="loading"></spinner>
  </section>
</template>

<script>
  import Spinner from '../../components/Spinner.vue';
  import ScrollSpinner from '../../components/ScrollSpinner.vue';
  import InfiniteScroll from 'vue-infinite-scroll'
  import * as types from '../../store/types';
  import {API_TYPE, fetchMoviesByType} from '../../store/api';

  export default{
    components: {Spinner, ScrollSpinner},
    directives: {InfiniteScroll},
    data(){
      return {
        loading: true,
        type: '',
        movieList: {
          subjects: []
        },
        busy: false
      }
    },
    computed: {},
    mounted(){
      this.type = this.$route.query.type;
    },
    methods: {
      loadMore(){
        let start = this.movieList.subjects.length;
        this.busy = true;
        fetchMoviesByType(this.type, start)
                .then(data => {
                  this.movieList.title = data.title;
                  this.movieList.total = data.total;
                  this.movieList.subjects = this.movieList.subjects.concat(data.subjects);
                  if (this.movieList.subjects.length < this.movieList.total) {
                    this.busy = false;
                  }
                  this.loading = false;
                })
      }
    },
    destroyed(){
    }
  };
</script>