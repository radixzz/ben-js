<template>
  <main id='app' class="App">
      <layout-header/>
      <router-view></router-view>
  </main>
</template>

<script>
import LayoutHeader from '@/components/layout/LayoutHeader.vue';

export default {
  name: 'app',
  components: {
    LayoutHeader,
  },
};
</script>

<style lang='stylus' src='styles/App.styl'></style>
