<template>
  <div class="circleTemplate" @click="handleClick">
    <div class="circle">
      <img class="circle-img" v-if="imgSrc" :src="imgSrc">
    </div>
    <p class="circle-text">{{text}}</p>
  </div>
</template>

<script>
export default {
  props: ["text", "imgSrc"],
  methods: {
    handleClick () {
      let url = '../studyList/main?type=' + this.text;
      wx.navigateTo({ url })
    }
  }
};
</script>

<style scoped>
.circle {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.circle-img {
  width: 50px;
  height: 50px;
}
.circle-text {
  font-size: 12px;
  text-align: center;
}
.circleTemplate {
  margin: 10px;
}
</style>
