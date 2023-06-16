<template>
  <div class="col movie-item">
    <div class="add-favorite" :class="{ 'favorite': this.$store.getters['isMovieFavorite'](movie.id) }" @click="addToFavorite(movie)">
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
import {useToast} from 'vue-toast-notification';
const $toast = useToast();

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
          $toast.open({
            message: `${movie.title} was removed from your favorite list`,
            type: "success",
            duration: 3000,
            dismissible: true
          })
        } else {
          movie.isFavorite = true;
          store.commit('addFavoriteMovie', movie);
          $toast.open({
            message: `${movie.title} was added to your favorite list`,
            type: "success",
            duration: 3000,
            dismissible: true
          })
        }
      },
    }
  }
</script>