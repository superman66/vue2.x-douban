<template>
  <section class="grid" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <h2>{{movieList.title}}</h2>
    <div class="card">
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
  </section>
</template>

<script>
  import Loading from '../components/Spinner.vue';
  import InfiniteScroll from 'vue-infinite-scroll'
  import {mapState} from 'vuex';
  import * as types from '../store/types';
  import {API_TYPE} from '../store/api';

  function fetchMovies(store, payload) {
    return store.dispatch([types.FETCH_MOVIE_LIST], payload);
  }
  export default{
    components: {Loading},
    directives: {InfiniteScroll},
    data(){
      return {
        type:''
      }
    },
    computed: mapState({
      movieList: state=> state.movie.movieList,
      busy: state => state.movie.busy
    }),
    mounted(){
      this.type = this.$route.query.type;
    },
    methods: {
      loadMore(){
        this.$store.dispatch([types.SET_INFINITE_BUSY], true);
        let start = this.$store.state.movie.movieList.subjects.length;
        fetchMovies(this.$store, {type: this.type, start:start}).then(()=> {
        })
      }
    },
    destroyed(){
      this.$store.dispatch([types.CLEAN_MOVIE])
    }
  };
</script>
<style lang="scss">
  .grid {
    padding: 40px 0 0;
    margin-left: auto;
    margin-right: auto;
    max-width: 660px;
    overflow: hidden;
    box-sizing: border-box;
    h2 {
      font-size: 14px;
      font-weight: normal;
      box-sizing: border-box;
      max-width: 660px;
      margin: 15px auto;
      padding: 0 4%;
      color: #8e8e8e;
      .more{
        float: right;
        font-size:12px;
        color: #999;
      }
    }
    .card{
      clear: both;
      overflow: hidden;
      background: #fff;
      border-radius: 10px;
      padding: 14px 0 0;
    }
    .item {
      float: left;
      box-sizing: border-box;
      width: 33.33333%;
      padding-left: 4%;
      padding-right: 4%;
      margin-bottom: 0px;
      overflow: hidden;
      text-decoration: none;
      color: #9b9b9b;
      .cover {
        min-height: 87px;
        overflow: hidden;
        position: relative;
        .img-show {
          width: 100%;
        }
      }
      .wp {
        position: relative;
        &:before {
          content: "";
          display: block;
          padding-top: 143%;
        }
      }
      .info {
        height: 45px;
        overflow: hidden;
        h3 {
          font-size: 13px;
          font-weight: normal;
          padding: 5px 0 0;
          color: #494949;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          margin: 0;
        }
      }
      .rank {
        height: 16px;
        font-size: 12px;
        padding-top: 3px;
        text-align: center;
        .rating-stars {
          display: inline-block;
          vertical-align: middle;
        }
      }
      img {
        display: block;
        position: absolute;
        left: -100%;
        right: -100%;
        top: -100%;
        bottom: -100%;
        margin: auto;
        min-height: 100%;
        min-width: 100%;
      }
    }
  }
</style>