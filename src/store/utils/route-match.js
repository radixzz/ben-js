import pathToRegexp from 'path-to-regexp';
import queryString from 'query-string';

export function routeMatch(routePattern, location) {
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

export function getMatchingRoute(routes) {
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
