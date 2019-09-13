
import {
  WORKSPACE_UPDATE_TITLE,
  WORKSPACE_UPDATE_DESCRIPTION,
  WORKSPACE_SIDEBAR,
  WORKSPACE_RESET,
} from '@/store/modules/types/action-types';

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

function bindFields(store, storePath, fields) {
  const obj = {};
  const storeModule = getNestedProp(store.state, storePath);
  fields.forEach((field) => {
    mockPropsPath(obj, field.prop, null);
    const parentPath = field.prop.split('.').slice(0, -1).join('.');
    const parentProp = getNestedProp(obj, parentPath) || obj;
    const targetKey = field.prop.split('.').pop();
    Object.defineProperty(parentProp, targetKey, {
      configurable: true,
      get() {
        return getNestedProp(storeModule, field.prop);
      },
      set(val) {
        store.dispatch(field.action, val);
      }
    })
  })
  return obj;
}

function mapStoreModule(storePath, fields) {
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

export default {
  computed: {
    ...mapStoreModule('workspace', [
      { action: WORKSPACE_UPDATE_TITLE, prop: 'title' },
      { action: WORKSPACE_UPDATE_DESCRIPTION, prop: 'description' },
      { action: WORKSPACE_SIDEBAR, prop: 'sidebar.visible' },
    ])
  }
}
