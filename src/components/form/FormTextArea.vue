<template>
  <label
    :for='computedId'
    :title="hint"
    class="FormTextArea"
  >
    {{ label }}
    <textarea
      ref="textarea"
      :value="value"
      @input="onChange"
      autocomplete="false"
      :id='computedId'
      :name='computedId'
      :maxlength='maxLength'
      :placeholder="placeholder"
      :rows='rows'
    />
  </label>
</template>

<script>
export default {
  name: 'FormTextArea',
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
    maxLength: {
      type: Number,
      default: 250,
    },
    rows: {
      type: Number,
      default: 10,
    },
    placeholder: {
      type: String,
      default: '',
    }
  },
  methods: {
    onChange() {
      const { textarea } = this.$refs;
      this.$emit('input', textarea.value);
    }
  },
  computed: {
    computedId() {
      const { _uid, id } = this;
      return id || `textarea-${_uid}`;
    }
  },
};
</script>

<style lang="stylus" src="styles/components/form/FormTextArea.styl"></style>
