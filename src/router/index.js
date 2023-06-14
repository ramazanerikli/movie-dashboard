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
    path: '/detail',
    name: 'DetailPage',
    component: Detail 
  },
  {
    path: '/favorites',
    name: 'FavoritesPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Favorites
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
