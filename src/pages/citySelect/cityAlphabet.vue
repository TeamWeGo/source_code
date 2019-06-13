<template>
  <div class="alphabet">
    <ul>
      <li class="alpItem" v-for="item in letters" :key="item" :ref="item"
          @click="handleClick($event)"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
      >{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import store from '@/components/store'

export default {
  props: {
    cities: {}
  },
  data () {
    return {
      touchStatus: false,
      startY: 0,
      dis: 0
    }
  },
  computed: {
    letters () {
      var letters = []
      for(let key in this.cities) {
        letters.push(key)
      }
      return letters
    }
  },
  /*updated () {
    this.startY = this.$refs['A'].offsetTop
  },*/
  methods: {
    handleLetterClick(e) {
      store.commit('changeAlphabet', e.target.innerText);
    },
    handleClick(e) {
      console.log(e.mp._relatedInfo.anchorTargetText);
      //console.log(this.$refs['A'])
      let txt = e.mp._relatedInfo.anchorTargetText;
      store.commit('changeAlphabet', txt);
      //console.log(store.state.city_alphabet);
    },
    handleTouchStart(e) {
      this.touchStatus = true;
    },
    handleTouchMove(e) {
      if(this.touchStatus) {
        if(this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          const startY = this.$refs['A'].offsetTop
          const touchY = e.touches[0].clientY - 40
          const index = Math.floor((touchY - this.startY)/20)
          if(index >= 0 && index < this.letters.length){
            store.commit('changeAlphabet', e.target.innerText);
          }
        }, 16);
      }
    },
    handleTouchEnd() {
      this.touchStatus = false;
    }
  }
}
</script>

<style scoped>
.alphabet {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 40px;
  width: 20px;
  right: 0;
  bottom: 0;
  background: lightblue;
}
.alpItem {
  text-align: center;
  line-height: 20px;
  font-size: 12px;
}
</style>
