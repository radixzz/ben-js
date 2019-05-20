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
    title: {
      type: String,
      default: '',
    },
    configurable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
    }
  },
  mounted() {
  },
  computed: {
    id() {
      const { _uid } = this;
      return `tab-${_uid}`
    }
  },
};
</script>

<style lang="stylus" src="styles/components/tabs/TabsSection.styl"></style>
