<template>
  <div>
    <section class="grid has-search-bar">
      <div v-if="inTheater.title">
        <h2>{{inTheater.title}}
          <router-link tag="span" :to="{name: 'movie-list', query: {type: inTheater.type}}" class="more">更多>
          </router-link>
        </h2>
        <div class="card">
          <router-link :to="{name: 'movie-detail', params: {id: item.id}}" class="item"
                       v-for="item in inTheater.subjects">
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
      </div>
      <div v-if="comingSoon.title">
        <h2>{{comingSoon.title}}
          <router-link tag="span" :to="{name: 'movie-list', query: {type: comingSoon.type}}" class="more">更多>
          </router-link>
        </h2>
        <div class="card">
          <router-link :to="{name: 'movie-detail', params: {id: item.id}}" class="item"
                       v-for="item in comingSoon.subjects">
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
      </div>
      <spinner :show="loading"></spinner>
    </section>
  </div>
</template>

<script>
  import Spinner  from '../../components/Spinner.vue'
  import {mapState} from 'vuex';
  import * as types from '../../store/types';
  import {API_TYPE, fetchMoviesByType} from '../../store/api';

  export default{
    components: {Spinner},
    data(){
      return {
        loading: true,
        inTheater: {
          type: ''
        },
        comingSoon: {
          type: ''
        }
      }
    },
    mounted(){
      var start = 0, count = 9;
      fetchMoviesByType(API_TYPE.movie.in_theaters, start, count)
              .then((data) => {
                this.inTheater = data;
                this.inTheater.type = API_TYPE.movie.in_theaters;
                this.loading = false;
              });
      fetchMoviesByType(API_TYPE.movie.coming_soon, start, count)
              .then((data) => {
                this.comingSoon = data;
                this.comingSoon.type = API_TYPE.movie.coming_soon;
                this.loading = false;
              });

    },
    updated(){
    },
    destroyed(){
    }
  };
</script>