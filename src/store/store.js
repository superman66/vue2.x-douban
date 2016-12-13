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
    inTheaters:{
      title: '',
      total: 0,
      subjects:[],
    },
    busy: false,
    movie: {},
  },
  mutations: {
    [types.IN_THEATERS](state, list){
      state.inTheaters.title = list.title;
      state.inTheaters.total = list.total;
      state.inTheaters.subjects = state.inTheaters.subjects.concat(list.subjects);
      if(state.inTheaters.subjects.length < state.inTheaters.total){
        state.busy = false;
      }
    },
    [types.FETCH_MOVIE_BY_ID](state, movie){
      state.movie = movie;
    },
    [types.SET_INFINITE_BUSY](state, data){
      state.busy = data;
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
    },
    [types.SET_INFINITE_BUSY](context, data){
      context.commit([types.SET_INFINITE_BUSY], data);
    }
  }
});