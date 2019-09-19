import Vue from 'vue';
import Vuex from 'vuex';
import LocalStorage from './utils/local-storage';
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
  plugins: [
    LocalStorage({
      key: 'benjs',
      store: ['auth.offline'],
      routes: [
        {
          store: ['workspace', 'editors'],
          path: "/create",
          storageKey: 'unsaved',
        },
        {
          store: ['workspace', 'editors'],
          path: "/guest/:slug/edit",
          storageKey: (match) => {
            const { slug } = match.params;
            return `guest/${slug}`;
          },
        },
        {
          store: ['workspace', 'editors'],
          path: "/:username/:slug/edit",
          storageKey: (match) => {
            const { username, slug } = match.params;
            return `${username}/${slug}`;
          },
        },
      ]
    }),
  ],
});
