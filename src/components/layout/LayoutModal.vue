<template>
  <div class="LayoutModal">
    <div class="LayoutModal-Background">
    </div>
    <section class="LayoutModal-Wrapper">
      <div class="LayoutModal-TitleBar">
        <h1>{{ title }}</h1>
        <app-button
          @click="closeModal"
          class="LayoutModal-CloseButton"
          title="Close"
          icon="icon-cross"
          :solid="false"
        />
      </div>
      <div class="LayoutModal-Content">
        <slot></slot>
      </div>
    </section>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton.vue'

export default {
  name: 'LayoutModal',
  components: {
    AppButton,
  },
  props: {
    title: {
      type: String,
      default: '',
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>

<style lang="stylus" src="styles/components/layout/LayoutModal.styl"></style>
