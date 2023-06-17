<template>
<svg class="stat-circle" width="60" height="60" viewBox="0 0 20 20">
  <circle class="circle-bg" cx="10" cy="10" r="8" />
  <circle :class="getProgressClass(movie.vote_average)" cx="10" cy="10" r="8" :style="{ 'stroke-dashoffset': calculateOffset(movie.vote_average) }" />
  <circle class="circle-middle" cx="10" cy="10" r="7" />
  <text class="circle-text" x="50%" y="50%" text-anchor="middle" dominant-baseline="middle">
    <tspan class="percentage-text">{{ formatPercentage( movie.vote_average * 10) }}</tspan>
    <tspan class="percentage-symbol">%</tspan>
  </text>
</svg>
</template>
<script>
export default {
  props: {
        movie: {
            required: true
        },
    },
  computed: {
      circumference() {
      const radius = 8;
      return 2 * Math.PI * radius;
      },
  },
  methods: {
    calculateOffset(score) {
        const radius = 8;
      const circumference = 2 * Math.PI * radius;
      const progress = score / 10; 
      const offset = circumference * (1 - progress);
      return `${offset}px`;
    },
    calculateProgress(score) {
      const progress = score * 10; 
      return `${progress}%`;
    },
    getProgressClass(score) {
      return score > 7 ? 'circle-progress progress-green' : 'circle-progress progress-yellow';
    },
    formatPercentage(score) {
      const roundedPercentage = Math.round(score);
      return String(roundedPercentage);
    },
  }
}
</script>

