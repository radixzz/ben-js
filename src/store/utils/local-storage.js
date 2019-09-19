import {
  throttle,
  get,
  set,
  merge
} from 'lodash';
import createPersistedState from 'vuex-persistedstate';
import { getMatchingRoute } from './route-match';

function getStorageKey(match) {
  const { storageKey } = match.route;
  const isFuncKey = typeof storageKey === 'function';
  return isFuncKey ? storageKey(match) : storageKey;
}

function getFilteredState(storeProps, state) {
  return storeProps.reduce((obj, prop) => set(obj, prop, get(state, prop)), {});
}

function setStorageState(key, state, storage) {
  storage.setItem(key, JSON.stringify(state));
  console.log('localStorage: write - ', key);
}

function getStorageState(key, storage) {
  const val = storage.getItem(key);
  console.log('localStorage: read - ', key);
  if (val !== undefined) {
    return JSON.parse(val);
  }
  return undefined;
}

/*
  From root state pick the keys related to
  first matching route and return it.
*/
function getRouteMatch(routes, callback) {
  const match = getMatchingRoute(routes);
  if (match) {
    const localKey = getStorageKey(match);
    callback(localKey, match);
  }
}

const setStateThrottled = throttle(setStorageState, 100);

export default function LocalStorage(config) {
  console.log('localStorage is initted');
  return createPersistedState({
    key: config.key,
    // paths: config.store,
    setState(globalKey, state, storage) {
      const states = [];
      // extract only defined route states
      getRouteMatch(config.routes, (key, match) => {
        const routePaths = match.route.store;
        states.push({
          key: `${globalKey}:${key}`,
          state: getFilteredState(routePaths, state)
        });
      })
      // extract global defined states
      if (config.store && config.store.length > 0) {
        states.push({
          key: globalKey,
          state: getFilteredState(config.store, state)
        });
      }
      states.forEach(entry => setStateThrottled(entry.key, entry.state, storage));
    },
    getState(globalKey, storage) {
      let state = {};
      // attach route state
      getRouteMatch(config.routes, (key) => {
        state = merge(state, getStorageState(`${globalKey}:${key}`, storage));
      });
      // attach global state
      if (config.store && config.store.length > 0) {
        const globalState = getStorageState(globalKey, storage);
        state = merge(state, globalState);
      }
      return state;
    }
  });
}
