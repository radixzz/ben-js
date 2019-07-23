import fuzzysort from 'fuzzysort';
import superagent from 'superagent';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

import { CDNJS_FETCH_LIBRARIES } from './types/action-types';
import {
  CDNJS_SET_LIBRARIES,
  CDNJS_SET_TARGETS,
  CDNJS_SET_URL_TEMPLATE,
} from './types/mutation-types'

const BUCKET_URL = 'gs://benjs-dev.appspot.com/editor/cdnjs-libraries.json';

const state = {
  url_template: null,
  libraries: null,
  targets: null,
};

const getters = {}

function prepareSearchTargets(libraries) {
  return libraries.map((item, index) => ({
    index,
    name: fuzzysort.prepare(item.name),
    keywords: fuzzysort.prepare(item.keywords),
    description: fuzzysort.prepare(item.description.substring(0, 300)),
  }));
}

function formatResponse(response) {
  const { items } = response;
  const result = [];
  for (let i = 0; i < items.length; i += 5) {
    result.push({
      name: items[i + 0],
      filename: items[i + 1],
      description: items[i + 2],
      keywords: items[i + 3],
      versions: items[i + 4],
    });
  }
  return result;
}

const actions = {
  async [CDNJS_FETCH_LIBRARIES]({ commit, state }) {
    if (state.libraries === null) {
      const storage = firebase.storage();
      const ref = storage.refFromURL(BUCKET_URL);
      const url = await ref.getDownloadURL();
      const response = await superagent.get(url)
      const formatted = formatResponse(response.body);
      commit(CDNJS_SET_URL_TEMPLATE, response.body.url_template);
      commit(CDNJS_SET_LIBRARIES, formatted);
      commit(CDNJS_SET_TARGETS, prepareSearchTargets(formatted));
    }
  },
}

const mutations = {
  [CDNJS_SET_LIBRARIES](state, payload) {
    state.libraries = payload;
  },
  [CDNJS_SET_TARGETS](state, payload) {
    state.targets = payload;
  },
  [CDNJS_SET_URL_TEMPLATE](state, payload) {
    state.url_template = payload;
  }
};

export default {
  state,
  actions,
  getters,
  mutations,
}
