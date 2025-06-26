import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/routes'
import { createPinia } from 'pinia'


const app = createApp(App)
app.use(router).use(createPinia())
app.mount('#app')
