import {
  STORAGE_LOAD_WORKSPACE,
  STORAGE_UPDATE_WORKSPACE,
  STORAGE_REMOVE_WORKSPACE,
} from './types/action-types';

import { STORAGE_SET_WORKSPACE } from './types/mutation-types';

const state = {
  workspace: null,
  revisions: {},
  projects: {},
};

const getters = {}


const actions = {
  async [STORAGE_LOAD_WORKSPACE]({ commit }, slug) {
    console.log(STORAGE_LOAD_WORKSPACE, slug);
  },
  async [STORAGE_UPDATE_WORKSPACE]({ commit }, slug) {
    console.log(STORAGE_LOAD_WORKSPACE, slug);
  },
  async [STORAGE_REMOVE_WORKSPACE]({ commit }, slug) {
    console.log(STORAGE_REMOVE_WORKSPACE, id);
  },
}

const mutations = {
  [STORAGE_SET_WORKSPACE](state, payload) {
    state.workspace = payload;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
}
