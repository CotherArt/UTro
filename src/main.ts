// import './assets/main.css'
// import './style.css'
import 'primevue/resources/themes/viva-dark/theme.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'
import 'animate.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// primevue
import ToastService from 'primevue/toastservice'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import { install } from 'vue3-recaptcha-v2'

/* add icons to the library */
library.add(fas, fab)

import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
export const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.use(install, {
  sitekey: '6Lfm1IspAAAAABhp9p1TYaM04WeHmlVmb4Hxyeju',
  cnDomains: false // Optional, If you use in China, set this value true
})

app.mount('#app')
