<template>
  <div class="PanelProject">
    <panel
      title="Project Settings"
    >
      <form-text-area
        id="project-description"
        class="PanelProject-TextArea"
        placeholder="What are you testing?"
        :maxLength='250'
        :rows='5'
        label="Description:"
      />
      <widget-libraries
        :items='libraries'
      />
    </panel>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Panel from '@/components/panels/Panel.vue';
import WidgetLibraries from '@/components/widgets/WidgetLibraries.vue';
import FormTextArea from '@/components/form/FormTextArea.vue';

export default {
  components: {
    Panel,
    WidgetLibraries,
    FormTextArea,
  },
  methods: {

  },
  computed: {
    ...mapState({
      libraries: state => state.workspace.libraries
    })
  }
};
</script>

<style lang="stylus" src="styles/components/panels/PanelProject.styl"></style>
