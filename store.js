import { createStore } from 'vuex'

export default createStore({
  state: {
    favoriteMovies: []
  },
  mutations: {
    addFavoriteMovie(state, movie) {
      state.favoriteMovies.push(movie);
    },
    removeFavoriteMovie(state, movieId) {
      state.favoriteMovies = state.favoriteMovies.filter(movie => movie.id !== movieId);
    }
  },
  actions: {

  },
  getters: {
    getFavoriteMovies(state) {
      return state.favoriteMovies;
    },
    isMovieFavorite: (state) => (movieId) => {
      return state.favoriteMovies.some(movie => movie.id === movieId);
    }
  }
})