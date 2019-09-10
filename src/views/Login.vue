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
import { mapActions, mapGetters } from 'vuex'
import { AUTH_SIGN_IN, AUTH_SIGN_IN_GUEST } from '@/store/modules/types/action-types'

export default {
  name: 'Login',
  components: {
  },
  methods: {
    onGitLoginClick() {
      this.signIn();
    },
    onLocalStorageClick() {
      this.singInAsGuest();
    },
    onLoggedIn() {
      const { $router, $route } = this
      const { after_login: afterLogin } = $route.query
      if (afterLogin) {
        $router.push({ path: afterLogin })
      } else {
        $router.push({ name: 'home' })
      }
    },
    ...mapActions({
      signIn: AUTH_SIGN_IN,
      singInAsGuest: AUTH_SIGN_IN_GUEST,
    }),
  },
  computed: {
    ...mapGetters([
      'signedIn',
    ])
  },
  watch: {
    signedIn(value) {
      if (value) {
        this.onLoggedIn()
      }
    }
  },
};
</script>

<style lang="stylus" src="styles/views/Login.styl"></style>
