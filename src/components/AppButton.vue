<template>
  <div
    :title="hint"
    class="AppButton"
    @click="onClick"
  >
      <svg class="AppButton-Icon">
          <use :xlink:href="`#icon-${icon}`"/>
      </svg>
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AppButton',
  components: {},
  props: {
    icon: {
      type: String,
      default: '',
    },
    hint: {
      type: String,
      default: '',
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
};
</script>

<style lang="stylus" src="styles/components/AppButton.styl"></style>
