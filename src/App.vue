<template>
  <main id='app' class="App">
      <layout-header
        v-if="authRestored"
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
import { mapState } from 'vuex'
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
  computed: {
    ...mapState({
      authRestored: state => state.auth.restored,
    })
  }
};
</script>

<style lang='stylus' src='styles/App.styl'></style>
