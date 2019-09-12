import {
  WORKSPACE_UPDATE_TITLE,
  WORKSPACE_UPDATE_DESCRIPTION,
  WORKSPACE_SIDEBAR,
  WORKSPACE_RESET,
} from '@/store/modules/types/action-types';

function mapProperties(self, moduleName, items) {
  return items.reduce((dict, item) => {
    const { action, prop } = item;
    Object.defineProperty(dict, prop, {
      configurable: true,
      set(val) {
        self.$store.dispatch(action, val);
      },
      get() {
        return self.$store.state[moduleName][prop];
      },
    });
    return dict;
  }, {});
}

export default {
  data() {
    return {
      workspace: mapProperties(this, 'workspace', [
        { action: WORKSPACE_UPDATE_TITLE, prop: 'title' },
        { action: WORKSPACE_UPDATE_DESCRIPTION, prop: 'description' },
        { action: WORKSPACE_SIDEBAR, prop: 'sidebar.visible' },
      ])
    }
  },
}
