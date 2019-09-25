<template>
  <div class="PanelProjectSettings">
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
        class="PanelProjectSettings-TextArea"
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
import {
  WORKSPACE_UPDATE_TITLE,
  WORKSPACE_UPDATE_DESCRIPTION,
} from '@/store/modules/types/action-types';
import { mapStateFields } from '@/utils/utils-vuex';
import Panel from '@/components/panels/Panel.vue';
import FormEdit from '@/components/form/FormEdit.vue';
import FormTextArea from '@/components/form/FormTextArea.vue';

export default {
  name: 'PanelProjectSettings',
  components: {
    Panel,
    FormTextArea,
    FormEdit,
  },
  computed: {
    ...mapStateFields('workspace', [
      { action: WORKSPACE_UPDATE_TITLE, prop: 'title' },
      { action: WORKSPACE_UPDATE_DESCRIPTION, prop: 'description' },
    ])
  }
};
</script>

<style lang="stylus" src="styles/components/panels/PanelProjectSettings.styl"></style>
