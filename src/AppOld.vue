<!--<template>-->
<!--  <button @click="GetToken">-->
<!--    Получить токен-->
<!--  </button>-->

<!--  <button @click="GetTokens">-->
<!--    Отправить запрос на получение токенов-->
<!--  </button>-->

<!--  <button @click="CreateNewToken">-->
<!--    Создать новый токен-->
<!--  </button>-->

<!--  <button @click="DeleteToken">-->
<!--    Удалить токен-->
<!--  </button>-->

<!--  <button @click="CreateCard">-->
<!--    Создать электронную карту-->
<!--  </button>-->
<!--</template>-->

<!--<script>-->
<!--import axios from "axios";-->

<!--export default {-->
<!--  name: 'App',-->
<!--  data() {-->
<!--    return {-->
<!--      AuthorizationKey: null,-->
<!--      Token: null-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    async GetToken() {-->
<!--      try {-->
<!--        await axios.post(`https://api.asgk-group.ru/test-auth-only`, {-->
<!--          login: "imreegall@gmail.com",-->
<!--          password: "asgk1234"-->
<!--        })-->
<!--            .then(response => {-->
<!--              console.log(response.request.response)-->
<!--              this.AuthorizationKey = JSON.parse(response.request.response).auth_token-->
<!--            });-->
<!--      }-->
<!--      catch (e) {-->
<!--        console.log(e)-->
<!--      }-->
<!--    },-->

<!--    async GetTokens() {-->
<!--      try {-->
<!--        const Headers = {-->
<!--          headers: {-->
<!--            "Content-Type": "application/json",-->
<!--            "Authorization": this.AuthorizationKey-->
<!--          }-->
<!--        }-->
<!--        await axios.get(`https://api.asgk-group.ru/v1/authorization`, Headers)-->
<!--            .then(response => {-->
<!--              console.log(response.data.tokens)-->
<!--              // this.Token = response.request.tokens[0]-->
<!--            });-->
<!--      }-->
<!--      catch (e) {-->
<!--        console.log(e)-->
<!--      }-->
<!--    },-->

<!--    async CreateNewToken() {-->
<!--      try {-->
<!--        const Headers = {-->
<!--          headers: {-->
<!--            "Content-Type": "application/json",-->
<!--            "Authorization": this.AuthorizationKey-->
<!--          }-->
<!--        }-->
<!--        await axios.post(`https://api.asgk-group.ru/v1/authorization`, {-->
<!--          identifier: "ул. Ленина, 56"-->
<!--        }, Headers)-->
<!--            .then(response => {-->
<!--              console.log(response)-->
<!--            });-->
<!--      }-->
<!--      catch (e) {-->
<!--        console.log(e)-->
<!--      }-->
<!--    },-->

<!--    async DeleteToken() {-->
<!--      try {-->
<!--        const config = {-->
<!--          method: 'delete',-->
<!--          url: 'https://api.asgk-group.ru/v1/authorization',-->
<!--          headers: {-->
<!--            "Content-Type": "application/json",-->
<!--            "Authorization": this.AuthorizationKey-->
<!--          },-->
<!--          data : {-->
<!--            "identifier": "new token"-->
<!--          }-->
<!--        }-->

<!--        await axios(config)-->
<!--            .then(response => {-->
<!--              console.log(response)-->
<!--            });-->
<!--      }-->
<!--      catch (e) {-->
<!--        console.log(e)-->
<!--      }-->
<!--    },-->

<!--    async CreateCard() {-->
<!--      try {-->
<!--        const config = {-->
<!--          method: 'post',-->
<!--          url: 'https://api.asgk-group.ru/v1/ce1302dc236f822321669b640b8641ac/passes',-->
<!--          headers: {-->
<!--            "Content-Type": "application/json",-->
<!--            "Authorization": this.AuthorizationKey-->
<!--          },-->
<!--          data : {-->
<!--            "identifier": "new token"-->
<!--          }-->
<!--        }-->

<!--        await axios(config)-->
<!--            .then(response => {-->
<!--              console.log(response)-->
<!--            });-->
<!--      }-->
<!--      catch (e) {-->
<!--        console.log(e)-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style lang="sass">-->
<!--*-->
<!--  margin: 0-->
<!--  border: 0-->
<!--  padding: 0-->
<!--  font-family: Calibri-->
<!--  font-size: 20px-->
<!--  font-weight: 900-->

<!--#app-->
<!--  background-color: pink-->
<!--  height: 100vh-->
<!--  width: 100%-->
<!--  display: flex-->
<!--  justify-content: center-->
<!--  align-items: center-->
<!--  flex-direction: column-->
<!--  gap: 20px-->

<!--  button-->
<!--    background-color: dodgerblue-->
<!--    padding: 10px 20px-->
<!--    border-radius: 10px-->
<!--    user-select: none-->
<!--    box-sizing: content-box-->
<!--    color: white-->

<!--    &:hover-->
<!--      background-color: #1874ce-->
<!--      cursor: pointer-->

<!--    &:active-->
<!--      background-color: #1464b2-->
<!--</style>-->
