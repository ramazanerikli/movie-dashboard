<template>
  <div>
    <div v-if="loading" class="loading-container vh-100">
      <LoadingSpinner />
    </div>
    <div v-else>
      <div class="single-container"  :style='{ backgroundImage: `url(${movieBackdropPath})` }'>
        <div class="single-custom-bg" >
          <div class="row detail-inner text-white py-3 py-lg-5 py-md-3">
      <div class="col-lg-4">
        <div class="movie-poster-field position-relative mb-5 mb-lg-0 mb-md-0">
          <div class="add-favorite" :class="{ 'favorite': this.$store.getters['isMovieFavorite'](movie.id) }" @click="addToFavorite(movie)">
            <font-awesome-icon icon="fa-solid fa-heart" />
          </div>
          <img class="movie-poster" :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"  @error="imageLoadError">
          <div class="vote-average position-absolute">
            <StatCircle :movie="movie" />
            </div>
        </div>
      </div>
      <div class="col-lg-8 d-flex align-items-center">
        <div class="movie-info-field text-start">
          <h2 class="movie-title">{{movie.title}}</h2>
          <div class="d-flex movie-meta d-flex flex-wrap justify-content-start">
            <span>{{ formattedDate }}</span>
            <span class="text-uppercase ms-2 me-2">({{  movie.original_language  }})</span>
            <ul class="d-flex flex-row flex-wrap gap-3 ps-3 pe-1">
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
          </div>
        </div>
      </div>
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
import StatCircle from '@/components/StatCircle.vue';
import LoadingSpinner from "../components/LoadingSpinner.vue";

const $toast = useToast();
 export default{
  components: {
    StatCircle,
    LoadingSpinner
  },
  data(){
   return{
    id: this.$route.params.Mid,
    movie: [],
    loading: true,
    movieBackdropPath: '' 
   }
  },
  computed: {
      formattedDate() {
        const releaseDate = new Date(this.movie.release_date);
        const month = releaseDate.toLocaleString('default', { month: 'long' });
        const day = releaseDate.getDate();
        const year = releaseDate.getFullYear().toString().slice(-2);
        return `${month} ${day}, ${year}`;
      },
    },
  methods: {
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
      fetchSingleMovie() {
      axios.get(`https://api.themoviedb.org/3/movie/${this.id}`, {
        params: {
            api_key: 'bc3678651b1e8f0bd3ee98d5e1052b24',
            language: 'en-US',
          },
      })
        .then(response => {
          this.movie = response.data;
          this.movieBackdropPath = `https://image.tmdb.org/t/p/original/${response.data.backdrop_path}`;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          this.loading = true;
        });
    },
    },
  mounted() {
    this.fetchSingleMovie();
  },
 }
</script>