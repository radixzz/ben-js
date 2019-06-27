
/*
  Actions
*/
export const DB_FETCH_WORKSPACE = 'db/fetch-workspace';
export const DB_SAVE_WORKSPACE = 'db/save-workspace';
export const DB_FETCH_PROJECT = 'db/fetch-project';
export const DB_SAVE_PROJECT = 'db/save-project';
export const DB_FETCH_REVISIONS = 'db/fetch-revisions';
export const DB_SAVE_REVISIONS = 'db/save-revisions';

/*
  Mutations
*/
export const DB_SET_WORKSPACE = 'db/set-workspace';
export const DB_SET_DIRTY = 'db/set-workspace-pending';
export const DB_SET_PROJECT = 'db/set-project';
export const DB_SET_REVISION = 'db/set-revision';

const state = {
  workspace: null,
  revisions: {},
  projects: {},
  dirty: [],
};

const getters = {
  workspace_dirty: state => state.dirty.includes('workspace'),
};

const actions = {
  async [DB_FETCH_WORKSPACE]({ commit }, uid) {
    if (this.workspace !== null && uid) {
      const db = firebase.firestore();
      const workspace = await db.collection('workspaces').doc(uid).get();
      commit(DB_SET_WORKSPACE, workspace);
    }
  },
  async [DB_SAVE_WORKSPACE]({ commit }, uid) {
    if (uid && getters.workspace_dirty) {
      const db = firebase.firestore();
      await db.collection('workspaces').doc(uid).set(state.workspace);
      commit(DB_SET_DIRTY, 'workspace');
    }
  },
  async [DB_FETCH_PROJECT]({ commit }, { username, slug }) {
    if (!state.projects[slug]) {
      const db = firebase.firestore();
      const ref = db.collection('projects');
      ref.where('slug', slug);
      ref.where('username', username);
      const response = await ref.get();
      commit(DB_SET_PROJECT, { slug, response });
    }
  },
  // async [DB_SAVE_PROJECT]({ commit }, payload) {
  // },
};

const mutations = {
  [DB_SET_WORKSPACE](state, payload) {
    state.workspace = payload;
  },
  [DB_SET_DIRTY](state, payload) {
    state.dirty.push(payload);
  },
  [DB_SET_PROJECT](state, { id, payload }) {
    state.projects[id] = payload;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
}
