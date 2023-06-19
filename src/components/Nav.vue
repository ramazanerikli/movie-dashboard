<template>
  <nav class="navbar navbar-expand-lg py-3 fixed-top"  :class="{ 'navbar-hidden': navbarHidden }">
    <div class="container-sm">
      <div class="navbar-inner w-100">
      <ul class="navbar-nav mb-2 mb-lg-0">
        <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="nav-link-active">Home</router-link> 
        </li>
        <li class="nav-item">
            <router-link to="/favorites" class="nav-link" active-class="nav-link-active">Favorites</router-link>
        </li>
      </ul>
        <SearchBar></SearchBar>
    </div>
    </div>
  </nav>
  <router-view :key="$route.fullPath"></router-view>
</template>
<script>
import SearchBar from "../components/SearchBar.vue"
export default { 
  components: { 
    SearchBar 
  },
  data() {
    return {
      navbarHidden: false,
      lastScrollPosition: 0,
      scrollTimeout: null,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      const scrollingDown = scrollPosition > this.lastScrollPosition;
      this.lastScrollPosition = scrollPosition;

      if (scrollingDown && scrollPosition > 60) {
        this.navbarHidden = true;
      } else {
        this.navbarHidden = false;
      }
    },
  },
  }
</script>