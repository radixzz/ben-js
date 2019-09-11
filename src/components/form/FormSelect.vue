<template>
  <label
    :for='computedId'
    :title="hint"
    class="FormSelect"
    :class="classModifier"
  >
    {{ label }}
    <select
      ref="input"
      v-model="selected"
      @input="onChange"
      :id='computedId'
      :name='computedId'
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </label>
</template>

<script>
export default {
  name: 'FormSelect',
  components: {},
  data() {
    return {
      selected: null,
    };
  },
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
    options: {
      type: Array,
      default: () => [],
    },
    small: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    onChange() {
      const { input } = this.$refs
      this.$emit('input', input.value)
    },
    selectFirst() {
      const { options } = this;
      if (options.length > 0) {
        this.selected = options[0].value;
      }
    }
  },
  computed: {
    computedId() {
      const { _uid, id } = this;
      return id || `select-${_uid}`;
    },
    classModifier() {
      return {
        'FormSelect--small': this.small
      }
    }
  },
  watch: {
    options: {
      handler() {
        this.selectFirst();
      },
      immediate: true,
    }
  },
};
</script>

<style lang="stylus" src="styles/components/form/FormSelect.styl"></style>
