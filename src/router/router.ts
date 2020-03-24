import { createRouter, createWebHistory } from 'vue-router'

import { appStore } from '@/stores/app.store'

import Login from '@/pages/Login'
import Chart from '@/pages/Chart'

/* createWebHistory() is used to set `mode: history` on the router (HTML5 history, instead of hashbang) */
export const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'login',
      /* I'm adding some custom meta properties here that can be used to select a root template (layout) and guard auth vs non-auth routes */
      meta: { layout: 'auth', noAuth: true },
      component: Login,
    },
    {
      path: '/chart',
      name: 'chart',
      meta: { layout: 'modern', noAuth: true },
      component: Chart,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  // console.log(`Guard from ${from.fullPath} to ${to.fullPath}`)
  if (to.params.id === 'no-name') return next(false) // do not navigate
  next()
})

router.beforeEach((to, from, next) => {
  if (appStore.getState().cancelNextNavigation) return next(false)
  next()
})

router.afterEach((to, from) => {
  console.log(
    `After guard: from ${from.fullPath} to ${
      to.fullPath
    } | location = ${location.href.replace(location.origin, '')}`
  )
})

router.beforeEach((to, from, next) => {
  console.log('second guard')
  if (to.query.to) next(to.query.to as string)
  else next()
})

const dirLog = {
  '': '？',
  back: '⏪',
  forward: '⏩',
}

routerHistory.listen((to, from, info) => {
  console.log(`${dirLog[info.direction]} as a ${info.type}`)
})


export default router
