<template>
  <div class="PanesContainer" :class="classModifiers">
    <slot></slot>
  </div>
</template>

<script>
import Split from 'split.js';

export default {
  name: 'PanesContainer',
  props: {
    direction: {
      type: String,
      default: 'horizontal',
    },
    sizes: {
      type: Array,
      default: () => [],
    },
    minSize: {
      type: Array,
      default: () => [],
    },
    enabled: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      split: null,
    }
  },
  methods: {
    getPaneElements() {
      return this.$slots.default.filter((vnode) => {
        const { componentInstance: instance, componentOptions: opts } = vnode;
        return !instance || opts.tag !== 'panes-split';
      }).map(node => node.elm);
    },
    getSplitElements() {
      return this.$slots.default.filter((vnode) => {
        const { componentInstance: instance, componentOptions: opts } = vnode;
        return instance && opts.tag === 'panes-split';
      }).map(node => node.elm);
    },
    bindSplit() {
      if (this.split === null) {
        const panesElements = this.getPaneElements();
        const splitElements = this.getSplitElements();
        this.split = Split(panesElements, {
          sizes: this.sizes,
          minSize: this.minSize,
          gutterSize: 5,
          expandToMin: true,
          direction: this.direction,
          gutter(index, direction) {
            const el = splitElements[index - 1];
            el.classList.add('gutter');
            el.classList.add(`gutter-${direction}`);
            return splitElements[index - 1];
          }
        })
      }
    },
    unbindSplit() {
      if (this.split) {
        this.split.destroy(false, true);
        this.split = null;
      }
    },
  },
  computed: {
    classModifiers() {
      return {
        [`PanesContainer--${this.direction}`]: true,
        'PanesContainer--disabled': !this.enabled,
      }
    }
  },
  watch: {
    enabled: {
      handler(value) {
        this.$nextTick(() => {
          if (value) {
            this.bindSplit();
          } else {
            this.unbindSplit();
          }
        })
      },
      immediate: true,
    }
  }
};
</script>

<style lang="stylus" src="styles/components/panes/PanesContainer.styl"></style>
