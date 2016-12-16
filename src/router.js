/**
 * Created by superman on 2016/12/2.
 */
import App from  './App.vue'

export default [
  {
    path: '/',
    component: App.components.Movies,
  },
  {
    path: '/vuex-demo',
    component: App.components.VuexDemo,
    name: 'vuex-demo'
  },
  {
    path: '/movies',
    component: App.components.Movies,
    name: 'movies'
  },
  {
    path: '/movie-list',
    component: App.components.MovieList,
    name: 'movie-list'
  },
  {
    path: '/movie/:id',
    component: App.components.MovieDetail,
    name: 'movie-detail'
  },
  {
    path: '/search',
    component: App.components.SearchList,
    name: 'search'
  }
]

