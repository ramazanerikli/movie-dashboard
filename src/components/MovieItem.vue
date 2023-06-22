<template>
  <div class="col movie-item">
    <div class="add-favorite" :class="{ 'favorite': this.$store.getters['isMovieFavorite'](movie.id) }" @click="addToFavorite(movie)">
        <font-awesome-icon icon="fa-solid fa-heart" />
    </div>
    <router-link :to="`/detail/${movie.id}`" class="movie-item-wrapper">
      <div class="card movie-card" >
          <div class="movie-action">
            <img class="movie-poster" :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`">
            <div class="vote-average">
              <StatCircle :movie="movie" />
            </div>
          </div>
          <div class="card-body">
            <h5 class="movie-title" >{{ movie.title }}</h5>
            <p class="release-date text-muted small">{{ formattedDate  }}</p>
          </div>
      </div>
      </router-link>
  </div>

</template>
<script>
import store from "../../store";
import {useToast} from 'vue-toast-notification';
import StatCircle from "../components/StatCircle.vue";

const $toast = useToast();
  export default {
    components: {
      StatCircle
    },
    props: {
        movie: {
            required: true
        },
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
        addToFavorite(movie) {
            const isFavorite = this.$store.getters["isMovieFavorite"](movie.id);
            if (isFavorite) {
                store.commit("removeFavoriteMovie", movie.id);
                $toast.open({
                    message: `${movie.title} was removed from your favorite list`,
                    type: "error",
                    duration: 3000,
                    dismissible: true
                });
            }
            else {
                movie.isFavorite = true;
                store.commit("addFavoriteMovie", movie);
                $toast.open({
                    message: `${movie.title} was added to your favorite list`,
                    type: "success",
                    duration: 3000,
                    dismissible: true
                });
            }
        },
    },
}
</script>