<template>
  <layout-modal
    class="WorkspaceEditorConfig"
    title="Configure Code Block"
    @close="onCloseClick"
  >
    <form-edit
      label="Test Title"
      v-model="editors.activeEditor.title"
    />
    <form-group>
      <form-checkbox
        label="Async"
        v-model="editors.activeEditor.async"
      />
      <div
        class="WorkspaceEditorConfig-Delete"
        @click="onDeleteClick"
      >
          <svg><use xlink:href="#icon-bin"/></svg>
          <span>Delete Case</span>
      </div>
    </form-group>
    <widget-libraries/>
  </layout-modal>
</template>

<script>
import { EDITORS_UPDATE_OPTIONS } from '@/store/modules/types/action-types';
import { mapStateFields } from '@/utils/utils-vuex';
import WidgetLibraries from '@/components/widgets/WidgetLibraries.vue';
import LayoutModal from '@/components/layout/LayoutModal.vue';
import FormEdit from '@/components/form/FormEdit.vue';
import FormCheckbox from '@/components/form/FormCheckbox.vue';
import FormGroup from '@/components/form/FormGroup.vue';

export default {
  name: 'WorkspaceEditorConfig',
  components: {
    FormEdit,
    FormGroup,
    LayoutModal,
    FormCheckbox,
    WidgetLibraries,
  },
  methods: {
    onDeleteClick() {
      this.$emit('delete', this.editors.active);
      this.$emit('close');
    },
    onCloseClick() {
      this.$emit('close');
    },
  },
  computed: {
    ...mapStateFields('editors', [
      { prop: 'active' },
      {
        getter: 'activeEditor.title',
        setter: (store, value) => {
          store.dispatch(EDITORS_UPDATE_OPTIONS, {
            id: store.getters.activeEditor.id,
            title: value
          });
        },
      },
      {
        getter: 'activeEditor.async',
        setter: (store, value) => {
          store.dispatch(EDITORS_UPDATE_OPTIONS, {
            id: store.getters.activeEditor.id,
            async: value
          });
        },
      }
    ])
  }
};
</script>

<style lang="stylus" src="styles/components/workspace/WorkspaceEditorConfig.styl"></style>
