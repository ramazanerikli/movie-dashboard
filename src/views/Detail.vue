<template>
  <div>{{movie.title}}</div>
 <!--  {{this.$route.params.Mid}} -->



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