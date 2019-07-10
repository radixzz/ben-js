
/*
  Actions
*/
export const STORAGE_FETCH_WORKSPACE = 'storage/fetch-workspace';
export const STORAGE_SAVE_WORKSPACE = 'storage/save-workspace';
export const STORAGE_FETCH_PROJECT = 'storage/fetch-project';
export const STORAGE_SAVE_PROJECT = 'storage/save-project';
export const STORAGE_FETCH_REVISIONS = 'storage/fetch-revisions';
export const STORAGE_SAVE_REVISIONS = 'storage/save-revisions';

/*
  Mutations
*/
export const STORAGE_SET_WORKSPACE = 'storage/set-workspace';
export const STORAGE_SET_DIRTY = 'storage/set-workspace-pending';
export const STORAGE_SET_PROJECT = 'storage/set-project';
export const STORAGE_SET_REVISION = 'storage/set-revision';

const state = {
  workspace: null,
  revisions: {},
  projects: {},
};

const getters = {}

const actions = {
  async [STORAGE_FETCH_WORKSPACE]({ commit }, id) {
    console.log("TCL: id", id);
  },
  async [STORAGE_SAVE_WORKSPACE]({ commit }, id) {
    console.log("TCL: id", id);
  },
}

const mutations = {
  [STORAGE_SET_WORKSPACE](state, payload) {
    state.workspace = payload;
  },
  [STORAGE_SET_DIRTY](state, payload) {
    state.dirty.push(payload);
  },
  [STORAGE_SET_PROJECT](state, { id, payload }) {
    state.projects[id] = payload;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
}
