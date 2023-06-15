<template>
  

  <div class="page-container container-sm">
    <div class="row detail-inner py-4">
      <div class="col-4">
        <div class="movie-poster-field position-relative">
          <img class="movie-poster" :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`">
          <span class="vote-average position-absolute">{{ movie.vote_average }}</span>
        </div>
      </div>
      <div class="col-8">
        <div class="movie-info-field text-start">
          <h2 class="movie-title">{{movie.title}}</h2>
          <div class="movie-meta">
            <span>{{ movie.release_date  }}</span>
          </div>
          <div class="movie-overview">
            <h3>Overview</h3>
            <p>
              {{ movie.overview }}
            </p>

            <h5 class="sub-title my-2">Tagline</h5>
            <span>{{  movie.tagline  }}</span>


           <!--  <span>{{ movie.budget }}</span> -->

            <h5 class="sub-title my-3">Genres</h5>

            <ul class="d-flex flex-row list-unstyled gap-3">
              <li v-for="(genre, index) in movie.genres" :key="index">
                <span>{{  genre.name  }}</span>
            </li>
            </ul>

            <h5 class="sub-title my-3">Original Language</h5>

            <span class="text-uppercase">{{  movie.original_language  }}</span>


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
 export default{
  name:'detail',
  data(){
   return{
    title:"asd",
    id: this.$route.params.Mid,
    movie: []
   }
  },
  mounted() {
   // console.log(this.$route.params.Mid)

    // https://api.themoviedb.org/3/movie/569094?api_key=bc3678651b1e8f0bd3ee98d5e1052b24&language=en-US'


   // https://api.themoviedb.org/3/movie/603692?api_key=bc3678651b1e8f0bd3ee98d5e1052b24&language=en-US

    axios.get
    (`https://api.themoviedb.org/3/movie/${this.id}?&language=en-US`, {
    params: {
      api_key: 'bc3678651b1e8f0bd3ee98d5e1052b24'
    }
  })
  .then(response => {
    this.movie = response.data;
   // this.popularMovies = response.data.results;
  //  console.log(response.data.results)
  console.log(this.movie)
  })
  .catch(error => {
    console.log(error);
  });

  },


 }
</script>