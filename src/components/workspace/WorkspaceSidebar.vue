<template>
  <nav class="WorkspaceSidebar">
    <panes-container
      :sizes='[70, 30]'
      direction="vertical"
    >
      <panel-project />
      <panes-split/>
      <panel-explorer />
    </panes-container>
  </nav>
</template>

<script>
import PanesContainer from '@/components/panes/PanesContainer.vue';
import PanesSplit from '@/components/panes/PanesSplit.vue';
import PanelProject from '@/components/panels/PanelProject.vue';
import PanelExplorer from '@/components/panels/PanelExplorer.vue';

export default {
  components: {
    PanesContainer,
    PanesSplit,
    PanelProject,
    PanelExplorer,
  },
  methods: {
  },
};
</script>

<style lang="stylus" src="styles/components/workspace/WorkspaceSidebar.styl"></style>
