<template>
  <div class="mission-list">
    <div class="mission-list-item" v-for="(item, index) in missionlist" :key="index">
      <image class="mission-list-item-image" :src="item.image" ></image>
      <div class="mission-list-item-word">
        <ul>
          <li> 
            <span class="mission-list-item-title">{{item.title}} </span>
            <span class="mission-list-item-location">{{item.location}}</span>
          </li>
          <li><span><mp-rate rateValue=3 rateClass="mission-list-item-star"></mp-rate></span></li>
          <li>
            <span class="mission-list-item-time">{{item.time}}</span>
          </li>
          <li class="mission-list-item-intro">{{item.intro}}</li>
          <li class="mission-list-item-price">
            <span>CNY￥</span>
            <span>{{item.price}}</span>
          </li>
        </ul>
      </div>
      <div class="divideline"></div>
    </div>
  </div>
</template>

<script>

import mpRate from 'mpvue-weui/src/rate';

export default {
  components: {
    mpRate,
  },
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },

  data () {
    return {
      missionlist: this.list
    }
  }

}
</script>

<style>
.mission-list {
  margin: 30rpx;
}

.mission-list-item {
  height: auto;
  overflow: hidden;
}

.mission-list-item-image {
  width: 30%;
  max-height: 200rpx;
  float: left;
}

.mission-list-item-word {
  width: 70%;
  float: right;
  font-size: 35rpx;
}

.mission-list-item-title {
  font-size: 40rpx;
  font-weight: bold;
}

.mission-list-item-time {
  margin-right: 30rpx;
  color: red;
}

.mission-list-item-price {
  float: right;
  color: brown;
}

.mission-list-item-location{
  color: white;
  float: right;
  border: 2rpx solid green;
  background-color: green;
  border-radius: 5rpx;
  text-align: center;
  margin-top:10rpx;
  width: 100rpx;
  height: 50rpx;
  font-size: 25rpx;
  line-height: 50rpx;
}

.mission-list-item-star{
  width: 40rpx !important;
  height: 40rpx !important;
}

.divideline{
  height: 3rpx;
  width: 100%;
  float:left;
  background-color: rgba(155, 146, 146, 0.548);
  margin: 10rpx;
}
</style>