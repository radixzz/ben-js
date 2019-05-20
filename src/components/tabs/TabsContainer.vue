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
  data() {
    return {
      selectedIndex: -1,
      tabs: [],
    }
  },
  mounted() {
    this.updateTabs();
    this.selectedIndex = 0;
  },
  methods: {
    updateTabs() {
      const { default: slots } = this.$slots;
      this.tabs = slots.map(tab => tab.componentInstance);
    },
    getTabIndex(id) {
      return this.tabs.findIndex(t => t.id === id);
    },
    selectTabById(id) {
      const index = this.getTabIndex(id);
      this.selectedIndex = index;
    },
    selectLastTab() {
      this.selectedIndex = this.tabs.length - 1;
    },
    updateVisibleTabs() {
      const { tabs, selectedIndex } = this;
      tabs.forEach((t, i) => {
        t.visible = i === selectedIndex;
      });
    },
    onTabClick(id) {
      this.selectTabById(id);
    },
    onConfigureClick(id) {
      this.$emit('configureClick', id);
    },
    onAddClick() {
      this.$emit('addTabClick');
    },
    getTabClassModifier(tabId) {
      const idx = this.getTabIndex(tabId);
      return {
        'TabsContainer-TabsItem--active': this.selectedIndex === idx,
      }
    },
  },
  computed: {
    activeTab() {
      return this.tabs[this.selectedIndex];
    }
  },
  watch: {
    selectedIndex() {
      this.updateVisibleTabs();
    },
  }
};
</script>

<style lang="stylus" src="styles/components/tabs/TabsContainer.styl"></style>
