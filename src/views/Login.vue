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
      >Continue using local storage</div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import { AUTH_SIGN_IN } from '@/store/modules/auth'

export default {
  components: {
  },
  methods: {
    onGitLoginClick() {
      this.signIn();
    },
    ...mapActions({
      signIn: AUTH_SIGN_IN
    }),
  }
};
</script>

<style lang="stylus" src="styles/views/Login.styl"></style>
