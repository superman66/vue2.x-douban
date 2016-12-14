/**
 * Created by superman on 2016/12/14.
 */
import * as types from '../types';
import {fetchMoviesByType, fetchSearchMovies, fetchMovieById} from '../api';

const state = {
  movies: [],
  movieList: {
    title: '',
    total: 0,
    subjects: [],
  },
  busy: false,
  movie: {},
};

const actions = {
  [types.FETCH_MOVIES](context,payload){
    fetchMoviesByType(payload.type, payload.start, payload.count)
        .then(data=>{
          data.type = payload.type;
          return context.commit([types.FETCH_MOVIES], data)
        });
  },

  [types.FETCH_MOVIE_LIST](context,payload){
    fetchMoviesByType(payload.type, payload.start)
        .then(data=>context.commit([types.FETCH_MOVIE_LIST], data));
  },

  [types.FETCH_MOVIE_BY_ID](context, id){
    fetchMovieById(id)
        .then(data => context.commit([types.FETCH_MOVIE_BY_ID], data));
  },

  [types.SET_INFINITE_BUSY](context, data){
    context.commit([types.SET_INFINITE_BUSY], data);
  }
};

const mutations = {
  [types.FETCH_MOVIES](state, list){
    state.movies.push(list);
  },

  [types.FETCH_MOVIE_LIST](state, list){
    state.movieList.title = list.title;
    state.movieList.total = list.total;
    state.movieList.subjects = state.movieList.subjects.concat(list.subjects);
    if(state.movieList.subjects.length < state.movieList.total){
      state.busy = false;
    }
  },

  [types.FETCH_MOVIE_BY_ID](state, movie){
    state.movie = movie;
  },

  [types.SET_INFINITE_BUSY](state, data){
    state.busy = data;
  }
};


export default {
  state,
  mutations,
  actions
}