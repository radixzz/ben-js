export const LOAD_CONTENTS = 'workspace/load-contents';
export const LOAD_SETTINGS = 'workspace/load-settings';
export const SET_CONTENT = 'workspace/set-content';
export const SET_DESCRIPTION = 'workspace/set-description';
export const SET_TITLE = 'workspace/set-title';
export const SET_SETTING = 'workspace/set-settings';

const state = {
  editors: [],
  libraries: [
    { name: "three", version: "0.106.2" },
    { name: "lodash-minimal-development-version", version: "4.17.11" },
  ],
  title: "Untitled",
  description: "",
};

const getters = {};

function findEditorById({ editors }, id) {
  return editors.find(editor => editor.id === id);
}

const actions = {
  // [LOAD_EDITORS]({ commit }) {},
  [LOAD_CONTENTS]({ commit }, { id }) {
    // Retrieve from Local Storage or API
    const content = '';
    const editor = findEditorById(state, id);
    commit(SET_CONTENT, { editor, content });
  },
  [LOAD_SETTINGS]({ state, commit }, { id }) {
    // Retrieve from Local Storage or API
    const settings = {};
    const editor = findEditorById(state, id);
    Object.keys(settings).forEach((key) => {
      commit(SET_SETTING, {
        editor,
        name: key,
        value: settings[key]
      });
    });
  },
  [SET_TITLE]({ commit }, title) {
    commit(SET_TITLE, title)
  },
  [SET_DESCRIPTION]({ commit }, title) {
    commit(SET_DESCRIPTION, title)
  }
};

const mutations = {
  [SET_CONTENT](_, { editor, content }) {
    editor.content = content;
  },
  [SET_SETTING](_, { editor, name, value }) {
    editor.settings[name] = value;
  },
  [SET_TITLE](state, title) {
    state.title = title;
  },
  [SET_DESCRIPTION](state, description) {
    state.description = description;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}
