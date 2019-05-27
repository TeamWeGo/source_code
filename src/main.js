import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

wx.cloud.init({
  env: 'earnmoney-7c2ab8',
  traceUser: true
})

const app = new Vue(App)
app.$mount()
