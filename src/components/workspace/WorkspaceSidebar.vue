<template>
  <nav class="WorkspaceSidebar">
    <panes-container
      :sizes='[70, 30]'
      direction="vertical"
    >
      <panel-project-settings />
      <panes-split/>
      <panel-projects />
    </panes-container>
  </nav>
</template>

<script>
import PanesContainer from '@/components/panes/PanesContainer.vue';
import PanesSplit from '@/components/panes/PanesSplit.vue';
import PanelProjectSettings from '@/components/panels/PanelProjectSettings.vue';
import PanelProjects from '@/components/panels/PanelProjects.vue';

export default {
  components: {
    PanesContainer,
    PanesSplit,
    PanelProjectSettings,
    PanelProjects,
  },
  methods: {
  },
};
</script>

<style lang="stylus" src="styles/components/workspace/WorkspaceSidebar.styl"></style>
