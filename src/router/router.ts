import Vue from 'vue'
import { createRouter, createWebHistory } from 'vue-router' 

const router = createRouter({
  history: createWebHistory(),
  routes: [ 
    {
      path: '/',
      name: 'root',
      meta: { layout: 'modern', noAuth: true },
      component: () => import(/* webpackChunkName: "public" */ '@/pages/About'),
    },
  ],
})

Vue.use(router)

export default {
}
