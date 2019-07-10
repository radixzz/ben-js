import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import storage from './modules/storage';
import workspace from './modules/workspace';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    auth,
    storage,
    workspace,
  },
});
