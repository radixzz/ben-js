<template>
  <div class="WidgetLibraries">
    <widget-libraries-searchbox
      @add="onLibraryAdd"
    />
    <div class="WidgetLibraries-Info">
      <svg><use xlink:href="#icon-information"/></svg>
      <p>
        Include external scripts from CDNjs search box or from a custom URL.
        The scope of this libraries will be limited to current test case.
      </p>
    </div>
    <draggable
      handle=".WidgetLibraries-DragHandle"
      class="WidgetLibraries-List"
      v-bind="dragOptions"
      tag="ul"
    >
      <transition-group type="transition" name="WidgetLibraries--flip">
        <li
          class="WidgetLibraries-Item"
          v-for="item in items"
          :key="item.order"
          :title="item.name"
        >
          <div class="WidgetLibraries-DraggableInput">
            <div class="WidgetLibraries-DragHandle" title="Drag to reorder">
              <svg><use xlink:href="#icon-drag-dots"/></svg>
            </div>
            <input type="text" v-model="item.url" placeholder="https://domain.com/your-script.js">
          </div>
        </li>
      </transition-group>
    </draggable>
    <app-button
      class="WidgetLibraries-AddScript"
      icon="icon-plus"
    >add script field</app-button>
  </div>
</template>

<script>

import draggable from 'vuedraggable';
import WidgetLibrariesSearchbox from '@/components/widgets/WidgetLibrariesSearchbox.vue';
import AppButton from '@/components/AppButton.vue';

export default {
  components: {
    WidgetLibrariesSearchbox,
    AppButton,
    draggable
  },
  methods: {
    onLibraryAdd(library) {
      console.log('onLibraryAdd', library)
    },
    clearEmptyFields() {

    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        disabled: false,
        ghostClass: "WidgetLibraries-Item--ghost"
      };
    },
    items() {
      return [
        { order: 0, name: '', url: '' },
        { order: 1, name: '', url: '' },
      ];
    }
  }
};
</script>

<style lang="stylus" src="styles/components/widgets/WidgetLibraries.styl"></style>
