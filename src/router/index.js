import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import AppMain from '@/views/AppMain'
import CreateDoc from '@/views/create-doc/index'
import Main from '@/views/main/index'
import GenQR from '@/views/gen-qr/index'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      component: AppMain,
      children: [
        {
          path: '',
          name: 'main',
          component: Main
        },
        {
          path: 'create-doc',
          name: 'create-doc',
          component: CreateDoc
        },
        {
          path: 'gen-qr',
          name: 'gen-qr',
          component: GenQR
        }
      ]
    }
  ]
})
