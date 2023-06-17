<template>
  <div class="position-relative">
    <form class="search-wrapper d-flex position-relative" role="search">
      <div class="search-icon position-absolute">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      </div>
      <input @input="debounceSearch" class="form-control me-2 pe-5" type="text" placeholder="Search" aria-label="Search" v-model="searchTerm">
      <button class="btn close-button position-absolute" v-show="showCloseButton" @click.prevent="clearSearch">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </button>
    </form>
    <div v-if="searchResult.length != 0 && this.searchTerm !== ''" class="position-absolute search-results">
      <ul class="list-unstyled mt-3">
        <li :key="index" v-for="(movie, index) in searchResult" class="d-flex mb-2 text-start">
          <router-link :to="`/detail/${movie.id}`" class="text-capitalize text-white text-decoration-none d-flex align-items-start gap-2 justify-content-between">
            <img class="movie-poster" :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" width="60" height="80"  @error="imageLoadError">

            {{ movie.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default{
  data() {
    return {
      searchResult: [],
      showCloseButton: false,
      searchTerm: '',
    }
  },
  methods: {
    imageLoadError (e) {
      e.target.src = require("@/assets/logo.png");
    },
    debounceSearch(event) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.showCloseButton = true,
        this.searchTerm = event.target.value,
        this.fetchSearch(this.searchTerm)
      }, 600)
    },
    clearSearch() {
      this.searchTerm = ''
      this.showCloseButton = false
    },
    fetchSearch(term) {
      axios.get(`https://api.themoviedb.org/3/search/movie?query=${term}&api_key=bc3678651b1e8f0bd3ee98d5e1052b24&include_adult=false&language=en-US`)
      .then(response => {
        this.searchResult = response.data.results;
      })
      .catch(error => {
        console.log(error);
      });
      }
    }
}
</script>