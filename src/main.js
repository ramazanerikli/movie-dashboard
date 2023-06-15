import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "../store";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret, faHeart, faMagnifyingGlass)


// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.css";
// Custom
import "./styles/main.scss";

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).use(store).mount('#app')
