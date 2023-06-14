<template>

<router-link :to="`/detail/${movie.id}`">

  <div class="movie-item">
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
</router-link>
</template>
<script>
  export default {
    props: {
      movie: {
        required: true
      }
    }
  }
</script>