<template>
  <section class="BenchmarkWorkspace">
    <panes-container
      :sizes='[10, 90]'
      :minSize='[180, 620]'
      direction="horizontal"
      :enabled="workspace.sidebar.visible"
    >
      <workspace-sidebar
        class="BenchmarkWorkspace-Sidebar"
        v-show="workspace.sidebar.visible"
      />
      <panes-split/>
      <panes-container
        class="BenchmarkWorkspace-Main"
        :sizes='[90, 10]'
        :minSize='[300, 50]'
        direction="vertical"
      >
        <div class="BenchmarkWorkspace-Pane">
          <workspace-toolbar
            class="BenchmarkWorkspace-Toolbar"
            @sidebarClick="onSideBarClick"
          />
          <tabs-container
            ref="tabsContainer"
            class="BenchmarkWorkspace-Editor"
            :tabs="editorTabs"
            :selectedId="activeId"
            @addClick="onTabAddClick"
            @tabClick="onTabClick"
            @configureClick="editorConfigVisible = true"
          >
            <tabs-section
              v-for="(editor, index) in editors"
              :key="index"
              :id="editor.id"
              :title="editor.title"
              :configurable="editor.configurable"
              :language="editor.lang"
              :visible="editor.id === activeId"
            >
              <workspace-editor
                :id="editor.id"
                :content="editor.content"
                :active="editor.id === activeId"
                :lang="editor.lang"
                @change="onEditorChange"
              />
            </tabs-section>
          </tabs-container>
        </div>
        <panes-split/>
        <workspace-console
          class="BenchmarkWorskpace-Console"
        />
      </panes-container>
    </panes-container>
    <workspace-editor-config
      @close="editorConfigVisible = false"
      @delete="onEditorDelete"
      v-if="editorConfigVisible && activeEditor"
    />
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import {
  EDITORS_RESET,
  EDITORS_DELETE,
  EDITORS_CREATE,
  EDITORS_UPDATE_CONTENT,
  EDITORS_ACTIVE,
  WORKSPACE_SIDEBAR,
} from '@/store/modules/types/action-types'
import WorkspaceToolbar from '@/components/workspace/WorkspaceToolbar.vue';
import WorkspaceSidebar from '@/components/workspace/WorkspaceSidebar.vue';
import WorkspaceConsole from '@/components/workspace/WorkspaceConsole.vue';
import WorkspaceEditor from '@/components/workspace/WorkspaceEditor.vue';
import WorkspaceEditorConfig from '@/components/workspace/WorkspaceEditorConfig.vue';
import TabsContainer from '@/components/tabs/TabsContainer.vue';
import TabsSection from '@/components/tabs/TabsSection.vue';
import PanesContainer from '@/components/panes/PanesContainer.vue';
import PanesSplit from '@/components/panes/PanesSplit.vue';

export default {
  name: 'BenchmarkWorkspace',
  components: {
    WorkspaceSidebar,
    WorkspaceToolbar,
    WorkspaceEditor,
    WorkspaceConsole,
    WorkspaceEditorConfig,
    TabsContainer,
    TabsSection,
    PanesContainer,
    PanesSplit,
  },
  data() {
    return {
      initted: false,
      editorConfigVisible: false,
    };
  },
  mounted() {
    if (!this.initted) {
      this.initted = true;
      this.loadDefault();
    }
  },
  methods: {
    loadDefault() {
      if (this.editors.length === 0) {
        this.$store.dispatch(EDITORS_RESET);
      }
    },
    onEditorChange(editorId, content) {
      this.$store.dispatch(EDITORS_UPDATE_CONTENT, {
        id: editorId,
        content,
      });
    },
    onEditorDelete(id) {
      const currIndex = this.editors.findIndex(editor => editor.id === id);
      const nextEditor = this.editors[currIndex + 1] || this.editors[currIndex - 1] || 0;
      this.$store.dispatch(EDITORS_DELETE, { id });
      this.$store.dispatch(EDITORS_ACTIVE, nextEditor.id);
    },
    onSideBarClick() {
      this.$store.dispatch(WORKSPACE_SIDEBAR, { visible: !this.workspace.sidebar.visible });
    },
    onTabAddClick() {
      this.$store.dispatch(EDITORS_CREATE, {
        title: `Test Case ${this.editors.length + 1}`,
        content: '// Type your test code here',
        lang: 'javascript',
        configurable: true,
      });
    },
    onTabClick(id) {
      this.$store.dispatch(EDITORS_ACTIVE, id);
    },
  },
  computed: {
    ...mapState({
      editors: state => state.editors.items,
      workspace: state => state.workspace,
    }),
    ...mapGetters([
      'activeEditor',
    ]),
    activeId() {
      return this.activeEditor ? this.activeEditor.id : '';
    },
    editorTabs() {
      const { editors } = this;
      return editors.map(e => ({
        id: e.id,
        title: e.title,
        configurable: e.configurable,
      }))
    },
  },
};
</script>

<style lang="stylus" src="styles/views/BenchmarkWorkspace.styl"></style>
