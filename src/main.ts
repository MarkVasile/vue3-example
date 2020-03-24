import { createApp } from 'vue'
import { router, routerHistory } from '@/router'

import { appStore } from '@/stores/app.store'
import App from './App.vue'

declare global {
  interface Window {
    // h: HTML5History
    h: typeof routerHistory
    r: typeof router
  }
}

// for testing purposes
window.h = routerHistory
window.r = router

const app = createApp(App)

// we can provide a global state, which can then be injected in individual components
// however, I think we should try to use module stores everywhere possible
app.provide('state', appStore.getState())
app.use(router)

app.mount('#app')
