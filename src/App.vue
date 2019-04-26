<template>
  <div id="app">
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  components: {
    'navbar': Nav
  },
  async mounted() {
    this.$store.dispatch('CHECK_AUTHORIZED', null)
  }
}
</script>


<style lang="scss">
@font-face {
  font-family: 'Acrom';
  src: url(./assets/fonts/Acrom-Regular.ttf);
}

body {
  margin: 0;
  font-family: 'Acrom';
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
