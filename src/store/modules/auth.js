import * as Firebase from '@/api/firebase';
import Github from '@/api/github';

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
  AUTH_SET_RESTORED,
} from './types/mutation-types';

const state = {
  offline: false,
  restored: false,
  user: {},
  token: null,
  error: null,
};

const getters = {
  signedIn: state => state.user.role !== undefined,
  userRole: state => state.user.role,
};

async function setFirebaseUser(commit, user) {
  return new Promise((resolve, reject) => {
    if (user) {
      user.getIdToken().then(async (token) => {
        commit(AUTH_SET_TOKEN, token);
        const api = new Github(token);
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
    } else {
      reject();
    }
  });
}

function setGuestUser(commit) {
  commit(AUTH_SET_USER, {
    role: 'guest',
    uid: 'guest',
    username: 'guest',
    avatarUrl: '/assets/logo.png',
  });
}

const actions = {
  async [AUTH_RESTORE]({ state, commit }) {
    const user = await Firebase.GetCurrentUser();
    if (user) {
      await setFirebaseUser(commit, user);
    } else if (state.offline) {
      setGuestUser(commit);
    }
    commit(AUTH_SET_RESTORED, true);
  },
  async [AUTH_SIGN_IN]({ commit }) {
    const gitScopes = ['gist', 'read:user'];
    await Firebase.SignIn(gitScopes);
    const user = await Firebase.GetCurrentUser();
    await setFirebaseUser(commit, user);
  },
  async [AUTH_SIGN_OUT]({ commit }) {
    await Firebase.SignOut();
    commit(AUTH_SET_USER, {});
    commit(AUTH_SET_TOKEN, null);
    commit(AUTH_SET_OFFLINE, false);
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
  [AUTH_SET_RESTORED](state, restored) {
    state.restored = restored;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}
