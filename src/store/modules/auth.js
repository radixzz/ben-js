import firebaseConfig from '@/firebase.json';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import GithubAPI from '@/api/github-api';

import {
  AUTH_RESTORE,
  AUTH_SIGN_IN,
  AUTH_SIGN_OUT,
} from './types/action-types';

import {
  AUTH_SET_ERROR,
  AUTH_SET_USER,
  AUTH_SET_TOKEN,
} from './types/mutation-types';

const app = firebase.initializeApp(firebaseConfig);

const state = {
  user: {},
  token: null,
  error: null,
};

const getters = {
  signedIn: state => !!state.token && !!state.user.uid,
  app: () => app,
};

async function setUser(commit, user) {
  return new Promise((resolve) => {
    if (user) {
      user.getIdToken().then(async (token) => {
        commit(AUTH_SET_TOKEN, token);
        const api = new GithubAPI(token);
        const { uid, email } = user.providerData[0];
        // get the username in a separated call (firebase is not providing this field)
        const gitUser = await api.getUserById(uid);
        commit(AUTH_SET_USER, {
          isAnonymous: false,
          name: gitUser.name,
          username: gitUser.login,
          avatarUrl: gitUser.avatar_url,
          email,
          uid,
        });
        resolve();
      });
    }
  });
}

const actions = {
  async [AUTH_RESTORE]({ commit }) {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged(
        async (user) => {
          if (user) {
            await setUser(commit, user);
          }
          resolve();
        }
      );
    })
  },
  async [AUTH_SIGN_IN]({ commit }) {
    return new Promise((resolve, reject) => {
      if (!firebase.auth().currentUser) {
        const provider = new firebase.auth.GithubAuthProvider();
        provider.addScope('gist');
        provider.addScope('read:user');
        firebase.auth().signInWithPopup(provider).then(
          async (result) => {
            await setUser(commit, result.user);
            resolve();
          }
        ).catch((error) => {
          commit(AUTH_SET_ERROR, {
            error,
          });
          reject(error);
        });
      }
    });
  },
  async [AUTH_SIGN_OUT]({ commit }) {
    return new Promise((resolve) => {
      firebase.auth().signOut().then(() => {
        commit(AUTH_SET_USER, {});
        commit(AUTH_SET_TOKEN, null);
        resolve();
      });
    });
  }
};

const mutations = {
  [AUTH_SET_USER](state, payload) {
    state.user = payload;
  },
  [AUTH_SET_TOKEN](state, token) {
    state.token = token;
  },
  [AUTH_SET_ERROR](state, error) {
    state.error = error;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}
