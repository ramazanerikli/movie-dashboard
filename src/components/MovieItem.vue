<template>
  <div class="col movie-item">
    <div class="add-favorite" :class="{ 'favorite': this.$store.getters['isMovieFavorite'](movie.id) }" @click="addToFavorite(movie)">
        <font-awesome-icon icon="fa-solid fa-heart" />
    </div>
    <router-link :to="`/detail/${movie.id}`" class="movie-item-wrapper">
      <div class="card movie-card">
          <div class="movie-action">
            <img class="movie-poster" :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`">
            <div class="vote-average">
             <svg class="stat-circle" :style="{ '--progress': calculateProgress(movie.score) }" width="150" viewBox="0 0 20 20">
                <circle class="circle-bg" cx="10" cy="10" r="8" />
                <circle :class="getProgressClass(movie.vote_average)" cx="10" cy="10" r="8" :style="{ 'stroke-dashoffset': calculateOffset(movie.vote_average) }" />
                <text class="circle-text" x="50%" y="50%" text-anchor="middle" dominant-baseline="middle">
                  <tspan class="percentage-text">{{ formatPercentage( movie.vote_average * 10) }}</tspan>
                  <tspan class="percentage-symbol">%</tspan>
                </text>
              </svg>
            </div>
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
    computed: {
      circumference() {
      const radius = 8;
      return 2 * Math.PI * radius;
      },
    },
    methods: {
      calculateOffset(score) {
        const radius = 8;
      const circumference = 2 * Math.PI * radius;
      const progress = score / 10; 
      const offset = circumference * (1 - progress);
      return `${offset}px`;
    },
    calculateProgress(score) {
      const progress = score * 10; 
      return `${progress}%`;
    },
    getProgressClass(score) {
      return score > 7 ? 'circle-progress progress-green' : 'circle-progress progress-yellow';
    },
    formatPercentage(score) {
      const roundedPercentage = Math.round(score);
      return String(roundedPercentage);
    },
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