import {
  PROJECTS_RESTORE,
  PROJECTS_SAVE_CURRENT_TO_LOCAL,
  PROJECTS_SAVE_CURRENT_TO_REMOTE,
} from './types/action-types';

import {
  PROJECTS_ADD,
  PROJECTS_CLEAR,
} from './types/mutation-types';

const state = {
  items: []
};

const getters = {};

function parseJSON(str) {
  let result;
  try {
    result = JSON.parse(str);
  } catch (e) {
    result = null;
  }
  return result;
}

const actions = {
  async [PROJECTS_SAVE_CURRENT_TO_LOCAL]({ commit, dispatch }) {
    dispatch(PROJECTS_RESTORE);
  },
  async [PROJECTS_SAVE_CURRENT_TO_REMOTE]({ commit, dispatch }) {
    dispatch(PROJECTS_RESTORE);
  },
  async [PROJECTS_RESTORE]({ commit }) {
    commit(PROJECTS_CLEAR);
    Object.keys(localStorage)
      .filter(key => key !== 'benjs:unsaved')
      .map(key => parseJSON(localStorage[key]))
      .filter(obj => obj && typeof obj.workspace === 'object')
      .forEach(project => commit(PROJECTS_ADD, project));
  },
};

const mutations = {
  [PROJECTS_ADD](state, project) {
    state.items.push(project);
  },
  [PROJECTS_CLEAR](state) {
    state.items.splice(0);
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}
