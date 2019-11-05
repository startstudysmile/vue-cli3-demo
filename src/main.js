import Vue from 'vue'
import App from './App.vue'
import router from './route/index'
import store from './vuex/store'

import moment from 'moment'
import VueLazyLoad from 'vue-lazyload'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/css/reset.css'
import '@/assets/styles/css/resetElement.css'

Vue.use(VueLazyLoad, {
  loading: require('@/assets/images/img/loading.gif')
})

Vue.use(ElementUI)

Vue.prototype.$moment = moment

moment.locale('zh-cn')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
