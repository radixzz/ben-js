<template>
  <div class="Toolbar">
    <label-edit :text="title" @change="updateTitle"></label-edit>
    <div class="Toolbar-BenchActions">
      <toolbar-button icon="play-triangle" hint="Run Benchmark" />
    </div>
  </div>
</template>

<script>
import ToolbarButton from '@/components/ToolbarButton.vue'
import LabelEdit from '@/components/LabelEdit.vue'

export default {
  components: {
    ToolbarButton,
    LabelEdit,
  },
  data() {
    return {
      title: 'Untitled Benchmark'
    }
  },
  methods: {
    updateTitle(title) {
      this.title = title;
    }
  }
};
</script>

<style lang="stylus" src="styles/components/Toolbar.styl"></style>
