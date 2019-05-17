<template>
  <section class="Benchmark">
    <bench-toolbar class="Benchmark-Toolbar"/>
    <editor class="Benchmark-Editor"/>
  </section>
</template>

<script>
import BenchToolbar from '@/components/BenchToolbar.vue';
import Editor from '@/components/Editor.vue';

export default {
  components: {
    BenchToolbar,
    Editor,
  },
};
</script>

<style lang="stylus" src="styles/views/Benchmark.styl"></style>
