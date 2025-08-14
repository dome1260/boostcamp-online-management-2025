import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import vuetify from './plugins/vuetify'
import { createPinia } from 'pinia'
import piniaPersistState from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersistState)

app.use(router)
app.use(vuetify)
app.use(pinia)

app.mount('#app')
