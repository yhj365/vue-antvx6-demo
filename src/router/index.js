import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/index')
    },
    {
      path: '/ER',
      name: 'ER',
      component: () => import('@/views/ER/index')
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('@/views/demo/index')
    },
    {
      path: '/xiaonuo',
      name: 'xiaonuo',
      component: () => import('@/views/xiaonuo/index')
    },
    {
      path: '/movaTable',
      name: 'movaTable',
      component: () => import('@/views/movaTable/index')
    }
  ]
})
