<template>
  <div>
    <v-header></v-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import vHeader from './components/header.vue'
  import Hello from './components/Hello';
  import Movies from './views/movie/movies.vue'
  import MovieList from './views/movie/movie-list.vue'
  import MovieDetail from './views/movie/movie-detail.vue'
  import SearchList from './views/movie/search-list.vue'

  export default {
    name: 'app',
    components: {
      vHeader,
      Hello,
      Movies,
      MovieList,
      MovieDetail,
      SearchList,
    },
  };
</script>

<style lang="scss">
  @import "assets/style";
  @import "assets/list";

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
