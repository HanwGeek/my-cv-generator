import Vue from 'vue'
import Router from 'vue-router'
import CVLayer from '@/components/CVLayer'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'User',
      component: User
    },
    {
      path: '/cv',
      name: 'CV',
      component: CVLayer
    }
  ]
})
