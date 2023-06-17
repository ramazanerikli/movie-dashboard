<template>
  <div class="page-container container-sm">
    <h1 class="text-start my-3">Popular Movies</h1>
    <div v-if="loading" class="loading-container">
      <LoadingSpinner />
    </div>
    <div v-else>
      <div class="movies-list row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      <MovieItem 
        v-for="(movie, index) in popularMovies" 
        :key="index" 
        :movie="movie"
      />
    </div>
    </div>
  </div>
</template>
<script>

import axios from 'axios'

import MovieItem from "../components/MovieItem.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";

export default {
  components: {
    MovieItem,
    LoadingSpinner,
  },
  data() {
    return {
      loading: true,
      popularMovies: [],
    }
  },
  mounted() {
    this.fetchPopularMovies();
  },
  methods: {
    goToDetail(MovId) {
      this.$router.push({name: 'DetailPage', params:{Mid:MovId }})
    },
    fetchPopularMovies() {
      axios.get('https://api.themoviedb.org/3/movie/popular', {
        params: {
            api_key: 'bc3678651b1e8f0bd3ee98d5e1052b24',
            language: 'en-US',
            page: 1,
          },
      })
        .then(response => {
          this.popularMovies = response.data.results;
          this.popularMovies = this.popularMovies.map(movie => ({ ...movie, isFavorite: false }));
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          this.loading = true;
        });
    },
  }
}
  
</script>