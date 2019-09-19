import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import firebaseConfig from '@/firebase.json';
import GithubAPI from '@/api/github-api';

import {
  AUTH_RESTORE,
  AUTH_SIGN_IN,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN_GUEST,
} from './types/action-types';

import {
  AUTH_SET_ERROR,
  AUTH_SET_USER,
  AUTH_SET_TOKEN,
  AUTH_SET_OFFLINE,
} from './types/mutation-types';

const app = firebase.initializeApp(firebaseConfig);
const state = {
  offline: false,
  user: {},
  token: null,
  error: null,
};

const getters = {
  signedIn: state => state.user.role !== undefined,
  userRole: state => state.user.role,
  app: () => app,
};

async function setFirestoreUser(commit, user) {
  return new Promise((resolve) => {
    if (user) {
      user.getIdToken().then(async (token) => {
        commit(AUTH_SET_TOKEN, token);
        const api = new GithubAPI(token);
        const { uid, email } = user.providerData[0];
        // get the username in a separated call (firebase is not providing this field)
        const gitUser = await api.getUserById(uid);
        commit(AUTH_SET_USER, {
          role: 'user',
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

function setGuestUser(commit) {
  commit(AUTH_SET_USER, {
    role: 'guest',
    uid: 'guest',
    username: 'Guest',
    avatarUrl: '/assets/logo.png',
  });
}

const actions = {
  async [AUTH_RESTORE]({ state, commit }) {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged(
        async (user) => {
          if (user) {
            await setFirestoreUser(commit, user);
          } else if (state.offline) {
            setGuestUser(commit);
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
            await setFirestoreUser(commit, result.user);
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
        commit(AUTH_SET_OFFLINE, false);
        resolve();
      });
    });
  },
  [AUTH_SIGN_IN_GUEST]({ commit }) {
    commit(AUTH_SET_OFFLINE, true);
    setGuestUser(commit);
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
  },
  [AUTH_SET_OFFLINE](state, offline) {
    state.offline = offline;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
}
