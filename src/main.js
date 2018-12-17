// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import SvgFiller from 'vue-svg-filler'
import 'begeta/css/begeta.min.css'
import 'buefy/dist/buefy.css'
import VueSweetalert2 from 'vue-sweetalert2'
import store from './store'
Vue.use(VueSweetalert2)
Vue.use(Buefy)
Vue.config.productionTip = false
Vue.component('svg-filler', SvgFiller)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
