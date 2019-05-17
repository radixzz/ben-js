<template>
  <div :title="hint" class="ToolbarButton">
      <svg class="ToolbarButton-Icon">
          <use :xlink:href="`#icon-${icon}`"/>
      </svg>
  </div>
</template>

<script>
export default {
  name: 'ToolbarButton',
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
  }
};
</script>

<style lang="stylus" src="styles/components/ToolbarButton.styl"></style>
