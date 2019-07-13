<template>
  <div class="WorkspaceToolbar">
    <app-button
      icon="icon-menu-bars"
      hint="Show/Hide Sidebar"
      @click="$emit('sidebarClick')"
    />
    <label-edit
      class="WorkspaceToolbar-LabelEdit"
      :text="title" @change="updateTitle"
    />
    <div class="WorkspaceToolbar-BenchActions">
      <app-button icon="icon-export" hint="Export">Export</app-button>
      <app-button icon="icon-cloud-upload" hint="Save your progress remotely">Save</app-button>
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton.vue'
import LabelEdit from '@/components/LabelEdit.vue'

export default {
  components: {
    AppButton,
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

<style lang="stylus" src="styles/components/workspace/WorkspaceToolbar.styl"></style>
