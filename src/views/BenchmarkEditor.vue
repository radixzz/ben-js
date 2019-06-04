<template>
  <section class="BenchmarkEditor">
    <toolbar class="BenchmarkEditor-Toolbar"/>
    <tabs-container
      ref="tabsContainer"
      class="BenchmarkEditor-Editor"
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
        <editor
          v-model="editor.model"
          :active="visible"
          :lang="editor.lang"
          @change="onEditorChange(editor, $event)"
        />
      </tabs-section>
    </tabs-container>
    <editor-config
      @close="onConfigClosed"
      v-if="activeConfigEditor"
    />
  </section>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue';
import Editor from '@/components/Editor.vue';
import TabsContainer from '@/components/tabs/TabsContainer.vue';
import TabsSection from '@/components/tabs/TabsSection.vue';
import EditorConfig from '@/components/EditorConfig.vue';

export default {
  name: 'BenchmarkEditor',
  components: {
    Toolbar,
    Editor,
    TabsContainer,
    TabsSection,
    EditorConfig,
  },
  data() {
    return {
      activeConfigEditor: null,
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

<style lang="stylus" src="styles/views/BenchmarkEditor.styl"></style>
