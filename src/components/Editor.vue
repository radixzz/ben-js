<template>
  <div class="Editor" v-viewport-size:debounce.100="onResize">
    <div ref="editor" class="Editor-Container"></div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor';
import '@/scripts/editor-env';

export default {
  data() {
    return {
      initialized: false,
      editor: null,
    }
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.createEditor();
    this.initialized = true;
  },
  methods: {
    createEditor() {
      this.editor = monaco.editor.create(this.$refs.editor, {
        value: this.value,
        language: 'javascript',
        theme: 'vs-dark',
        minimap: {
          enabled: false,
        },
      });
      this.editor.onDidChangeModelContent(this.onModelChange)
    },
    onModelChange() {
      this.$emit('change', this.editor.getValue());
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
    value(model) {
      const { editor } = this;
      if (this.value !== model) {
        editor.setValue(model);
      }
    }
  }
};
</script>

<style lang="stylus" src="styles/components/Editor.styl"></style>
