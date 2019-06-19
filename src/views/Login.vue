<template>
  <section class="Login">
    <div
      class="Login-Content"
    >
      <h1>Save your work with GitHub</h1>
      <p>
        BenJS is fully dependant on GitHub for saving and sharing your tests online.
        When you create a test you are actually creating a <strong>public gist</strong> in your account.
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
