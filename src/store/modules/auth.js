import GithubAPI from '@/api/github-api';

/*
  Actions
*/
export const AUTH_RESTORE = 'auth/restore';
export const AUTH_SIGN_IN = 'auth/sign-in';
export const AUTH_SIGN_OUT = 'auth/sign-out';

/*
  Mutations
*/
export const AUTH_SET_ERROR = 'auth/error';
export const AUTH_SET_USER = 'auth/set-user';
export const AUTH_SET_TOKEN = 'auth/set-token';

const state = {
  user: {},
  token: null,
  error: null,
};

const getters = {
  signedIn: state => !!state.token && !!state.user.uid
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
          await setUser(commit, user);
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
