<template>
  <div class="swiper-container">
    <swiper class="swiper"
      :previous-margin="previousMargin"
      :next-margin="nextMargin"
      :circular="circular"
      @change="handleChange($event)">
      <block v-for="(item, index) in sliders" :key="index">
        <swiper-item>
          <div :class="curIndex==index ? 'active_item' : 'item'" :animation="index == curIndex ? animationData : animationData2" >
            <card :imgSrc="item.img" :desc="item.desc" />
          </div>
        </swiper-item>
      </block>
    </swiper>

    <div class="dot-wrapper">
      <ul class="dots">
        <li v-for="(dot,i) in sliders" :key="i" :class="{'active': curIndex===i}"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      curIndex: 0,
      sliders: [
        {
          img: '/static/images/user.png',
          desc: 'user'
        },
        {
          img: '/static/images/search.png',
          desc: 'search'
        },
        {
          img: '/static/tabs/home.png',
          desc: 'home'
        },
        {
          img: '/static/tabs/comments.png',
          desc: 'comments'
        }
      ],
      circular: true,
      previousMargin: '60px',
      nextMargin: '60px',
      animationData: {},
      animationData2: {}
    }
  },

  components: {
    card
  },

  methods: {
    handleChange (e) {
      this.curIndex = e.mp.detail.current
      this.changeActive()
      this.changeNormal()
    },
    // 收缩
    changeNormal () {
      var animation2 = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease'
      })
      // this.animation2 = animation2
      animation2.scale(0.5).opacity(0.3).step()
      this.animationData2 = animation2.export()
    },
    // 展开
    changeActive () {
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease'
      })
      // this.animation = animation
      animation.scale(1).opacity(1).step()
      this.animationData = animation.export()
    }
  },

  computed: {
    containerStyle: function () {
      return {
        transform: `translated3d(${this.distance}px,0,0)`
      }
    }
  },

  created: function () {
    // None
  }
}
</script>

<style scoped>
.swiper-container {
  margin-top: 20px;
  padding-bottom: 6px;
  position: relative;
  margin: auto;
  width: 100%;
  height: auto;
  background: #303030;
}
.item{
  transform: scale(0.5);
  transform-origin: 50% 50% 0px;
  opacity: 0.3;
}
.active_item{
  transform: scale(1);
  opacity: 1;
}
.active{
  width: 15rpx;
  height: 15rpx;
  box-sizing: border-box;
  border-radius: 50%;
  border: 2rpx solid #b99c6d;
  margin-right: 15rpx;
  background-color: #303030;
}
.dot-wrapper {
  position: absolute;
  left: 45%;
  bottom: 15%;
  width: 10%;
  height: 15rpx;
}
ul{
  left: 0;
  margin: auto;
  overflow: hidden;
  display: inline-flex;
}
li{
  width: 15rpx;
  height: 15rpx;
  box-sizing: border-box;
  border-radius: 50%;
  border: 2rpx solid #b99c6d;
  margin-right: 15rpx;
}
</style>

