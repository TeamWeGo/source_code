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
    handleClick() {
      let url = "../studyList/main?type=" + this.text;
      wx.navigateTo({ url });
    }
  }
};
</script>

<style scoped>
.circle {
  border-radius: 50%;
  width: 140rpx;
  height: 140rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f2a1;
  box-shadow: 2rpx #f8f2a1;
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
