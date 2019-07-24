<template>
  <layout-modal
    class="WorkspaceEditorConfig"
    title="Configure Code Block"
    @close="onCloseClick"
  >
    <form-edit
      label="Test Title"
      @change="onTitleChanged"
      v-model="activeEditor.title"
    />
    <form-group>
      <form-checkbox
        label="Async"
        v-model="activeEditor.async"
        @change="onAsyncChanged"
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
import { mapGetters } from 'vuex'
import { EDITORS_UPDATE } from '@/store/modules/types/action-types'
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
      this.$emit('delete', this.activeEditor.id);
      this.$emit('close');
    },
    onCloseClick() {
      this.$emit('close');
    },
    onTitleChanged(title) {
      this.$store.dispatch(EDITORS_UPDATE, { id: this.activeEditor.id, title });
    },
    onAsyncChanged(async) {
      this.$store.dispatch(EDITORS_UPDATE, { id: this.activeEditor.id, async });
    },

  },
  computed: {
    ...mapGetters([
      'activeEditor',
    ])
  }
};
</script>

<style lang="stylus" src="styles/components/workspace/WorkspaceEditorConfig.styl"></style>
