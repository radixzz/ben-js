import {
  WORKSPACE_UPDATE,
  WORKSPACE_RESET,
  WORKSPACE_SIDEBAR,
} from './types/action-types';

import {
  WORKSPACE_SET_DESCRIPTION,
  WORKSPACE_SET_TITLE,
  WORKSPACE_SET_SLUG,
  WORKSPACE_SET_SIDEBAR,
} from './types/mutation-types';

const DefaultProps = {
  slug: '',
  description: '',
  title: 'Untitled',
  sidebar: {
    visible: false,
  },
};

const state = {
  ...DefaultProps,
};

const getters = {};

const actions = {
  [WORKSPACE_UPDATE]({ commit }, { slug, title, description }) {
    if (slug !== state.slug) commit(WORKSPACE_SET_SLUG, slug)
    if (title !== state.title) commit(WORKSPACE_SET_TITLE, title)
    if (description !== state.description) commit(WORKSPACE_SET_DESCRIPTION, description);
  },
  [WORKSPACE_RESET]({ dispatch }) {
    dispatch(WORKSPACE_UPDATE, { ...DefaultProps });
  },
  [WORKSPACE_SIDEBAR]({ commit }, payload) {
    commit(WORKSPACE_SET_SIDEBAR, payload)
  },
};

const mutations = {
  [WORKSPACE_SET_SLUG](state, slug) {
    state.slug = slug;
  },
  [WORKSPACE_SET_TITLE](state, title) {
    state.title = title;
  },
  [WORKSPACE_SET_DESCRIPTION](state, description) {
    state.description = description;
  },
  [WORKSPACE_SET_SIDEBAR](state, config) {
    state.sidebar.visible = config.visible;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}
