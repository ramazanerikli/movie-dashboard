import { createStore } from 'vuex'

export default createStore({
  state: {
    favoriteMovies: []
  },
  mutations: {
    addFavoriteMovie(state, movie) {
      state.favoriteMovies.push(movie);
    }
  },
  actions: {

  },
  getters: {
    getFavoriteMovies(state) {
      return state.favoriteMovies;
    }
  }
})