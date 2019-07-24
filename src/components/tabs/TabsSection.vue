<template>
  <div
    v-show="visible"
    :id="id"
    class="TabsSection"
  >
    <slot :visible="visible"></slot>
  </div>
</template>

<script>

export default {
  name: 'TabsSection',
  props: {
    id: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    configurable: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    }
  },
};
</script>

<style lang="stylus" src="styles/components/tabs/TabsSection.styl"></style>
