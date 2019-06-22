<template>
  <div class="outer">
    <div class="detail" @click="toDetail">
      <img class="detail-img" :src="mission.imgSrc">
      <div class="detail-info">
        <p class="title">{{mission.title}}</p>
        <p class="time">开始时间：{{mission.time}}</p>
        <p class="endtime">截至时间：{{mission.endTime}}</p>
        <p class="address">地点：{{mission.address}}</p>
        <p class="account">金额：{{mission.account}}</p>
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>

</<script>
export default {
  props: [ 'mission' ],
  methods: {
    toDetail() {
      let temp = this.mission.task;
      var obj = JSON.stringify(temp);
      let url = "../community/taskDetails/main?obj=" + obj;
      wx.navigateTo({ url });
    }
  }
}
</script>

<style scoped>
.outer {
  width: 100%;
  margin: 10rpx;
  display: inline-flex;
  flex-direction: column;
}
.detail {
  margin: 6rpx;
  height: 90px;
  width: 98%;
  display: inline-flex;
  flex-direction: row;
}
.detail-img {
  height: 80px;
  width: 80px;
}
.detail-info {
  margin-left: 36rpx;
  display: inline-flex;
  flex-direction: column;
}
.title {
  font-size: 12px;
  font-weight: bold;
}
.time,
.address,
.account,
.endtime {
  font-size: 10px;
  margin-top: 1px;
}
.line {
  margin-left: 10rpx;
  margin-right: 10rpx;
  border-bottom: 1px solid #c9c5c7;
}
</style>

