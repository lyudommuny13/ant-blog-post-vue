import { createApp } from 'vue'
// style
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'nprogress/nprogress.css'
import '@/assets/base.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
// base component
import BaseButton from './components/ui/base/BaseButton.vue'
import BaseInput from './components/ui/base/BaseInput.vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('BaseButton', BaseButton)
app.component('BaseInput', BaseInput)

// Toast
const toastOptions = {
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
};

app.use(Toast, toastOptions)

// Services
app.use(createPinia())
app.use(router)

// Run project
app.mount('#app')
