<template>
  <div class="PanelProjects">
    <panel title="Your Projects">
      <ul
        v-if="projects.length > 0"
        class="PanelProjects-List"
      >
        <li
          class="PanelProjects-Item"
          v-for="(project, idx) in projects"
          :key="idx"
        >
          {{ project.workspace.title }}
          <app-button
            class="PanelProjects-ItemButton"
            icon="icon-folder-open"
            hint="Open Project"
            :solid='false'
            @click="onProjectClick(project)"
          />
        </li>
      </ul>
      <div
        v-else
        class="PanelProjects-NoProjects"
      >
        No saved projects.
      </div>
    </panel>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Panel from '@/components/panels/Panel.vue';
import AppButton from '@/components/AppButton.vue'

export default {
  name: 'PanelProjects',
  components: {
    Panel,
    AppButton,
  },
  methods: {
    onProjectClick(project) {
      const { $router, username } = this;
      const { slug } = project.workspace;
      if (username === 'guest') {
        $router.push({
          name: 'benchmark-editor-guest',
          params: { slug }
        });
      } else {
        $router.push({
          name: 'benchmark-editor',
          params: { slug, user: username }
        });
      }
    }
  },
  computed: {
    ...mapState({
      username: state => state.auth.user.username,
      projects: state => state.projects.items,
    })
  }
};
</script>

<style lang="stylus" src="styles/components/panels/PanelProjects.styl"></style>
