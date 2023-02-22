<template>
  <div class="asgk-login">
    <h1>Вход</h1>

    <div class="asgk-login-inputs">
      <input type="text" placeholder="Логин" id="login">
      <input type="text" placeholder="Пароль" id="password">
    </div>
    
    <button @click="GetAuthorizationKey">
      <h2>Войти</h2>
    </button>
  </div>
</template>

<script>
export default {
  name: "asgk-login",
  props: [
    'AuthorizationKey'
  ],
  methods: {
    async GetAuthorizationKey() {
      const login= document.getElementById("login").value
      const password = document.getElementById("password").value

      try {
        await this.axios.post(`https://api.asgk-group.ru/test-auth-only`, {
          login: login,
          password: password
        })
            .then(response => {
              this.SaveAuthorizationKey(JSON.parse(response.request.response).auth_token)
            })
      }
      catch (e) {
        console.log(e)
      }
    },

    SaveAuthorizationKey(uKey) {
      this.$emit('updateKey', uKey)
      localStorage.setItem('AuthorizationKey', uKey)
    }
  }
}
</script>

<style lang="sass">
  .asgk-login
    width: 70vw
    height: 100%
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    gap: 15vw

    .asgk-login-inputs
      display: flex
      flex-direction: column
      width: 100%
      gap: 2vw

      > input[type="text"]
        width: 100%

    > button
      width: 100%
</style>