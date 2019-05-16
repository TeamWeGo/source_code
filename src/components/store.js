import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    curCity: "",
    city_alphabet: 97
  },
  mutations: {
    changeCity (state, city) {
      state.curCity = city
    },
    changeAlphabet (state, alphabet) {
      state.city_alphabet = alphabet
    }
  }
})

export default store
/*module.exports = {
  store: store
}*/