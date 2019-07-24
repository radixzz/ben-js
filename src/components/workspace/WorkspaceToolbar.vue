<template>
  <div class="WorkspaceToolbar">
    <app-button
      icon="icon-menu-bars"
      hint="Show/Hide Sidebar"
      :solid='false'
      @click="$emit('sidebarClick')"
    />
    <label-edit
      class="WorkspaceToolbar-LabelEdit"
      :text="title" @change="updateTitle"
    />
    <div class="WorkspaceToolbar-BenchActions">
      <app-button icon="icon-export" hint="Export" text="Export" :solid='false'/>
      <app-button icon="icon-cloud-upload" hint="Save your progress remotely" text="Save" :solid='false'/>
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
