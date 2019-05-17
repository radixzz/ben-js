<template>
  <section class="Benchmark">
    <toolbar class="Benchmark-Toolbar"/>
    <editor class="Benchmark-Editor"/>
  </section>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue';
import Editor from '@/components/Editor.vue';

export default {
  components: {
    Toolbar,
    Editor,
  },
};
</script>

<style lang="stylus" src="styles/views/Benchmark.styl"></style>
