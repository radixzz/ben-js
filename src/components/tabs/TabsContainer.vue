<template>
  <div class="TabsContainer">
    <div class="TabsContainer-Tabs">
      <ul class="TabsContainer-Tabs-List">
        <li
          class="TabsContainer-Tabs-Item"
          :class="getTabClassModifier(tab.id)"
          :key="index"
          @click="onTabClick(tab.id)"
          v-for="(tab, index) in tabs"
        >
          <span class="TabsContainer-Tabs-ItemText">
            {{ tab.title }}
          </span>
          <span
            v-if="tab.configurable"
            class="TabsContainer-Tabs-ItemConfig"
            title="Configure"
            @click="onConfigureClick(tab.id)"
          >
            <svg>
              <use xlink:href="#icon-cog"/>
            </svg>
          </span>
        </li>
      </ul>
      <ul class="TabsContainer-Tabs-ListTools">
        <li
          class="TabsContainer-Tabs-ListTools-Item"
          @click="onAddClick"
          title="Add new test"
        >
          <svg>
            <use xlink:href="#icon-plus"/>
          </svg>
        </li>
      </ul>
    </div>
    <div class="TabsContainer-Sections">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TabsContainer',
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    selectedId: {
      type: String,
      default: '',
    }
  },
  methods: {
    onConfigureClick(id) {
      this.$emit('configureClick', id);
    },
    onAddClick() {
      this.$emit('addClick');
    },
    onTabClick(id) {
      this.$emit('tabClick', id);
    },
    getTabClassModifier(tabId) {
      return {
        'TabsContainer-TabsItem--active': this.selectedId === tabId,
      }
    },
  },
};
</script>

<style lang="stylus" src="styles/components/tabs/TabsContainer.styl"></style>
