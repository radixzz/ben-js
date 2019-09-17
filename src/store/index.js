import { throttle } from 'lodash';
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import auth from './modules/auth';
import cdnjs from './modules/cdnjs';
import editors from './modules/editors';
import workspace from './modules/workspace';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    auth,
    cdnjs,
    editors,
    workspace,
  },
  plugins: [createPersistedState({
    key: 'benjs',
    paths: ['workspace', 'editors'],
    setState: throttle((key, state, storage) => {
      console.log('saving state...');
      storage.setItem(key, JSON.stringify(state));
    }, 1000),
  })],
});
