<template>
  <div class="WorkspaceEditor" v-resize:debounce="onResize">
    <div ref="editor" class="WorkspaceEditor-Container"></div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import resize from 'vue-resize-directive';

export default {
  data() {
    return {
      initialized: false,
      editor: null,
    }
  },
  directives: {
    resize,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: false,
    },
    lang: {
      type: String,
      default: 'javascript',
    }
  },
  model: {
    event: 'change',
  },
  mounted() {
    this.createEditor();
    this.initialized = true;
  },
  methods: {
    createEditor() {
      this.editor = monaco.editor.create(this.$refs.editor, {
        value: this.content,
        language: this.lang,
        theme: 'vs-dark',
        minimap: {
          enabled: false,
        },
      });
      this.editor.onDidChangeModelContent(this.onModelChange)
    },
    onModelChange() {
      this.$emit('change', this.id, this.editor.getValue());
    },
    onResize() {
      if (this.initialized) {
        const { $el, editor } = this;
        const { width, height } = $el.getBoundingClientRect();
        editor.layout({ width, height });
      }
    }
  },
  watch: {
    active(value) {
      if (value) {
        this.$nextTick(() => {
          this.onResize();
        })
      }
    },
    content(str) {
      const { editor } = this;
      if (this.content !== str) {
        editor.setValue(str);
      }
    }
  }
};
</script>

<style lang="stylus" src="styles/components/workspace/WorkspaceEditor.styl"></style>
