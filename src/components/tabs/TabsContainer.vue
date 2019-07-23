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
import { differenceBy } from 'lodash';

export default {
  name: 'TabsContainer',
  data() {
    return {
      selectedId: '',
      tabs: [],
    }
  },
  mounted() {
    this.updateTabs();
  },
  updated() {
    this.updateTabs();
  },
  methods: {
    updateTabs() {
      const { default: slots } = this.$slots;
      if (slots) {
        const sections = slots.map(slot => slot.componentInstance);
        const diff = differenceBy(sections, this.tabs, '_uid');
        if (diff.length > 0) {
          this.tabs.push(...diff);
          const lastTab = diff.pop();
          this.selectedId = lastTab.id;
        }
      }
    },
    selectLastTab() {
      const { tabs } = this;
      if (tabs.length > 0) {
        this.selectedId = tabs[tabs.length - 1].id;
      }
    },
    updateVisibleTabs() {
      const { tabs, selectedId } = this;
      tabs.forEach((t) => {
        t.visible = t.id === selectedId
      });
    },
    onTabClick(id) {
      this.selectedId = id;
    },
    onConfigureClick(id) {
      this.$emit('configureClick', id);
    },
    onAddClick() {
      this.$emit('addTabClick');
    },
    getTabClassModifier(tabId) {
      return {
        'TabsContainer-TabsItem--active': this.selectedId === tabId,
      }
    },
  },
  computed: {
    activeTab() {
      return this.tabs[this.selectedId];
    },
  },
  watch: {
    selectedId: {
      handler(value) {
        this.updateVisibleTabs();
        this.$emit('selectedTabChange', value);
      },
      immediate: true,
    },
  }
};
</script>

<style lang="stylus" src="styles/components/tabs/TabsContainer.styl"></style>
