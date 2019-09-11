<template>
  <div class="PanelProject">
    <panel
      title="Project Settings"
    >
      <form-edit
        id="project-name"
        label="Project Name"
        v-model="workspace.title"
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
import { mapState } from 'vuex'
import { WORKSPACE_UPDATE } from '@/store/modules/types/action-types';
import Panel from '@/components/panels/Panel.vue';
import FormEdit from '@/components/form/FormEdit.vue';
import FormTextArea from '@/components/form/FormTextArea.vue';

export default {
  components: {
    Panel,
    FormTextArea,
    FormEdit,
  },
  methods: {
    updateTitle(title) {
      this.updateWorskpace({ title });
    },
    updateDescription(description) {
      this.updateWorskpace({ description });
    },
    updateWorskpace(props) {
      const { slug, title, description } = this;
      this.$store.dispatch(WORKSPACE_UPDATE, {
        ...{ slug, title, description },
        ...props,
      });
    }
  },
  computed: {
    ...mapState({
      workspace: state => state.workspace,
    }),
  }
};
</script>

<style lang="stylus" src="styles/components/panels/PanelProject.styl"></style>
