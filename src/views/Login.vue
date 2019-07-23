<template>
  <section class="Login">
    <div
      class="Login-Content"
    >
      <h1>Sign in to BenJS</h1>
      <p>
        Save and share your benchmarks.
      </p>
      <div
        class="Login-Button"
        @click="onGitLoginClick"
      >
        <svg><use xlink:href="#icon-github"/></svg>
        Login with GitHub
      </div>
      <div
        class="Login-LocalLink"
        @click="onLocalStorageClick"
      >Continue using local storage</div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import { AUTH_SIGN_IN, AUTH_SIGN_IN_GUEST } from '@/store/modules/types/action-types'

export default {
  components: {
  },
  methods: {
    onGitLoginClick() {
      this.signIn();
    },
    onLocalStorageClick() {
      this.singInAsGuest();
    },
    ...mapActions({
      signIn: AUTH_SIGN_IN,
      singInAsGuest: AUTH_SIGN_IN_GUEST
    }),
  }
};
</script>

<style lang="stylus" src="styles/views/Login.styl"></style>
