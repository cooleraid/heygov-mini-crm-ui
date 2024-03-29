import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "preline/preline";

import App from './App.vue'
import router from './router'
import './index.css'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const app = createApp(App)

app.use(ToastPlugin);
app.use(createPinia())
app.use(router)
app.use(LoadingPlugin);

app.mount('#app')
