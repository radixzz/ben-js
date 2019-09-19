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
      paths: ['workspace', 'editors'],
      routes: [
        {
          path: "/create",
          storageKey: 'unsaved',
        },
        {
          path: "/guest/:slug/edit",
          storageKey: (match) => {
            const { slug } = match.params;
            return `guest/${slug}`;
          },
        },
        {
          path: "/:username/:slug/edit",
          storageKey: (match) => {
            const { username, slug } = match.params;
            return `${username}/${slug}`;
          },
        }
      ]
    }),
  ],
});
