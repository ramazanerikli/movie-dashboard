<template>
  <div class="page-container container-sm">
    <h1 class="text-start my-3">Favorite Movies</h1>
    <p v-if="$store.state.favoriteMovies.length === 0">You don't have any favorite movies.</p>
    <div class="movies-list row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      <MovieItem v-for="(movie, index) in $store.state.favoriteMovies" :key="index" :movie="movie" />
    </div>
  </div>
</template>
<script>
import store from "../../store";
import MovieItem from "../components/MovieItem.vue";
export default {
  components: {
    MovieItem
  },
  computed: {
    favoriteMovies() {
      return store.getters['getFavoriteMovies'];
    }
  }
}
</script>