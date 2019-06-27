<template>
  <section class="BenchmarkWorkspace">
    <workspace-sidebar
      ref="sidebar"
      v-show="sidebarVisible"
    />
    <div
      ref="mainPane"
      class="BenchmarkWorkspace-Main"
    >
      <workspace-toolbar
        class="BenchmarkWorkspace-Toolbar"
        @sidebarClick="toggleSidebar"
      />
      <tabs-container
        ref="tabsContainer"
        class="BenchmarkWorkspace-Editor"
        @addTabClick="addTab"
        @configureClick="configureBlock"
      >
        <tabs-section
          v-for="(editor, index) in editors"
          :key="index"
          :title="editor.title"
          :configurable="editor.configurable"
          :language="editor.lang"
          v-slot="{ visible }"
        >
          <workspace-editor
            v-model="editor.model"
            :active="visible"
            :lang="editor.lang"
            @change="onEditorChange(editor, $event)"
          />
        </tabs-section>
      </tabs-container>
      <workspace-console
        ref="console"
        class="BenchmarkWorskpace-Console"
      />
    </div>
    <workspace-editor-config
      @close="onConfigClosed"
      v-if="activeConfigEditor"
    />
  </section>
</template>

<script>
import Split from 'split.js';
import WorkspaceToolbar from '@/components/workspace/WorkspaceToolbar.vue';
import WorkspaceSidebar from '@/components/workspace/WorkspaceSidebar.vue';
import WorkspaceConsole from '@/components/workspace/WorkspaceConsole.vue';
import WorkspaceEditor from '@/components/workspace/WorkspaceEditor.vue';
import WorkspaceEditorConfig from '@/components/workspace/WorkspaceEditorConfig.vue';
import TabsContainer from '@/components/tabs/TabsContainer.vue';
import TabsSection from '@/components/tabs/TabsSection.vue';

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
  },
  data() {
    return {
      activeConfigEditor: null,
      sidebarVisible: false,
      editors: [
        {
          title: 'HTML Setup',
          model: '// Model Editor 1',
          lang: 'html',
          configurable: false,
        },
        {
          title: 'JS Setup',
          model: '// Model Editor 2',
          lang: 'javascript',
          configurable: false,
        },
      ],
    };
  },
  mounted() {
    this.toggleSidebar();
  },
  methods: {
    onEditorChange(editor, content) {
      editor.model = content;
    },
    addTab() {
      const { tabsContainer } = this.$refs;
      this.editors.push({
        title: `Test Case ${this.editors.length + 1}`,
        model: '// Type your test code here',
        lang: 'javascript',
        configurable: true,
      });
      this.$nextTick(() => {
        tabsContainer.updateTabs();
        tabsContainer.selectLastTab();
      });
    },
    toggleSidebar() {
      const { sidebar, mainPane } = this.$refs;
      this.sidebarVisible = !this.sidebarVisible;
      if (this.sidebarSplit) {
        this.sidebarSplit.destroy();
        this.sidebarSplit = undefined;
      }
      if (this.sidebarVisible) {
        this.sidebarSplit = Split([sidebar.$el, mainPane], {
          sizes: [10, 90],
          gutterSize: 5,
          expandToMin: true,
        })
      }
    },
    bindConsoleSplit() {
      const { sidebar, mainPane } = this.$refs;
      if (this.sidebarSplit) {
        this.sidebarSplit.destroy();
        this.sidebarSplit = undefined;
      }
      if (this.sidebarVisible) {
        this.sidebarSplit = Split([sidebar.$el, mainPane], {
          sizes: [10, 90],
          gutterSize: 5,
        })
      }
    },
    configureBlock(id) {
      this.activeConfigEditor = {};
      console.log('configuring', id);
    },
    onConfigClosed(config) {
      this.activeConfigEditor = null;
      console.log(config);
    }
  }
};
</script>

<style lang="stylus" src="styles/views/BenchmarkWorkspace.styl"></style>
