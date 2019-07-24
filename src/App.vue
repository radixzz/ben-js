<template>
  <main id='app' class="App">
      <layout-header
        @menuClick="menuVisible = true"
      />
      <layout-user-menu
        v-if="menuVisible"
        @close="menuVisible = false"
      />
      <router-view></router-view>
  </main>
</template>

<script>
import LayoutHeader from '@/components/layout/LayoutHeader.vue';
import LayoutUserMenu from '@/components/layout/LayoutUserMenu.vue';

export default {
  name: 'app',
  components: {
    LayoutHeader,
    LayoutUserMenu,
  },
  data() {
    return {
      menuVisible: false,
    }
  },
};
</script>

<style lang='stylus' src='styles/App.styl'></style>
