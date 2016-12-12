<template>
  <div class="grid">
    <div class="card">
      <div class="title">{{movie.title }}&nbsp;{{movie.original_title}}</div>
      <div>
        <img :src="movie.images.large" style="width:100%">
      </div>
      <section class="subject-info">{{getMeta}}</section>
      <section class="subject-mark">
        <div class="mark-item">
          <a >
            <span>想看({{movie.wish_count}})</span>
          </a>
          <a><span>看过</span></a>
        </div>
      </section>
      <section class="subject-intro">
        <h2>{{movie.title}}的剧情介绍</h2>
        <div class="bd">
          <p>
            {{movie.summary}}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import * as types from '../store/types';

  export default{
    data(){
      return {
        id: '',
      }
    },
    computed: {
      getMeta(){
        var movie = this.$store.state.movie;
        var cast = movie.casts.reduce((name,value)=>{
          return name ? name +' / '+ value.name : value.name;
        }, '');
        return movie.countries.join(' / ') + ' / '+movie.genres.join(' / ') + ' / '+movie.directors[0].name +'(导演) / ' + cast;
      },
      ...mapState({
        movie: state => state.movie
      })
    },
    mounted(){
      this.id = this.$route.params.id;
      this.$store.dispatch([types.FETCH_MOVIE_BY_ID], this.id);
    }
  };
</script>
<style scoped lang="scss">
  .grid {
    padding: 20px 0;
    margin-left: auto;
    margin-right: auto;
    max-width: 660px;
    overflow: hidden;
    box-sizing: border-box;
  }

  .card {
    margin: 0 18px;
    -webkit-text-size-adjust: 100%;
    .title {
      margin: 30px 0 5px;
      font-size: 24px;
      line-height: 32px;
      word-break: break-all;
    }
    section {
      margin-bottom: 30px;
      p {
        font-size: 15px;
        color: #494949;
        line-height: 1.5;
      }
    }
    .subject-info {
      position: relative;
      overflow: hidden;
      margin-top: 10px;
      line-height: 1.5;
    }
    .subject-mark{
      .mark-item{
        margin-bottom: 30px;
        display: -webkit-box;
        display: -moz-box;
        display: box;
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -moz-box-align: center;
        box-align: center;
        -webkit-align-items: center;
        -moz-align-items: center;
        -ms-align-items: center;
        -o-align-items: center;
        align-items: center;
        -ms-flex-align: center;
        a{
          height: 30px;
          line-height: 30px;
          display: block;
          border: 1px solid #ffb712;
          border-radius: 3px;
          margin-right: 10px;
          color: #ffb712;
          font-size: 15px;
          text-align: center;
          -webkit-box-flex: 1;
          -moz-box-flex: 1;
          box-flex: 1;
          -webkit-flex: 1;
          -moz-flex: 1;
          -ms-flex: 1;
          flex: 1;
        }
      }
    }
    .subject-intro {

      h2 {
        color: #aaa;
        margin: 0 0 15px;
        font-size: 15px;
      }
    }
  }
</style>
