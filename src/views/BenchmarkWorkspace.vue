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
            @selectedTabChange="onSelectedTabChange"
            @configureClick="editorConfigVisible = true"
          >
            <tabs-section
              v-for="(editor, index) in editors"
              :key="index"
              :id="editor.id"
              :title="editor.title"
              :configurable="editor.configurable"
              :language="editor.lang"
              v-slot="{ visible }"
            >
              <workspace-editor
                v-model="editor.content"
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
      @close="editorConfigVisible = false"
      v-if="editorConfigVisible && activeEditor"
    />
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { EDITORS_RESET, EDITORS_CREATE, EDITORS_ACTIVE } from '@/store/modules/types/action-types'
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
      sidebarVisible: false,
      editorConfigVisible: true,
    };
  },
  mounted() {
    if (!this.initted) {
      this.initted = true;
      if (!this.loadWorkspace()) {
        this.loadDefault();
      }
    }
  },
  methods: {
    loadWorkspace() {
      const { $route } = this;
      return false;
    },
    loadDefault() {
      this.$store.dispatch(EDITORS_RESET);
    },
    onEditorChange(editor, content) {
      editor.model = content;
    },
    addTab() {
      this.$store.dispatch(EDITORS_CREATE, {
        title: `Test Case ${this.editors.length + 1}`,
        content: '// Type your test code here',
        lang: 'javascript',
        configurable: true,
      });
    },
    onSelectedTabChange(id) {
      if (id) {
        this.$store.dispatch(EDITORS_ACTIVE, id);
      }
    },
  },
  computed: {
    ...mapState({
      editors: state => state.editors.items,
    }),
    ...mapGetters([
      'activeEditor'
    ])
  },
};
</script>

<style lang="stylus" src="styles/views/BenchmarkWorkspace.styl"></style>
