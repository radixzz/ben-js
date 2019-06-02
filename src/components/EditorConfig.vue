<template>
  <layout-modal
    class="EditorConfig"
    title="Configure Code Block"
    @close="onCloseClick"
  >
    <form-edit label="Test Name"/>
    <form-group>
      <form-checkbox label="Async" />
      <div
        class="EditorConfig-Delete"
        @click="onDeleteClick"
      >
          <svg><use xlink:href="#icon-bin"/></svg>
          <span>Delete Case</span>
      </div>
    </form-group>
  </layout-modal>
</template>

<script>
import LayoutModal from '@/components/layout/LayoutModal.vue';
import FormEdit from '@/components/form/FormEdit.vue';
import FormCheckbox from '@/components/form/FormCheckbox.vue';
import FormGroup from '@/components/form/FormGroup.vue';

export default {
  name: 'EditorConfig',
  components: {
    LayoutModal,
    FormEdit,
    FormCheckbox,
    FormGroup,
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
};
</script>

<style lang="stylus" src="styles/components/EditorConfig.styl"></style>
