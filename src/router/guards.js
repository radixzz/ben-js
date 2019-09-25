import Store from '@/store';
import {
  AUTH_RESTORE,
  AUTH_SIGN_OUT,
  PROJECTS_RESTORE
} from '@/store/modules/types/action-types';

export async function GlobalGuardBeforeEach(to, from, next) {
  await Store.dispatch(AUTH_RESTORE);
  await Store.dispatch(PROJECTS_RESTORE);
  const { auth } = to.meta;
  const { userRole } = Store.getters;
  const toLogin = auth && auth.enabled && !auth.roles.includes(userRole);
  if (toLogin) {
    next({ name: 'login', query: { after_login: to.path } });
  } else {
    next();
  }
}

export async function GuardBeforeLogin(to, from, next) {
  await Store.dispatch(AUTH_RESTORE);
  // already logged in?
  if (Store.getters.signedIn) {
    next({ name: 'home' });
  } else {
    next();
  }
}

export async function GuardBeforeLogout(to, from, next) {
  await Store.dispatch(AUTH_SIGN_OUT);
  next({ name: 'home' });
}

export async function GuardBeforeUserWorkspaceEdit(to, from, next) {
  await Store.dispatch(AUTH_RESTORE);
  await Store.dispatch(PROJECTS_RESTORE);
  // Sync with current project
  next();
}
