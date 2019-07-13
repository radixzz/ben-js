<template>
  <label
    :for='computedId'
    :title="hint"
    @click="onClick"
    class="FormEdit"
  >
    {{ label }}
    <input
      ref="input"
      @input="onChange"
      :value="value"
      :id='computedId'
      :name='computedId'
      :placeholder='placeholder'
      :maxlength="maxLength"
    />
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: 'FormEdit',
  components: {},
  props: {
    id: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    hint: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: ''
    },
    maxLength: {
      type: Number,
      default: 50,
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
    onChange() {
      const { input } = this.$refs
      this.$emit('change', input.value)
    },
  },
  computed: {
    computedId() {
      const { _uid, id } = this;
      return id || `edit-${_uid}`;
    }
  },
};
</script>

<style lang="stylus" src="styles/components/form/FormEdit.styl"></style>
