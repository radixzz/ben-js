import { throttle } from 'lodash';
import pathToRegexp from 'path-to-regexp';
import queryString from 'query-string';
import createPersistedState from 'vuex-persistedstate';

function routeMatch(routePattern, location) {
  let result;
  const { pathname, search } = location;
  const regx = pathToRegexp(routePattern);
  if (regx.test(pathname)) {
    const match = regx.exec(pathname).slice(1);
    const tokens = pathToRegexp
      .parse(routePattern)
      .filter(t => typeof t === 'object');
    result = {
      path: pathname,
      params: match.reduce((prev, str, idx) => {
        prev[tokens[idx].name] = str;
        return prev;
      }, {}),
      query: queryString.parse(search),
    };
  }
  return result;
}

function getMatchingRoute(routes) {
  const { location } = window
  let result;
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    const match = routeMatch(route.path, location);
    if (match) {
      result = { ...match, route };
    }
  }
  return result;
}

function getStorageKey(match) {
  const { storageKey } = match.route;
  const isFuncKey = typeof storageKey === 'function';
  return isFuncKey ? storageKey(match) : storageKey;
}

function setStorageState(globalKey, localKey, state, storage) {
  const key = `${globalKey}:${localKey}`;
  storage.setItem(key, JSON.stringify(state));
}

function getStorageState(globalKey, localKey, storage) {
  const key = `${globalKey}:${localKey}`;
  const val = storage.getItem(key);
  if (val !== undefined) {
    return JSON.parse(val);
  }
  return undefined;
}

const setStateThrottled = throttle(setStorageState, 1000);

export default function LocalStorage(config) {
  return createPersistedState({
    key: config.key,
    paths: config.paths,
    setState(globalKey, state, storage) {
      const match = getMatchingRoute(config.routes);
      if (match) {
        const localKey = getStorageKey(match);
        setStateThrottled(globalKey, localKey, state, storage);
      }
    },
    getState(globalKey, storage) {
      const match = getMatchingRoute(config.routes);
      if (match) {
        const localKey = getStorageKey(match);
        return getStorageState(globalKey, localKey, storage);
      }
      return undefined;
    }
  });
}
