<template>
  <div class="detail">
    <img class="detail-img" :src="mission.imgSrc" >
    <div class="detail-info">
      <p class="title">{{mission.title}}</p>
      <p class="time"> 时间：{{mission.time}}</p>
      <p class="address"> 地点：{{mission.address}}</p>
      <p class="account"> 金额：{{mission.account}}</p>
    </div>
  </div>
</template>

</<script>
export default {
  props: [ 'mission' ]
}
</script>

<style scoped>
.detail {
  margin: 8px;
  height: 80px;
  width: 100%;
  display: inline-flex;
  flex-direction: row;
}
.detail-img {
  height: 80px;
  width: 80px;
}
.detail-info {
  margin-left: 8px;
  display: inline-flex;
  flex-direction: column;
}
.title {
  font-size: 15px;
  font-weight: bold;
}
.time, .address, .account {
  font-size: 12px;
  margin-top: 3px;
}
</style>

