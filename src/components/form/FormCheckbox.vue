<template>
  <label
    :for='computedId'
    :title="hint"
    @click="onClick"
    class="FormCheckbox"
  >
      <input
        type="checkbox"
        :name='computedId'
        :id='computedId'
        checked
      />
      <span class="FormCheckbox-icon">
        <svg>
            <use xlink:href="#icon-checkmark"/>
        </svg>
      </span>
      <span class="FormCheckbox-text">
        {{ label }}
      </span>
  </label>
</template>

<script>
export default {
  name: 'FormCheckbox',
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
      return id || `checkbox-${_uid}`;
    }
  },
};
</script>

<style lang="stylus" src="styles/components/form/FormCheckbox.styl"></style>
