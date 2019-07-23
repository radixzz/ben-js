<template>
  <header class="LayoutHeader">
    <router-link :to="{ name: 'home' }">
      <svg class="LayoutHeader-Logo">
          <use xlink:href="#ben-logo"/>
      </svg>
    </router-link>
    <div class="LayoutHeader-Menu">
      <div
        v-if="signedIn"
        class="LayoutHeader-UserMenu"
      >
        <div
          class="LayoutHeader-User"
          @click="onUserClick"
          :title="userName"
          :style='userButtonStyle'
        ></div>
      </div>
      <div
        v-else
        class="LayoutHeader-Login"
        @click="onLoginClick"
        title="Login with GitHub"
      >
          <svg><use xlink:href="#icon-github"/></svg>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { AUTH_SIGN_IN } from '@/store/modules/types/action-types'

export default {
  components: {
  },
  methods: {
    onLoginClick() {
      this.signIn();
    },
    onUserClick() {
      this.$emit('menuClick');
    },
    ...mapActions({
      signIn: AUTH_SIGN_IN
    }),
  },
  computed: {
    ...mapState({
      userName: state => state.auth.user.name,
      userAvatar: state => state.auth.user.avatarUrl
    }),
    ...mapGetters([
      'signedIn'
    ]),
    userButtonStyle() {
      return {
        'background-image': `url("${this.userAvatar}")`,
      }
    }
  }
};
</script>

<style lang="stylus" src="styles/components/layout/LayoutHeader.styl"></style>
