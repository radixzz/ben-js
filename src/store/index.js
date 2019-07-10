import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import database from './modules/database';
import workspace from './modules/workspace';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    auth,
    database,
    workspace,
  },
});
