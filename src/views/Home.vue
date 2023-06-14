<template>
  <div class="page-container container-sm">

    <h1 class="text-start my-3">Popular Movies</h1>


    <div class="movies-list d-flex flex-row flex-wrap gap-3">
      <MovieItem v-for="(movie, index) in popularMovies" :key="index" :movie="movie" />

    </div>

  </div>
</template>
<script>

import axios from 'axios'
import MovieItem from "../components/MovieItem.vue";

export default {
  components: {
    MovieItem
  },
  data() {
    return {
      popularMovies: []
    }
  },
  methods: {
    goToDetail(MovId) {
      this.$router.push({name: 'DetailPage', params:{Mid:MovId }})
    }
  },
  mounted() {

    

    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=bc3678651b1e8f0bd3ee98d5e1052b24&language=en-US&page=1', {
    params: {
      api_key: 'YOUR_API_KEY'
    }
  })
  .then(response => {
    this.popularMovies = response.data.results;
    console.log(response.data.results)
  })
  .catch(error => {
    console.log(error);
  });
  }
}
  
 /* var movies = []
  async function getMovies() {   
 const data = axios.get('https://api.themoviedb.org/3/movie/popular?api_key=bc3678651b1e8f0bd3ee98d5e1052b24&language=en-US&page=1')
 const result = await data
    result.data.results.forEach((movie) => {
      movies.push(movie)
    })
    console.log(movies);
  }

  async function fetch() {  
    await this.getMovies()
  }

  



getMovies() */

</script>