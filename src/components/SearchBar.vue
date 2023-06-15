<template>
  <div class="position-relative">
    <form class="search-wrapper d-flex position-relative" role="search">
      <div class="search-icon position-absolute">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      </div>
      <input @input="debounceSearch" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
    </form>
    <div v-if="searchResult.length != 0" class="position-absolute search-results">
      <ul class="list-unstyled mt-3">
        <li :key="index" v-for="(movie, index) in searchResult" class="d-flex mb-2 text-start">
          <router-link :to="`/detail/${movie.id}`" class="text-capitalize text-white text-decoration-none">
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
      searchResult: []
    }
  },
  methods: {
    debounceSearch(event) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.fetchSearch(event.target.value)
      }, 600)
    },
    fetchSearch(term) {
      axios.get(`https://api.themoviedb.org/3/search/movie?query=${term}&api_key=bc3678651b1e8f0bd3ee98d5e1052b24&include_adult=false&language=en-US`)
      .then(response => {
        this.searchResult = response.data.results;
        console.log(response.data.results)
      })
      .catch(error => {
        console.log(error);
      });
      }
    }
}
</script>