<template>
  <div class="PanelProject">
    <panel
      title="Project Settings"
    >
      <form-edit
        id="project-name"
        label="Project Name"
        v-model.lazy="workspace.title"
        :maxLength='40'
      />
      <form-text-area
        id="project-description"
        class="PanelProject-TextArea"
        placeholder="What are you testing?"
        v-model="workspace.description"
        :maxLength='250'
        :rows='5'
        label="Description:"
      />
    </panel>
  </div>
</template>

<script>
import Panel from '@/components/panels/Panel.vue';
import FormEdit from '@/components/form/FormEdit.vue';
import FormTextArea from '@/components/form/FormTextArea.vue';
import MixinWorkspace from '@/mixins/MixinWorkspace';

export default {
  name: 'PanelProject',
  components: {
    Panel,
    FormTextArea,
    FormEdit,
  },
  mixins: [
    MixinWorkspace,
  ],
};
</script>

<style lang="stylus" src="styles/components/panels/PanelProject.styl"></style>
