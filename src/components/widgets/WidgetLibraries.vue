<template>
  <div class="WidgetLibraries">
    <widget-libraries-searchbox
      @add="addLibrary"
    />
    <div class="WidgetLibraries-Info">
      <svg><use xlink:href="#icon-information"/></svg>
      <p>
        Include external scripts from CDNjs search box or from a custom URL.
        The scope of this libraries will be limited to current test case.
      </p>
    </div>
    <draggable
      v-model="items"
      handle=".WidgetLibraries-DragHandle"
      class="WidgetLibraries-List"
      v-bind="dragOptions"
      tag="ul"
    >
      <li
        class="WidgetLibraries-Item"
        v-for="(item, index) in items"
        :key="index"
      >
        <div class="WidgetLibraries-DraggableInput">
          <div class="WidgetLibraries-DragHandle" title="Drag to reorder">
            <svg><use xlink:href="#icon-drag-dots"/></svg>
          </div>
          <input
            ref="inputLibs"
            type="text"
            :value="item"
            placeholder="https://domain.com/your-script.js"
            @blur="onLibraryChange"
          >
        </div>
      </li>
    </draggable>
    <app-button
      class="WidgetLibraries-AddScript"
      icon="icon-plus"
      @click="addLibrary"
    >add script field</app-button>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { mapGetters } from 'vuex'
import { EDITORS_UPDATE_OPTIONS } from '@/store/modules/types/action-types'
import WidgetLibrariesSearchbox from '@/components/widgets/WidgetLibrariesSearchbox.vue';
import AppButton from '@/components/AppButton.vue';

export default {
  components: {
    WidgetLibrariesSearchbox,
    AppButton,
    draggable
  },
  data() {
    return {
      libraries: [],
    }
  },
  methods: {
    onLibraryChange() {
      this.updateLibraries();
      this.clearEmptyLibraries();
      this.saveLibraries();
    },
    addLibrary(url = '') {
      this.libraries.push(url);
      this.saveLibraries();
    },
    clearEmptyLibraries() {
      this.libraries = this.libraries.filter(lib => lib !== '');
    },
    updateLibraries() {
      const { inputLibs } = this.$refs;
      this.libraries = inputLibs.map((input, idx) => input.value);
    },
    saveLibraries() {
      this.$store.dispatch(EDITORS_UPDATE_OPTIONS, {
        id: this.activeEditor.id,
        libraries: this.libraries,
      });
    },
  },
  computed: {
    ...mapGetters([
      'activeEditor',
    ]),
    dragOptions() {
      return {
        animation: 200,
        disabled: false,
        ghostClass: "WidgetLibraries-Item--ghost"
      };
    },
    items: {
      get() {
        const { libraries } = this;
        const result = [].concat(libraries);
        if (result.length < 2) {
          const slots = Array(Math.max(0, 2 - result.length)).fill('');
          result.push(...slots);

        }
        return result;
      },
      set(value) {
        this.libraries = value;
        this.saveLibraries();
      }
    }
  },
  watch: {
    'activeEditor.libraries': {
      handler(value) {
        this.libraries = [].concat(value);
      },
      immediate: true,
    }
  }
};
</script>

<style lang="stylus" src="styles/components/widgets/WidgetLibraries.styl"></style>
