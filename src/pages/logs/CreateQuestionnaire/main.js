import Vue from 'vue'
import App from './index'

import '../../../../static/weui/weui.css'

Vue.config.errorHandler = function (err) {
    if (console && console.error) {
      console.error(err)
    }
}
  
const app = new Vue(App)
app.$mount()