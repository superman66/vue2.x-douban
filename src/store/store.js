/**
 * Created by superman on 2016/12/2.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types';
import {fetchMoviesByType, fetchSearchMovies, fetchMovieById} from './api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    inTheatersList:[],
    movie: {},
  },
  mutations: {
    [types.IN_THEATERS](state, list){
      state.inTheatersList = list;
    },
    [types.FETCH_MOVIE_BY_ID](state, movie){
      state.movie = state.movie.concat(movie);
    }
  },

  actions: {
    [types.IN_THEATERS](context, start){
      fetchMoviesByType('in_theaters', start)
          .then(data=>context.commit([types.IN_THEATERS], data));
    },
    [types.FETCH_MOVIE_BY_ID](context, id){
      fetchMovieById(id)
          .then(data => context.commit([types.FETCH_MOVIE_BY_ID], data));
    }
  }
});