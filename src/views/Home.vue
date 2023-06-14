<template>
  <div class="page-container container-fluid">

    <h1 class="text-start my-3">Popular Movies</h1>


    <div class="">
    <div class="movies-list d-flex flex-row flex-wrap gap-3">
      <div class="" v-for="(movie, index) in popularMovies" :key="index">
        <div class="card movie-card" style="width: 18rem;">
          <div class="movie-action">
            <div class="add-favorite unfavorite">
              <font-awesome-icon icon="fa-solid fa-heart" />
            </div>
            <img class="movie-poster" :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`">
            <span class="vote-average">{{ movie.vote_average }}</span>
          </div>
          <div class="card-body">
            <h5 class="movie-title">{{ movie.title }}</h5>
            <p class="release-date text-muted small">{{  movie.release_date  }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  </div>
</template>
<script>

import axios from 'axios'

export default {
  data() {
    return {
      popularMovies: []
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