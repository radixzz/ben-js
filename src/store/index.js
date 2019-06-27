import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import database from './modules/database';
import editors from './modules/editors';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    auth,
    database,
    editors,
  },
});
