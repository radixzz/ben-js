
function mockPropsPath(obj, path, value) {
  const props = path.split('.');
  let lastKey = null;
  if (arguments.length === 3) {
    lastKey = props.pop();
  }
  let headProp = obj;
  for (let i = 0; i < props.length; i++) {
    const name = props[i];
    headProp[name] = headProp[name] || {};
    headProp = headProp[name];
  }
  if (lastKey) {
    /* eslint-disable-next-line */
    headProp[lastKey] = value;
  }
  return obj;
}

function getNestedProp(obj, path) {
  const keys = path.split('.');
  return keys.reduce((prev, k) => prev && prev[k], obj);
}

export function bindFields(store, storePath, fields) {
  const obj = {};
  const storeModule = getNestedProp(store.state, storePath);
  fields.forEach((field) => {
    const prop = field.prop || field.getter;
    mockPropsPath(obj, prop, null);
    const parentPath = prop.split('.').slice(0, -1).join('.');
    const parentProp = getNestedProp(obj, parentPath) || obj;
    const targetKey = prop.split('.').pop();
    Object.defineProperty(parentProp, targetKey, {
      configurable: true,
      get() {
        if (field.getter) {
          return getNestedProp(store.getters, field.getter);
        }
        // read directly from store state object
        return getNestedProp(storeModule, field.prop);
      },
      set(val) {
        if (field.setter) {
          field.setter(store, val)
        } else {
          store.dispatch(field.action, val);
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
  const root = mockPropsPath({}, storePath, props);
  return root;
}
