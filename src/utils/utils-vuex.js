import { get, set } from 'lodash';

export function bindFields(store, storePath, fields) {
  const obj = {};
  const storeModule = get(store.state, storePath);
  fields.forEach((field) => {
    const prop = field.prop || field.getter;
    set(obj, prop, null);
    const parentPath = prop.split('.').slice(0, -1).join('.');
    const parentProp = get(obj, parentPath) || obj;
    const targetKey = prop.split('.').pop();
    Object.defineProperty(parentProp, targetKey, {
      configurable: true,
      get() {
        if (field.getter) {
          return get(store.getters, field.getter);
        }
        // read directly from store state object
        return get(storeModule, field.prop);
      },
      set(val) {
        if (field.setter) {
          field.setter(store, val)
        } else {
          const actions = Array.isArray(field.action) ? field.action : [field.action];
          actions.forEach(action => store.dispatch(action, val));
        }
      }
    })
  })
  return obj;
}

export function mapStateFields(storePath, fields) {
  let cacheEntry = null;
  const props = {
    get() {
      if (!cacheEntry) {
        cacheEntry = bindFields(this.$store, storePath, fields)
      }
      return cacheEntry;
    }
  };
  const root = set({}, storePath, props);
  return root;
}
