<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-sm">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
            <router-link to="/" class="nav-link active">Home</router-link> 
        </li>
        <li class="nav-item">
            <router-link to="/favorites" class="nav-link">Favorites</router-link>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
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
  color: black;
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
.movie-poster {
  max-width: 100%;
}
.add-favorite {
  position: absolute;
  right: 20px;
  top: 10px;
  z-index: 3;
  cursor: pointer;
}
.add-favorite.unfavorite {
  color: #ebebeb;
  font-size: 1.4rem;
}
.add-favorite.favorite {
  color: #FF3040;
  font-size: 1.4rem;
}
.card.movie-card .card-body {
  margin-top: 10px;
  text-align: left;
}
.movie-item-wrapper {
  text-decoration: none;
}
.movie-poster {
  border-radius: 8px;
}
.movie-item {
  position: relative;
}
</style>
