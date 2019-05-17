<template>
  <header class="LayoutHeader">
    <router-link :to="{ name: 'home' }">
      <svg class="LayoutHeader-Logo">
          <use xlink:href="#ben-logo"/>
      </svg>
    </router-link>
  </header>
</template>

<script>
export default {
  components: {
  },
};
</script>

<style lang="stylus" src="styles/components/layout/LayoutHeader.styl"></style>
