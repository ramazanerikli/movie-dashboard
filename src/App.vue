<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active">
            <router-link to="/">Home</router-link> 
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link">
            <router-link to="/favorites">Favorites</router-link>
          </a>
        </li>
      </ul>
      </div>
    </div>
  </nav>
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
}
.vote-average {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background: #333;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card.movie-card {
  border: 0;
}
.card.movie-card .movie-action {
  position: relative;
}
.card.movie-card .vote-average {
  position: absolute;
  bottom: -20px;
  left: 10px;
}
.card.movie-card .movie-title {
  font-weight: bold;
}
.card.movie-card .movie-poster {
  max-width: 100%;
}
.card.movie-card .add-favorite {
  position: absolute;
  right: 20px;
  top: 10px;
}
.card.movie-card .add-favorite.unfavorite {
  color: #ebebeb;
  font-size: 1.4rem;
}
.card.movie-card .add-favorite.favorite {
  color: #FF3040;
  font-size: 1.4rem;
}
.card.movie-card .card-body {
  margin-top: 10px;
  text-align: left;
}

</style>
