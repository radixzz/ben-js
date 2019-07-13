<template>
  <button
    :title="hint"
    class="AppButton"
    :class="classModifiers"
    @click="onClick"
  >
      <svg class="AppButton-Icon">
          <use :xlink:href="`#${icon}`"/>
      </svg>
      <slot></slot>
  </button>
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
  },
  computed: {
    classModifiers() {
      const { default: slots } = this.$slots;
      const slotsCount = slots ? slots.length : 0
      return {
        'AppButton--text': slotsCount > 0,
      }
    }
  }
};
</script>

<style lang="stylus" src="styles/components/AppButton.styl"></style>
