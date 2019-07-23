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
      <form-checkbox label="Async" />
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
import { EDITORS_UPDATE, EDITORS_DELETE } from '@/store/modules/types/action-types'
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
      this.$emit('delete');
      this.$emit('close');
    },
    onCloseClick() {
      this.$emit('close');
    },
    onTitleChanged(value) {
      console.log('Title Changed', value);
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
