<template>
  <div>
    <div class="nav-view">
      <NavBar :isMobile="false"/>
    </div>
    <div class="nav-mobile">
        <div class="dp-flex w-100pct h-60px al-it-center pd-10px">
          <svg-filler class="cs-pointer"
                      path="/static/svg/0bars.svg"
                      :fill="'#989b9e'"
                      width="20px" height="20px"
                      @click="showNavMobile = !showNavMobile"
                      />
          <span class="f-1 t-al-center f-w-bold cl-title">
            FITM DOCUMENT
          </span>
        </div>
    </div>
      <NavBar class="pst-absolute z-id-1" :isMobile="true" v-show="showNavMobile" @onChangeRoute="onChangeRoute()"/>
    <div class="components-view pd-vtc-10px pd-hrzt-20px">
      <router-view class="card box-element pd-20px t-al-center" />
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/layout/BaseSideBar'
export default {
  components: {
    NavBar
  },
  data () {
    return {
      showNavMobile: false
    }
  },
  methods: {
    onChangeRoute () {
      this.showNavMobile = !this.showNavMobile
    }
  }
}
</script>
<style>
.cl-title {
  color: #989b9e;
}
.nav-mobile {
  height: 60px;
  background-color: #2a323b;
  border-left: 1px solid #000;
}
@media screen and (max-width: 769px) {
  .nav-mobile {
    display: block;
  }
  .nav-view {
    display: none;
  }
  .components-view {
    width: 100vw;
    height: calc(100vh - 60px);
  }
  .box-element {
    height: calc(100vh - 80px);
  }
}
@media screen and (min-width: 769px) {
   .nav-mobile {
    display: none;
  }
  .components-view {
    width: calc(100vw - 200px);
    height: 100vh;
  }
  .box-element {
    height: calc(100vh - 20px);
  }
}
input {
  user-select: text;
}
.box-element {
  overflow: auto;
}
html,body{
  height: 100%;
  width: 100%;
  margin: 0;
  position: relative;
}
.components-view {
  overflow: auto;
  float: left;
  background-color: #f1f1f1;
}
.nav-view {
  width: 200px;
  height: 100vh;
  float: left;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body::-webkit-scrollbar {
  display: none;
}

main {
  text-align: center;
}
</style>
