<template>
  <div class="alphabet">
    <ul>
      <li class="alpItem" v-for="item in letters" :key="item"
          @click="handleClick"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
      >{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    cities: {}
  },
  data () {
    return {
      touchStatus: false
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
  updated () {

  },
  methods: {
    
  }
}
</script>
