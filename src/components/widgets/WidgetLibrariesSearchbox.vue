<template>
  <div class="WidgetLibrariesSearchbox">
    <form-edit
      class="WidgetLibrariesSearchbox-FormEdit"
      label="External Scripts"
      placeholder="Type to search from CDNjs (lodash, rxjs, ramda, etc)"
      :value="query"
      @change="onInputChange"
    >
      <svg><use xlink:href="#icon-magnifier"/></svg>
    </form-edit>
    <ul class="WidgetLibrariesSearchbox-List" v-show="showResults">
      <li
        class="WidgetLibrariesSearchbox-Item"
        :class="getItemClassModifier(index)"
        @click="onItemClick(index)"
        v-for="(item, index) in results"
        :key="index"
      >
        <span class="WidgetLibrariesSearchbox-ItemDot"></span>
        <span class="WidgetLibrariesSearchbox-ItemContent">
          <h1 v-html="item.name"></h1>
          <p v-html="item.description"></p>
          <form-select
            small
            ref="versions"
            class="WidgetLibrariesSearchbox-ItemSelect"
            :options="item.versions"
          />
          <app-button
            class="WidgetLibrariesSearchbox-ItemButton"
            @click="onAddClick(index)"
          >
            Add
          </app-button>
        </span>
      </li>
      </ul>
  </div>
</template>

<script>
import fuzzysort from 'fuzzysort';
import { mapState } from 'vuex'
import { debounce } from 'lodash';
import { CDNJS_FETCH_LIBRARIES } from '@/store/modules/types/action-types';
import FormEdit from '@/components/form/FormEdit.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import AppButton from '@/components/AppButton.vue'

export default {
  components: {
    FormEdit,
    AppButton,
    FormSelect,
  },
  data() {
    return {
      selectedIndex: -1,
      results: [],
      query: '',
      fuzzyOptions: {
        keys: [
          'name',
          'description',
          'keywords',
        ],
        limit: 15,
        allowTypo: false,
        threshold: -10000,
      },
    }
  },
  mounted() {
    this.$store.dispatch(CDNJS_FETCH_LIBRARIES);
    this.debounceSearch = debounce(this.updateSearch, 100);
  },
  methods: {
    onInputChange(value) {
      this.query = value;
      this.debounceSearch();
    },
    onItemClick(index) {
      this.selectedIndex = index;
    },
    onAddClick(index) {
      const { versions } = this.$refs;
      const { url_template: template } = this.cdnjs;
      const pick = this.results[index].ref;
      const versionComponent = versions[index];
      const version = versionComponent.selected;
      // Build URL from template
      const keys = {
        '{n}': pick.name,
        '{f}': pick.filename,
        '{v}': version,
      };
      const url = template.replace(/\{.\}/gi, m => keys[m]);
      this.clear();
      this.$emit('add', url);
    },
    clear() {
      this.results = [];
      this.query = '';
    },
    getItemClassModifier(index) {
      return {
        'WidgetLibrariesSearchbox-Item--selected': index === this.selectedIndex,
      }
    },
    updateSearch() {
      const { query, fuzzyOptions } = this;
      const { targets, libraries } = this.cdnjs;
      this.results = [];
      this.selectedIndex = 0;
      const fuzzyResults = fuzzysort.go(query, targets, fuzzyOptions);
      for (let i = 0; i < fuzzyResults.length; i++) {
        const res = fuzzyResults[i];
        // get original entry from libraries
        const ref = libraries[res.obj.index]
        // show the highlighted markup matching the query. Otherwise just show the original field content
        const name = res[0] ? fuzzysort.highlight(res[0]) : res.obj.name.target;
        const desc = res[1] ? fuzzysort.highlight(res[1]) : res.obj.description.target;
        this.results.push({
          ref,
          name,
          description: desc,
          versions: ref.versions.split(',').map(v => ({ value: v, text: v })),
        })
      }
    }
  },
  computed: {
    ...mapState({
      cdnjs: state => state.cdnjs,
    }),
    showResults() {
      return this.results.length > 0;
    }
  },
};
</script>

<style lang="stylus" src="styles/components/widgets/WidgetLibrariesSearchbox.styl"></style>
