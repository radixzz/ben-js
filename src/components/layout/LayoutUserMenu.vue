<template>
  <div class="LayoutUserMenu">
    <div class="LayoutUserMenu-Arrow"></div>
    <ul class="LayoutUserMenu-List">
      <li
        class="LayoutUserMenu-ListItem"
        :class=" { 'LayoutUserMenu-ListItem--disabled': item.disabled }"
        v-for="(item, index) in items"
        :key="index"
        @click="$emit('close')"
      >
        <component :is="item.el" :to="item.to">
          {{ item.text }}
        </component>
        <hr v-if="item.hr"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { AUTH_SIGN_OUT } from '@/store/modules/auth'

export default {
  components: {},
  mounted() {
    // workaround to avoid getting the menu oppener click
    // as if it was an outside click (nextTick wont work)
    setTimeout(() => {
      this.bindMouseEvent();
    }, 50)
  },
  destroyed() {
    this.unbindMouseEvent();
  },
  methods: {
    onSignoutClick() {
      this.signOut();
    },
    onOutsideClick(event) {
      if (!this.$el.contains(event.target)) {
        this.$emit('close');
      }
    },
    bindMouseEvent() {
      document.addEventListener('click', this.onOutsideClick);
      document.addEventListener('touchend', this.onOutsideClick);
    },
    unbindMouseEvent() {
      document.removeEventListener('click', this.onOutsideClick);
      document.removeEventListener('touchend', this.onOutsideClick);
    },
    ...mapActions({
      signOut: AUTH_SIGN_OUT
    }),
  },
  computed: {
    ...mapState({
      username: state => state.auth.user.username,
    }),
    ...mapGetters([
      'signedIn'
    ]),
    items() {
      return [
        { text: `Signed in as @${this.username}`, el: 'div', disabled: true },
        { el: 'hr' },
        { text: 'New Benchmark', el: 'router-link', to: '/create' },
        { el: 'hr' },
        { text: 'Help', el: 'router-link', to: '/help' },
        { text: 'Sign Out', el: 'router-link', to: '/logout' },
      ];
    }
  }
};
</script>

<style lang="stylus" src="styles/components/layout/LayoutUserMenu.styl"></style>
