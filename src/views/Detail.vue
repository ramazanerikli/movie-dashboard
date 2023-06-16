<template>
  <div class="page-container container-sm">
    <div class="row detail-inner py-4">
      <div class="col-lg-4">
        <div class="movie-poster-field position-relative mb-5 mb-lg-0 mb-md-0">
          <div class="add-favorite" :class="{ 'favorite': this.$store.getters['isMovieFavorite'](movie.id) }" @click="addToFavorite(movie)">
            <font-awesome-icon icon="fa-solid fa-heart" />
          </div>
          <img class="movie-poster" :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`">
          <span class="vote-average position-absolute">{{ parseFloat(movie.vote_average).toFixed(1) }}</span>
        </div>
      </div>
      <div class="col-lg-8 d-flex align-items-center">
        <div class="movie-info-field text-start">
          <h2 class="movie-title">{{movie.title}}</h2>
          <div class="d-flex movie-meta">
            <span>{{ movie.release_date  }}</span>
            <span class="text-uppercase ms-2 me-2">({{  movie.original_language  }})</span>
            <ul class="d-flex flex-row gap-3 ps-3 pe-1">
              <li v-for="(genre, index) in movie.genres" :key="index" class="me-2">
                <span>{{  genre.name  }}</span>
            </li>
            </ul>
            <span>{{ convertMinsToHours(movie.runtime) }}</span>
          </div>
          <div class="movie-overview">
            <h3>Overview</h3>
            <p>
              {{ movie.overview }}
            </p>
            <h5 class="sub-title my-2">Tagline</h5>
            <span class="fst-italic">{{  movie.tagline  }}</span>
            <h5 class="sub-title my-4">Production Companies</h5>
            <ul class="companies-list list-unstyled">
              <li v-for="(company, index) in movie.production_companies" :key="index">
              <div class="company-logo">
                <img class="thumb" :src="`https://image.tmdb.org/t/p/w500/${company.logo_path}`">
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
  name:'detail',
  data(){
   return{
    id: this.$route.params.Mid,
    movie: []
   }
  },
  methods: {
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
    axios.get
    (`https://api.themoviedb.org/3/movie/${this.id}?&language=en-US`, {
    params: {
      api_key: 'bc3678651b1e8f0bd3ee98d5e1052b24'
    }
  })
  .then(response => {
    this.movie = response.data;
    console.log(this.movie)
  })
  .catch(error => {
    console.log(error);
  });
  },
 }
</script>