<template>
  <section class="BenchmarkWorkspace">
    <panes-container
      :sizes='[10, 90]'
      :minSize='[180, 620]'
      direction="horizontal"
      :enabled="sidebarVisible"
    >
      <workspace-sidebar
        class="BenchmarkWorkspace-Sidebar"
        v-show="sidebarVisible"
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
            @sidebarClick="sidebarVisible = !sidebarVisible"
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
        </div>
        <panes-split/>
        <workspace-console
          class="BenchmarkWorskpace-Console"
        />
      </panes-container>
    </panes-container>
    <workspace-editor-config
      @close="onConfigClosed"
      v-if="activeConfigEditor"
    />
  </section>
</template>

<script>
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
