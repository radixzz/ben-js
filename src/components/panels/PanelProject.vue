<template>
  <div class="PanelProject">
    <panel
      title="Project Settings"
    >
      <form-edit
        id="project-name"
        label="Project Name"
        v-model="title"
        :maxLength='40'
        @change="updateTitle"
      />
      <form-text-area
        id="project-description"
        class="PanelProject-TextArea"
        placeholder="What are you testing?"
        v-model="description"
        @change="updateDescription"
        :maxLength='250'
        :rows='5'
        label="Description:"
      />
    </panel>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { SET_TITLE, SET_DESCRIPTION } from '@/store/modules/workspace';
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
      this.$store.dispatch(SET_TITLE, title);
    },
    updateDescription(description) {
      this.$store.dispatch(SET_DESCRIPTION, description);
    }
  },
  computed: {
    ...mapState({
      title: state => state.workspace.title,
      description: state => state.workspace.description,
    }),
  }
};
</script>

<style lang="stylus" src="styles/components/panels/PanelProject.styl"></style>
