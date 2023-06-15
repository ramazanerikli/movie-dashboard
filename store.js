import { createStore } from 'vuex'

export default createStore({
  state: {
    firstName: 'John',
    lastName: 'Doe',
    favoriteMovies: []
  },
  mutations: {
    setFavoriteMovies(state, movies) {
      state.favoriteMovies = movies;
    },
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