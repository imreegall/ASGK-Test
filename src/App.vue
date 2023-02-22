<template>
  <router-view :AuthorizationKey="this.AuthorizationKey" @updateKey="updateKey"/>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      AuthorizationKey: null
    }
  },
  methods: {
    updateKey(uKey) {
      this.AuthorizationKey = uKey
    },
    CheckAuthorizationKey() {
      const AuthorizationKey = localStorage.getItem('AuthorizationKey')
      if (AuthorizationKey == null) {
        this.$router.push("/")
      } else {
        if (this.$route.fullPath === '/') {
          this.$router.push("client-table")
        }
        this.AuthorizationKey = AuthorizationKey
      }
    }
  },
  mounted() {
    this.CheckAuthorizationKey()
  },
  watch: {
    AuthorizationKey: function() {
      console.log("key is changed")
      if (this.AuthorizationKey != null) {
        this.$router.push("client-table")
      } else {
        this.$router.push("/")
      }
    },
    $route: function() {
      this.CheckAuthorizationKey()
    }
  }
}
</script>

<style lang="sass">
  #app
    height: 100vh
    width: 100%
    display: flex
    align-items: center
    flex-direction: column
</style>
