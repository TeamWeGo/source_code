<template>
  <div class="mission-list">
    <div class="mission-list-item" v-for="(item, index) in missionlist" :key="index">
      <image class="mission-list-item-image" :src="item.image" ></image>
      <div class="mission-list-item-word">
        <ul>
          <li class="mission-list-item-title">{{item.title}}</li>
          <li>
            <span class="mission-list-item-time">{{item.time}}</span>
            <span class="mission-list-item-location">{{item.location}}</span>
          </li>
          <li class="mission-list-item-intro">{{item.intro}}</li>
          <li class="mission-list-item-price">
            <span>{{item.price}}</span>
            <span>闲钱币</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
}

.mission-list-item-price {
  float: right;
}
</style>