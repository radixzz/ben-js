<template>
  <header class="LayoutHeader">
    <router-link :to="{ name: 'home' }">
      <svg class="LayoutHeader-Logo">
          <use xlink:href="#ben-logo"/>
      </svg>
    </router-link>
    <div class="LayoutHeader-Menu">
      <div
        class="LayoutHeader-Login"
        @click="onLoginClick"
        title="Login with GitHub"
      >
          <svg><use xlink:href="#icon-github"/></svg>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  components: {
  },
  methods: {
    onLoginClick() {
      console.log('login')
    },
  }
};
</script>

<style lang="stylus" src="styles/components/layout/LayoutHeader.styl"></style>
