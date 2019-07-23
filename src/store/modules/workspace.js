import {
  WORKSPACE_UPDATE,
  WORKSPACE_RESET,
} from './types/action-types';

import {
  WORKSPACE_SET_DESCRIPTION,
  WORKSPACE_SET_TITLE,
  WORKSPACE_SET_SLUG,
} from './types/mutation-types';

const DefaultProps = {
  slug: '',
  description: '',
  title: 'Untitled',
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}
