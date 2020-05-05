const defaultSearchTerm = 'a';

const demo = new Vue({
  el: '#main',
  data: {
    searchString: "",
    movies: []
  },
  mounted() {
    axios.get(`https://api.themoviedb.org/3/search/movie?query=${defaultSearchTerm}&api_key=dbc0a6d62448554c27b6167ef7dabb1b`).then(response => {
      this.movies = response.data.results
    })
  },
  watch: {
    'searchString': function(val){
      axios.get(`https://api.themoviedb.org/3/search/movie?query=${val}&api_key=dbc0a6d62448554c27b6167ef7dabb1b`).then(response => {
        this.movies = response.data.results
      });
    }
  }
});