<template>
  <div class="page-container container-sm">
    <div class="row detail-inner py-4">
      <div class="col-lg-4">
        <div class="movie-poster-field position-relative mb-5 mb-lg-0 mb-md-0">
          <div class="add-favorite" :class="{ 'favorite': this.$store.getters['isMovieFavorite'](movie.id) }" @click="addToFavorite(movie)">
            <font-awesome-icon icon="fa-solid fa-heart" />
          </div>
          <img class="movie-poster" :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`">
          <div class="vote-average position-absolute">
             <svg class="stat-circle" :style="{ '--progress': calculateProgress(movie.vote_average)}" width="150" viewBox="0 0 20 20">
                <circle class="circle-bg" cx="10" cy="10" r="8" />
                <circle :class="getProgressClass(movie.vote_average)" cx="10" cy="10" r="8" :style="{ 'stroke-dashoffset': calculateOffset(movie.vote_average) }" />
                <text class="circle-text" x="50%" y="50%" text-anchor="middle" dominant-baseline="middle">
                  <tspan class="percentage-text">{{ formatPercentage( movie.vote_average * 10) }}</tspan>
                  <tspan class="percentage-symbol">%</tspan>
                </text>
              </svg>
            </div>
        </div>
      </div>
      <div class="col-lg-8 d-flex align-items-center">
        <div class="movie-info-field text-start">
          <h2 class="movie-title">{{movie.title}}</h2>
          <div class="d-flex movie-meta d-flex flex-wrap justify-content-start">
            <span>{{ movie.release_date  }}</span>
            <span class="text-uppercase ms-2 me-2">({{  movie.original_language  }})</span>
            <ul class="d-flex flex-row gap-3 ps-3 pe-1">
              <li v-for="(genre, index) in movie.genres" :key="index" class="me-2">
                <span>{{  genre.name  }}</span>
              </li>
              <li>{{ convertMinsToHours(movie.runtime) }}</li>
            </ul>
          </div>
          <div class="movie-overview">
            <h3>Overview</h3>
            <p>
              {{ movie.overview }}
            </p>
            <h5 class="sub-title my-2">Tagline</h5>
            <span class="fst-italic">{{  movie.tagline  }}</span>
            <h5 class="sub-title my-4">Production Companies</h5>
            <ul class="companies-list list-unstyled d-flex flex-wrap justify-content-lg-start justify-content-center justify-content-md-center">
              <li v-for="(company, index) in movie.production_companies" :key="index">
                <div class="company-logo">
                  <img class="thumb" :src="`https://image.tmdb.org/t/p/w500/${company.logo_path}`" @error="imageLoadError">
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import axios from 'axios';
import store from "../../store";
import {useToast} from 'vue-toast-notification';
const $toast = useToast();
 export default{
  data(){
   return{
    id: this.$route.params.Mid,
    movie: []
   }
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
    imageLoadError (e) {
      e.target.src = require("@/assets/logo.png");
    },
    convertMinsToHours(a){
      var hours = Math.trunc(a/60);
      var minutes = a % 60;
      return hours + "h "+minutes + "m";
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
    },
  mounted() {
    axios.get(`https://api.themoviedb.org/3/movie/${this.id}?&language=en-US`, {
    params: {
      api_key: 'bc3678651b1e8f0bd3ee98d5e1052b24'
    }
  })
  .then(response => {
    this.movie = response.data;
  })
  .catch(error => {
    console.log(error);
  });
  },
 }
</script>