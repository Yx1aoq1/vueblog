import { createApp } from 'vue'
import router from '@/plugins/router'
import App from '@/App.vue'
import inject from '@/plugins/inject'
import '@/styles/index.less'

createApp(App)
  .use(inject)
  .use(router)
  .mount('#app')
