<template>
  <div
    class="LabelEdit"
    :class="classEditModifiers"
  >
    <template v-if="!editMode">
      <span class="LabelEdit-Text">{{this.value}}</span>
      <svg
        class="LabelEdit-Icon"
        @click="onEditClick"
      >
          <use xlink:href="#icon-pencil"/>
      </svg>
    </template>
    <form v-else>
      <input
        ref="input"
        @keydown.enter.prevent="commitChanges"
        @blur="commitChanges"
        type="text"
        :value="value"
      >
    </form>
  </div>
</template>
<script>

export default {
  components: {},
  data() {
    return {
      editMode: false,
    }
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    onEditClick() {
      this.editMode = true;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    commitChanges() {
      const { input } = this.$refs;
      this.editMode = false;
      this.$emit('input', input.value);
    },
  },
  computed: {
    classEditModifiers() {
      return {
        'LabelEdit-EditField--EditMode': this.editMode,
      }
    }
  }
};
</script>

<style lang="stylus" src="styles/components/LabelEdit.styl"></style>
