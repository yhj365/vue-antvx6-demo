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
      path: '/er2',
      name: 'er2',
      component: () => import('@/views/er2/index')
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
      path: '/moveTable',
      name: 'moveTable',
      component: () => import('@/views/moveTable/index')
    },
    {
      path: '/characteristicStructure',
      name: 'characteristicStructure',
      component: () => import('@/views/characteristicStructure/index')
    }
  ]
})
