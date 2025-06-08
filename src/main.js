import { createApp } from 'vue'
import { createBootstrap } from 'bootstrap-vue-next'
import VueChatScroll from 'vue-chat-scroll'

import App from './App.vue'
import router from './router'
import store from './store/index'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import './assets/css/loading.css'
import './assets/css/loading-btn.css'

const app = createApp(App)

app.config.productionTip = false
app.use(createBootstrap())
app.use(VueChatScroll)

app.use(router)
app.use(store)
app.mount('#app')

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
