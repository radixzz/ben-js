export const LOAD_EDITOR_CONTENTS = 'editors/load-editor-content';
export const LOAD_EDITOR_SETTINGS = 'editors/load-editor-settings';
export const SET_EDITOR_CONTENT = 'editors/set-editor-content';
export const SET_EDITOR_SETTING = 'editors/set-editor-settings';

const state = {
  editors: [],
};

const getters = {};

function findEditorById({ editors }, id) {
  return editors.find(editor => editor.id === id);
}

const actions = {
  [LOAD_EDITORS]({ commit }) {

  },
  [LOAD_EDITOR_CONTENTS]({ commit }, { id }) {
    // Retrieve from Local Storage or API
    const content = '';
    const editor = findEditorById(state, id);
    commit(SET_EDITOR_CONTENT, { editor, content });
  },
  [LOAD_EDITOR_SETTINGS]({ state, commit }, { id }) {
    // Retrieve from Local Storage or API
    const settings = {};
    const editor = findEditorById(state, id);
    Object.keys(settings).forEach((key) => {
      commit(SET_EDITOR_SETTING, {
        editor,
        name: key,
        value: settings[key]
      });
    });
  }
};

const mutations = {
  [SET_EDITOR_CONTENT](_, { editor, content }) {
    editor.content = content;
  },
  [SET_EDITOR_SETTING](_, { editor, name, value }) {
    editor.settings[name] = value;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
