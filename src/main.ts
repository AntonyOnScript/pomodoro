import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import LottieAnimation from 'lottie-web-vue'
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

const app = createApp(App)

app.use(Quasar)
app.use(LottieAnimation)
app.mount('#app')