<template>
  <div class="WidgetLibraries">
    <h3 class="WidgetLibraries-Title">External Libraries</h3>
    <ul>
      <li
        class="WidgetLibraries-Item"
        v-for="(item, idx) in items"
        :key="idx"
        :title="item.name"
      >
        <svg class="WidgetLibraries-ItemIcon">
          <use xlink:href='#icon-arrow-right'/>
        </svg>
        <div class="WidgetLibraries-ItemInfo">
          <div>{{ item.name }}</div>
          <div>{{ item.version }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  components: {},
  props: {
    items: {
      type: Array,
      default: () => [
        { name: 'three', version: '0.102.5' },
        { name: 'lodash', version: '1.23' }
      ],
    }
  },
  methods: {

  },
};
</script>

<style lang="stylus" src="styles/components/widgets/WidgetLibraries.styl"></style>
