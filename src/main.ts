import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import { loadingOnnxruntime } from './adapters/util'

loadingOnnxruntime()

createApp(App).mount('#app')
