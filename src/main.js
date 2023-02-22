import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios";
import VueAxios from 'vue-axios'
import './assets/styles/style.css'
import router from "./router.js"

createApp(App)
    .use(VueAxios, axios)
    .use(router)
    .mount('#app')