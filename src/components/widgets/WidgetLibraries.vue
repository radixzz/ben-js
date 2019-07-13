<template>
  <div class="WidgetLibraries">
    <form-edit
      class="WidgetLibraries-Searchbox"
      label="External Scripts"
      placeholder="Type to search from CDNjs (lodash, rxjs, ramda, etc)"
    >
      <svg><use xlink:href="#icon-magnifier"/></svg>
      <ul class="WidgetLibraries-Results" v-show="showResults">
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </form-edit>
    <div class="WidgetLibraries-Info">
      <svg><use xlink:href="#icon-information"/></svg>
      <p>
        Include external scripts from CDNjs search box or from a custom URL.
        The scope of this libraries will be limited to current test case.
      </p>
    </div>
    <ul class="WidgetLibraries-List">
      <li
        class="WidgetLibraries-Item"
        v-for="(item, idx) in items"
        :key="idx"
        :title="item.name"
      >
        <div class="WidgetLibraries-DraggableInput">
          <div class="WidgetLibraries-DragHandle" title="Drag to reorder">
            <svg><use xlink:href="#icon-drag-dots"/></svg>
          </div>
          <input type="text" v-model="item.url" placeholder="https://domain.com/your-script.js">
        </div>
      </li>
    </ul>
    <app-button
      class="WidgetLibraries-AddScript"
      icon="icon-plus"
    >add script field</app-button>
  </div>
</template>

<script>
import FormEdit from '@/components/form/FormEdit.vue';
import AppButton from '@/components/AppButton.vue'

export default {
  components: {
    FormEdit,
    AppButton
  },
  data() {
    return {
      showResults: false,
    }
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    }
  },
  methods: {

  },
};
</script>

<style lang="stylus" src="styles/components/widgets/WidgetLibraries.styl"></style>
