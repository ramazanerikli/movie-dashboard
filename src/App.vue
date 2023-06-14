<template>
  <div id="nav">
    <router-link to="/">go to Home</router-link> 
    <router-link to="/detail">go to Detail</router-link>
    <router-link to="/favorites">go to Favorites</router-link>
  </div>
  <router-view></router-view>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'



export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
@import './styles/main.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $primary;
  margin-top: 60px;
}

</style>
