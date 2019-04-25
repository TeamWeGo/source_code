import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    curCity: ""
  },
  mutations: {
    changeCity (state, city) {
      state.curCity = city
    }
  }
})

export default store
/*module.exports = {
  store: store
}*/