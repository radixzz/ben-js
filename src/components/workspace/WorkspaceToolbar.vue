<template>
  <div class="WorkspaceToolbar">
    <div class="WorkspaceToolbar-LeftWrapper">
      <app-button
        class="WorkspaceToolbar-MenuButton"
        icon="icon-menu-bars"
        hint="Show/Hide Sidebar"
        :solid='false'
        @click="$emit('sidebarClick')"
      />
      <label-edit
        class="WorkspaceToolbar-LabelEdit"
        v-model="workspace.title"
      />
    </div>
    <div class="WorkspaceToolbar-BenchActions">
      <app-button icon="icon-export" hint="Export" text="Export" :solid='false'/>
      <app-button icon="icon-cloud-upload" hint="Save your progress remotely" text="Save" :solid='false'/>
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton.vue'
import LabelEdit from '@/components/LabelEdit.vue'
import MixinWorkspace from '@/mixins/MixinWorkspace';

export default {
  components: {
    AppButton,
    LabelEdit,
  },
  mixins: [
    MixinWorkspace
  ],
};
</script>

<style lang="stylus" src="styles/components/workspace/WorkspaceToolbar.styl"></style>
