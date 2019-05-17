<template>
  <div class="Editor">
    <div ref="editor" class="Editor-Container"></div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor';
import '@/scripts/editor-env';

export default {
  components: {
  },
  mounted() {
    monaco.editor.create(this.$refs.editor, {
      value: [
        'console.log("Editor!!");',
      ].join('\n'),
      language: 'javascript',
      theme: 'vs-dark',
      minimap: {
        enabled: false,
      }
    });
  },
};
</script>

<style lang="stylus" src="styles/components/Editor.styl"></style>
