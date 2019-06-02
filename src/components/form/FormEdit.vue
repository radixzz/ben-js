<template>
  <label
    :for='computedId'
    :title="hint"
    @click="onClick"
    class="FormEdit"
  >
    {{ label }}
    <input
      value=""
      :id='computedId'
      :name='computedId'
      maxlength="50"
    />
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
    label: {
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
    computedId() {
      const { _uid, id } = this;
      return id || `edit-${_uid}`;
    }
  },
};
</script>

<style lang="stylus" src="styles/components/form/FormEdit.styl"></style>
