import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import cdnjs from './modules/cdnjs';
import storage from './modules/storage';
import editors from './modules/editors';
import workspace from './modules/workspace';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    auth,
    cdnjs,
    storage,
    editors,
    workspace,
  },
});
