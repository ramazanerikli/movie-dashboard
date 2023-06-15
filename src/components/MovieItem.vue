<template>
  <div class="col movie-item">
    <div class="add-favorite" :class="{ 'favorite': movie.isFavorite }" @click="addToFavorite(movie)">
        <font-awesome-icon icon="fa-solid fa-heart" />
    </div>
    <router-link :to="`/detail/${movie.id}`" class="movie-item-wrapper">
    <div class="card movie-card">
          <div class="movie-action">
            <img class="movie-poster" :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`">
            <span class="vote-average">{{ movie.vote_average }}</span>
          </div>
          <div class="card-body">
            <h5 class="movie-title">{{ movie.title }}</h5>
            <p class="release-date text-muted small">{{  movie.release_date  }}</p>
          </div>
        </div>
      </router-link>
  </div>

</template>
<script>
import store from "../../store";

  export default {
    props: {
      movie: {
        required: true
      },
    },
    methods: {
      addToFavorite(movie) {
        const isFavorite = this.$store.getters['isMovieFavorite'](movie.id);
        if(isFavorite) {
          store.commit('removeFavoriteMovie', movie.id);
        } else {
          movie.isFavorite = true;
          store.commit('addFavoriteMovie', movie);
        }
      },
    }
  }
</script>