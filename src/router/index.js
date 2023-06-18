import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Detail from "../views/Detail.vue"
import Favorites from "../views/Favorites.vue"

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: Home 
  },
  {
    path: '/detail/:Mid',
    name: 'DetailPage',
    component: Detail 
  },
  {
    path: '/favorites',
    name: 'FavoritesPage',
    component: Favorites,
    props: true
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})
export default router
