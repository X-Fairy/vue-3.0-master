import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import addCustomer from '@/views/addCustomer'
import user from '@/views/user'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'user',
      component: user
    },
    {
        path: '/home',
        name: 'home',
        component: home
    },
    {
        path: '/addCustomer',
        name: 'addCustomer',
        component: addCustomer
      }
  ]
})