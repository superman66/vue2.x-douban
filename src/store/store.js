/**
 * Created by superman on 2016/12/2.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import movie from './modules/movie'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    movie
  }
});