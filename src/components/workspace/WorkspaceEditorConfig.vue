<template>
  <layout-modal
    class="WorkspaceEditorConfig"
    title="Configure Code Block"
    @close="onCloseClick"
  >
    <form-edit label="Test Name"/>
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
    <widget-libraries
      :items='libraries'
    />
  </layout-modal>
</template>

<script>
import { mapState } from 'vuex'
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
  data() {
    return {
    }
  },
  methods: {
    onDeleteClick() {
      this.$emit('delete');
      this.$emit('close');
    },
    onCloseClick() {
      this.$emit('close');
    }
  },
  computed: {
    ...mapState({
      libraries: state => state.workspace.libraries,
    }),
  },
};
</script>

<style lang="stylus" src="styles/components/workspace/WorkspaceEditorConfig.styl"></style>
