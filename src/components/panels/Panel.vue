<template>
  <div class="Panel">
    <div class="Panel-Title">{{ title }}</div>
    <div class="Panel-Content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Panel',
  components: {},
  methods: {},
  props: {
    title: {
      type: String,
      default: '',
    }
  }
};
</script>

<style lang="stylus" src="styles/components/panels/Panel.styl"></style>
