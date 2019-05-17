<template>
  <div class="Toolbar">
    <toolbar-button icon="play-triangle" hint="Run Benchmark" />
  </div>
</template>

<script>
import ToolbarButton from '@/components/ToolbarButton.vue'

export default {
  components: {
    ToolbarButton,
  },
};
</script>

<style lang="stylus" src="styles/components/Toolbar.styl"></style>
