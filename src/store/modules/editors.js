import {
  EDITORS_RESET,
  EDITORS_CREATE,
  EDITORS_UPDATE_OPTIONS,
  EDITORS_UPDATE_CONTENT,
  EDITORS_DELETE,
  EDITORS_ACTIVE,
} from './types/action-types';

import {
  EDITORS_ADD,
  EDITORS_REMOVE,
  EDITORS_SET_CONTENT,
  EDITORS_SET_TITLE,
  EDITORS_SET_ASYNC,
  EDITORS_SET_CONFIGURABLE,
  EDITORS_SET_LIBRARIES,
  EDITORS_SET_LANG,
  EDITORS_SET_ACTIVE,
} from './types/mutation-types';

const DefaultHtmlSetupProps = {
  lang: 'html',
  title: 'HTML Setup',
  content: '',
  libraries: [],
  async: false,
  configurable: false,
};

const DefaultJsSetupProps = {
  lang: 'javascript',
  title: 'JS Setup',
  content: '',
  libraries: [],
  async: false,
  configurable: false,
}

const DefaultEditorProps = {
  lang: 'javascript',
  title: 'Untitled',
  content: '',
  libraries: [],
  async: false,
  configurable: true,
};

const state = {
  items: [],
  active: 'Unknown',
};

function getGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function getItemById(state, id) {
  return state.items.find(item => item.id === id);
}

function createId(state) {
  const guid = getGUID();
  // make sure is not already assigned to another editor
  if (getItemById(state, guid)) {
    return createId(state);
  }
  return guid;
}

function getEditorOrFail(state, id) {
  const editor = getItemById(state, id);
  if (!editor) {
    throw new Error(`Editor id not found: ${id}`);
  }
  return editor
}

const getters = {
  activeEditor: state => getItemById(state, state.active),
};

const actions = {
  [EDITORS_ACTIVE]({ state, commit }, id) {
    if (id && state.active !== id) {
      getEditorOrFail(state, id);
      commit(EDITORS_SET_ACTIVE, id);
    }
  },
  [EDITORS_RESET]({ state, dispatch }) {
    state.items.forEach(item => dispatch(EDITORS_DELETE, item.id));
    dispatch(EDITORS_CREATE, { ...DefaultHtmlSetupProps });
    dispatch(EDITORS_CREATE, { ...DefaultJsSetupProps });
    dispatch(EDITORS_CREATE, { title: 'Test Case A' });
    dispatch(EDITORS_CREATE, { title: 'Test Case B' });
  },
  [EDITORS_CREATE]({ state, commit, dispatch }, props = {}) {
    const id = createId(state);
    commit(EDITORS_ADD, id);
    dispatch(EDITORS_UPDATE_OPTIONS, { id, ...DefaultEditorProps, ...props });
    commit(EDITORS_SET_ACTIVE, id);
    return id;
  },
  [EDITORS_DELETE]({ state, commit }, { id }) {
    getEditorOrFail(state, id);
    commit(EDITORS_REMOVE, { id });
    if (state.active === id) {
      commit(EDITORS_SET_ACTIVE, 'Unknown');
    }
  },
  [EDITORS_UPDATE_CONTENT]({ commit }, payload) {
    commit(EDITORS_SET_CONTENT, payload);
  },
  [EDITORS_UPDATE_OPTIONS]({ state, commit }, payload) {
    const editor = getEditorOrFail(state, payload.id);
    const fields = { ...editor, ...payload };
    if (fields.lang !== editor.lang) commit(EDITORS_SET_LANG, fields)
    if (fields.title !== editor.title) commit(EDITORS_SET_TITLE, fields);
    if (fields.async !== editor.async) commit(EDITORS_SET_ASYNC, fields);
    if (fields.libraries !== editor.libraries) commit(EDITORS_SET_LIBRARIES, fields);
    if (fields.configurable !== editor.configurable) commit(EDITORS_SET_CONFIGURABLE, fields);

  },
};

const mutations = {
  [EDITORS_SET_ACTIVE](state, id) {
    state.active = id;
  },
  [EDITORS_ADD](state, id) {
    state.items.push({ id, ...DefaultEditorProps })
  },
  [EDITORS_REMOVE](state, { id }) {
    const idx = state.items.findIndex(item => item.id === id);
    state.items.splice(idx, 1);
  },
  [EDITORS_SET_TITLE](state, { id, title }) {
    const editor = getEditorOrFail(state, id);
    editor.title = title;
  },
  [EDITORS_SET_CONTENT](state, { id, content }) {
    const editor = getEditorOrFail(state, id);
    editor.content = content;
  },
  [EDITORS_SET_CONFIGURABLE](state, { id, configurable }) {
    const editor = getEditorOrFail(state, id);
    editor.configurable = configurable;
  },
  [EDITORS_SET_LIBRARIES](state, { id, libraries }) {
    const editor = getEditorOrFail(state, id);
    editor.libraries = libraries;
  },
  [EDITORS_SET_LANG](state, { id, lang }) {
    const editor = getEditorOrFail(state, id);
    editor.lang = lang;
  },
  [EDITORS_SET_ASYNC](state, { id, async }) {
    const editor = getEditorOrFail(state, id);
    editor.async = async;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}
