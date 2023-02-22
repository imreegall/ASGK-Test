<template>
  <div class="asgk-client-table">
    <div class="addresses">
      <select id="select" @change="handleChange($event)">
        <option :value="0">-- Выберите адрес --</option>
        <option v-for="token in tokens" :key="token.token" :value="token.token">
          {{ token.identifier }}
        </option>
      </select>

      <div class="add-address">
        <input type="text" placeholder="Адрес" id="address">

        <button @click="CreateNewToken">
          <h2>Добавить адрес</h2>
        </button>
      </div>

      <button @click="DeleteToken">
        <h2>Удалить выбранный адрес</h2>
      </button>

      <button @click="exit">
        <h2>Выйти из аккаунта</h2>
      </button>
    </div>

    <div class="search">
      <h2>Поиск:</h2>
      <table>
        <tr>
          <th
              @click="SortingTable(headerItem.key)"
              v-for="headerItem in tableHeader"
              :key="headerItem.key"
          ><h3>{{ headerItem.text }}</h3></th>
        </tr>
        <tr>
          <td
              v-for="headerItem in tableHeader"
              :key="headerItem.key"
          >
            <input type="text" name="search" :class="headerItem.key" @input="SearchCards">
          </td>
        </tr>
      </table>
    </div>

    <div class="main-table">
      <div class="tools">
        <button @click="openCreateCardMenu">
          Создать карту
        </button>

        <div class="CardMenu" id="createCardMenu">
          <div class="menuCont">
            <h1>Создание электронной карты</h1>

            <input type="text" name="template" class="createCard" placeholder="Название макета (Макет 1)">

            <input type="text" name="last_name" class="createCard" placeholder="Имя">

            <input type="text" name="first_name" class="createCard" placeholder="Фамилия">

            <input type="text" name="pat_name" class="createCard" placeholder="Отчество">

            <input type="text" name="phone" class="createCard" placeholder="Телефон">

            <input type="text" name="email" class="createCard" placeholder="Почта">

            <input type="text" name="birthday" class="createCard" placeholder="Дата рождения">

            <input type="text" name="gender" class="createCard" placeholder="Пол (м/ж)">

            <input type="text" name="barcode" class="createCard" placeholder="Штрихкод">

            <input type="text" name="discount" class="createCard" placeholder="Скидка">

            <input type="text" name="bonus" class="createCard" placeholder="Бонусы">

            <input type="text" name="loyalty_level" class="createCard" placeholder="Уровень лояльности">

            <button @click="CreateCard">
              Создать карту
            </button>
          </div>
        </div>

        <button @click="DeleteSelectedCards">
          Удалить карты
        </button>

        <button @click="openPushCardMenu">
          Отправить PUSH
        </button>

        <div class="CardMenu" id="PushCardMenu">
          <div class="menuCont">
            <h1>Отправка PUSH уведомления</h1>

            <div class="selectData" id="selectDataForPush">
              <select>
                <option
                    v-for="i in 10"
                    :key="i"
                >{{ i + 2022 }}</option>
              </select>

              <h1>-</h1>

              <select>
                <option
                    v-for="i in 12"
                    :key="i"
                >{{ i }}</option>
              </select>

              <h1>-</h1>

              <select>
                <option
                    v-for="i in 31"
                    :key="i"
                >{{ i }}</option>
              </select>

              <h1><span>        </span></h1>

              <select>
                <option
                    v-for="i in 24"
                    :key="i"
                >{{ i - 1 }}</option>
              </select>

              <h1>:</h1>

              <select>
                <option
                    v-for="i in 60"
                    :key="i"
                >{{ i - 1 }}</option>
              </select>

              <h1>:</h1>

              <select>
                <option
                    v-for="i in 60"
                    :key="i"
                >{{ i - 1 }}</option>
              </select>
            </div>

            <textarea></textarea>

            <button @click="PushToSelectUsers">
              Отправить
            </button>
          </div>
        </div>
      </div>

      <table>
        <tr>
          <th>
            <input type="checkbox" name="" id="" @change="changeCheckboxAll">
          </th>
          <th
              @click="SortingTable(headerItem.key)"
              v-for="headerItem in tableHeader"
              :key="headerItem.key"
          ><h3>{{ headerItem.text }}</h3></th>
        </tr>
        <tr v-for="card in tokenCards" :key="card.user_id" class="electronicCard">
          <td>
            <input type="checkbox" name="mainTableCheckbox" id="">
          </td>
          <td
              v-for="headerItem in tableHeader"
              :key="headerItem.key"
          ><h3>{{card[headerItem.key]}}</h3></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "asgk-client-table",
  props: [
    'AuthorizationKey'
  ],
  data() {
    return {
      tokens: null,
      selectToken: "0",
      tokenCards: null,
      tableHeader: [
        {
          text: "ID",
          key: "user_id"
        },

        {
          text: "Фамилия",
          key: "last_name"
        },

        {
          text: "Имя",
          key: "first_name"
        },

        {
          text: "Отчество",
          key: "pat_name"
        },

        {
          text: "Телефон",
          key: "phone"
        },

        {
          text: "Почта",
          key: "email"
        },

        {
          text: "Дата рождения",
          key: "birthday"
        },

        {
          text: "Последний вход",
          key: "date_last"
        },

        {
          text: "Скидка",
          key: "discount"
        },

        {
          text: "Бонусы",
          key: "bonus"
        }
      ],
      sortingOption: null
    }
  },
  methods: {
    async PushToSelectUsers() {
      const cards = document.getElementsByClassName("electronicCard")
      const filterCards = Array.from(cards).filter(card => {
        return card.getElementsByTagName("input")[0].checked
      })
      let users_id = []
      filterCards.forEach((card) => {
        users_id.push(card.getElementsByTagName("td")[1].innerText)
      })
      this.openPushCardMenu()
      if (users_id.length > 0) {
        const users_id_String = users_id.join(",")
        const text = document.getElementsByTagName("textarea")[0].value
        const selectionsForPush = document.getElementById("selectDataForPush").getElementsByTagName("select")
        let datePush = selectionsForPush[0].value + "-" + selectionsForPush[1].value.padStart(2, "0") + "-" + selectionsForPush[2].value.padStart(2, "0")
        datePush += "T" + selectionsForPush[3].value.padStart(2, "0") + ":" + selectionsForPush[4].value.padStart(2, "0") + ":" + selectionsForPush[5].value.padStart(2, "0") + ".000Z"
        await this.PushMessage(users_id_String, datePush, text)
      }
    },
    async PushMessage(user_id, date_start, push_message) {
      try {
        const config = {
          method: 'post',
          url: 'https://api.asgk-group.ru/v1/' + this.selectToken + "/message/push",
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.AuthorizationKey
          },
          data : {
            "user_id": user_id,
            "date_start": date_start,
            "push_message": push_message
          }
        }

        await this.axios(config)
            .then(response => {
              console.log(response)
            });
      }
      catch (e) {
        console.log(e)
      }
    },
    openPushCardMenu() {
      if (this.selectToken !== "0") {
        let menu = document.getElementById("PushCardMenu")
        if (menu.style.display === "flex") {
          menu.style.display = "none"
        } else {
          menu.style.display = "flex"
        }
      }
    },
    openCreateCardMenu() {
      if (this.selectToken !== "0") {
        let menu = document.getElementById("createCardMenu")
        if (menu.style.display === "flex") {
          menu.style.display = "none"
        } else {
          menu.style.display = "flex"
        }
      }
    },
    changeCheckboxAll(event) {
      const checkboxes = document.getElementsByName("mainTableCheckbox")
      checkboxes.forEach(input => {
        if (event.target.checked === true) {
          input.checked = true
        } else {
          input.checked = false
        }
      })
    },
    SortingTable(sortKey) {
      if (this.sortingOption === sortKey) {
        this.tokenCards?.sort((a, b) => {
          if ( a[sortKey] < b[sortKey] ){
            return 1;
          }
          if ( a[sortKey] > b[sortKey] ){
            return -1;
          }
          return 0;
        })
        this.sortingOption = null
      } else {
        this.tokenCards?.sort((a, b) => {
          if ( b[sortKey] < a[sortKey] ){
            return 1;
          }
          if ( b[sortKey] > a[sortKey] ){
            return -1;
          }
          return 0;
        })
        this.sortingOption = sortKey
      }
    },

    GetTokens() {
      try {
        const Headers = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.AuthorizationKey
          }
        }
        this.axios.get(`https://api.asgk-group.ru/v1/authorization`, Headers)
            .then(response => {
              this.tokens = response.data.tokens
            });
      }
      catch (e) {
        console.log(e)
      }
    },

    handleChange(event) {
      this.selectToken = event.target.value
      if (this.selectToken === "0") {
        this.tokenCards = null
      } else {
        this.GetCards()
      }
    },

    async CreateNewToken() {
      const newTokenName = document.getElementById("address").value
      try {
        const Headers = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.AuthorizationKey
          }
        }
        await this.axios.post(`https://api.asgk-group.ru/v1/authorization`, {
          identifier: newTokenName
        }, Headers)
        this.GetTokens()
      }
      catch (e) {
        console.log(e)
      }
    },

    async DeleteToken() {
      if (this.selectToken !== "0") {
        try {
          const config = {
            method: 'delete',
            url: 'https://api.asgk-group.ru/v1/authorization',
            headers: {
              "Content-Type": "application/json",
              "Authorization": this.AuthorizationKey
            },
            data : {
              "token": this.selectToken
            }
          }

          await this.axios(config)
          this.GetTokens()
          this.tokenCards = null
        }
        catch (e) {
          console.log(e)
        }
      }
    },

    async GetCards() {
      try {
        const config = {
          method: 'get',
          url: 'https://api.asgk-group.ru/v1/' + this.selectToken + "/passes?search",
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.AuthorizationKey
          }
        }

        await this.axios(config)
            .then(response => {
              this.tokenCards = JSON.parse(response.request.response).passes
            });
      }
      catch (e) {
        console.log(e)
      }
    },

    async SearchCards() {
      let searchArray = []
      const searchInputs = document.getElementsByName("search")
      searchInputs.forEach(input => {
        if (input.value !== "") {
          searchArray.push(input.className + "=" + input.value)
        }
      })
      let searchString = searchArray.join(',')
      if (searchString.length > 0) {
        searchString = "=" + searchString
      }
      if (searchString !== "") {
        try {
          const config = {
            method: 'get',
            url: 'https://api.asgk-group.ru/v1/' + this.selectToken + "/passes?search" + searchString + "&limit=1000&offset=0",
            headers: {
              "Content-Type": "application/json",
              "Authorization": this.AuthorizationKey
            }
          }

          await this.axios(config)
              .then(response => {
                this.tokenCards = JSON.parse(response.request.response).passes
              });
        }
        catch (e) {
          console.log(e)
        }
      } else {
        await this.GetCards()
      }
    },

    async CreateCard() {
      this.openCreateCardMenu()
      let data = {}
      const inputs = document.getElementsByClassName("createCard")
      Array.from(inputs).forEach(input => {
        data[input.name] = input.value
      })
      try {
        const config = {
          method: 'post',
          url: 'https://api.asgk-group.ru/v1/' + this.selectToken + "/passes",
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.AuthorizationKey
          },
          data
        }

        await this.axios(config)
            .then(response => {
              console.log(response)
              this.SearchCards()
            });
      }
      catch (e) {
        console.log(e)
      }
    },

    async DeleteSelectedCards() {
      const cards = document.getElementsByClassName("electronicCard")
      const filterCards = Array.from(cards).filter(card => {
        return card.getElementsByTagName("input")[0].checked
      })
      filterCards.forEach((card) => {
        this.DeleteCard(card.getElementsByTagName("td")[1].innerText)
      })
    },

    async DeleteCard(user_id) {
      try {
        const config = {
          method: 'delete',
          url: 'https://api.asgk-group.ru/v1/' + this.selectToken + "/passes/" + user_id,
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.AuthorizationKey
          }
        }

        await this.axios(config)
        await this.GetCards()
      }
      catch (e) {
        console.log(e)
      }
    },
    exit() {
      localStorage.clear()
      this.$emit('updateKey', null)
    }
  },
  mounted() {
    this.GetTokens()
  },
  watch: {
    selectToken: function() {
      console.log(this.selectToken)
    }
  }
}
</script>

<style lang="sass">
  .asgk-client-table
    display: flex
    flex-direction: column
    align-items: center
    gap: 5vw
    width: 100%
    padding: 4vw 4vw

    .addresses
      border: .3vw solid black
      padding: 1vw
      display: flex
      flex-wrap: wrap
      justify-content: space-between
      width: 100%
      border-radius: 1vw

      > *
        width: 25%

        &:nth-child(3)
          width: 20%

        &:last-child
          width: 15%

      .add-address
        display: flex
        justify-content: space-between
        border: .2vw dotted black
        padding: .5vw
        border-radius: 1vw

        > *
          width: 45%

    .search
      width: 100%
      display: flex
      flex-direction: column
      align-items: center
      gap: 1vw
      border: .3vw black dashed
      padding: 1vw
      border-radius: 1vw

      input
        width: 100%

    .main-table
      width: 100%
      border: .3vw dashed black
      padding: 1vw
      display: flex
      flex-direction: column
      align-items: center
      gap: 1vw
      border-radius: 1vw

      .tools
        display: flex
        gap: 1vw

        .CardMenu, #createCardMenu
          background-color: rgba(0, 0, 0, 0.38)
          position: fixed
          width: 100%
          height: 100%
          top: 0
          left: 0
          display: none
          justify-content: center
          align-items: center

          .menuCont
            background-color: dodgerblue
            width: 80vw
            display: flex
            flex-direction: column
            align-items: center
            gap: 2vh
            padding: 2vh
            border-radius: 2vw
            color: white

            input
              width: 50vw
              height: 4vh
              color: black

            textarea
              width: 50vw
              height: 20vh
              color: black
              white-space: normal

            .selectData
              color: black
              display: flex
              align-items: center
              gap: 1vw


            button
              background-color: white
              color: black

              &:hover
                background-color: #d5d5d5

              &:active
                background-color: #bebebe
      input
        outline: .1vw solid black
        width: 1vw
        height: 1vw
        border: none !important

    table
      width: 100%

      > tr

        > th
          padding: .5vw 1vw
          text-align: center
          background-color: dodgerblue
          cursor: pointer
          user-select: none
          border-radius: 1vw 1vw 0 0

          &:hover
            background-color: #2d97fd

        > td
          padding: .5vw 1vw
          text-align: center
</style>