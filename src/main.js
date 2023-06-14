import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.css";
// Custom
import "./styles/main.scss";

createApp(App).use(router).mount('#app')
