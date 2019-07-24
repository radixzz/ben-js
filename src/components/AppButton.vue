<template>
  <button
    :title="hint"
    class="AppButton"
    :class="classModifiers"
    @click="onClick"
  >
      <svg class="AppButton-Icon" v-if="icon">
          <use :xlink:href="`#${icon}`"/>
      </svg>
      <span>{{ text }}</span>
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
    text: {
      type: String,
      default: '',
    },
    solid: {
      type: Boolean,
      default: true,
    }
  },
  methods: {
    onClick() {
      this.$emit('click');
    }
  },
  computed: {
    classModifiers() {
      return {
        'AppButton--text': this.text.length > 0,
        'AppButton--solid': this.solid,
      }
    }
  }
};
</script>

<style lang="stylus" src="styles/components/AppButton.styl"></style>
