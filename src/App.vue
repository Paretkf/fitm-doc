<template>
<div>
  <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
  <router-view/>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      isLoading: 'style/isLoading'
    })
  }
}
</script>

<style lang="css">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.button {
  border-radius: 18px;
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  padding-left: 10px;
  opacity: 0;
}

/* Scrollbar
  -------------------------- */
  ::-webkit-scrollbar {
    width: 0.9rem;
}

::-webkit-scrollbar-thumb {
  border: 4px solid rgba(0, 0, 0, 0);
  border-radius: 8px;
  background-clip: padding-box;
  background-color: rgba(186,186,186,0.7);
}

::-webkit-scrollbar-track {
  background-color: rgba(248,248,248,1);
}

.is-scrollbarless {
  overflow: hidden;
}

.is-scrollbarless-x {
  overflow-x: hidden;
}

.is-scrollbarless-y {
  overflow-y: hidden;
}
</style>
