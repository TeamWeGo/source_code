<template>
  <div>
    <p class="ttt">{{ txt }}</p>
  </div>
</template>


<script>
export default {
  data () {
    return {
      txt: '个人中心'
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.ttt{
  size: 50px;
}
</style>
