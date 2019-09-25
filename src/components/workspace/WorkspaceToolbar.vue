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
        v-if="!workspace.sidebar.visible"
        class="WorkspaceToolbar-LabelEdit"
        v-model="workspace.title"
      />
    </div>
    <div class="WorkspaceToolbar-BenchActions">
      <app-button icon="icon-export" hint="Export" text="Export" :solid='false'/>
      <app-button
        v-if="offline"
        @click="onSaveLocalClick"
        icon="icon-save"
        hint="Save your progress locally"
        text="Save"
        :solid='false'
      />
      <app-button
        v-else
        @click="onSaveRemoteClick"
        icon="icon-cloud-upload"
        hint="Save your progress remotely"
        text="Save"
        :solid='false'
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  WORKSPACE_UPDATE_TITLE,
  PROJECTS_SAVE_CURRENT_TO_LOCAL,
  PROJECTS_SAVE_CURRENT_TO_REMOTE,
} from '@/store/modules/types/action-types';
import { mapStateFields } from '@/utils/utils-vuex';
import AppButton from '@/components/AppButton.vue'
import LabelEdit from '@/components/LabelEdit.vue'

export default {
  components: {
    AppButton,
    LabelEdit,
  },
  methods: {
    async onSaveLocalClick() {
      console.log('saving local');
      const { dispatch } = this.$store;
      await dispatch(PROJECTS_SAVE_CURRENT_TO_LOCAL);
      console.log('done');
    },
    async onSaveRemoteClick() {
      const { dispatch } = this.$store;
      console.log('saving remotely');
      await dispatch(PROJECTS_SAVE_CURRENT_TO_LOCAL);
      await dispatch(PROJECTS_SAVE_CURRENT_TO_REMOTE);
      console.log('done');
    },
  },
  computed: {
    ...mapState({
      offline: state => state.auth.offline,
    }),
    ...mapStateFields('workspace', [
      { prop: 'sidebar.visible' },
      { action: WORKSPACE_UPDATE_TITLE, prop: 'title' },
    ])
  }
};
</script>

<style lang="stylus" src="styles/components/workspace/WorkspaceToolbar.styl"></style>
