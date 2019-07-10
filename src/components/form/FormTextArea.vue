<template>
  <label
    :for='computedId'
    :title="hint"
    class="FormTextArea"
  >
    {{ label }}
    <textarea
      value=""
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
  computed: {
    computedId() {
      const { _uid, id } = this;
      return id || `textarea-${_uid}`;
    }
  },
};
</script>

<style lang="stylus" src="styles/components/form/FormTextArea.styl"></style>
