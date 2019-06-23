<template>
  <div class="weui-tab">
    <div class="weui-navbar">
      <div v-for="(item,index) in tabs" :key="index" :id="index" :class="{'weui-bar-item-on':activeIndex == index && role == 'worker', 'weui-bar-item-on-o':activeIndex == index && role == 'cow' , 'mark':index ==3}" class="weui-navbar__item" @click="tabClick">
        <div class="weui-navbar__title">{{item}}</div>
      </div>
    </div>
    <div class="weui-navbar-content__slider">
      <div class="weui-navbar-slider" v-for="(item,index) in tabs" :key="index">
        <div class="weui-navbar-slider-inner" :class="{'weui-navbar-slider-on':activeIndex == index && role == 'worker','weui-navbar-slider-on-o':activeIndex == index && role == 'cow'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: []
    },
    activeIndex: {
      type: Number,
      default: 0
    },
    role: {
      type: String,
      default: 'worker'
    }
  },
  data(){
    return {
      weui_navbar_slider_on:'weui-navbar-slider-on-g'
    }
  }
  ,
  methods: {
    tabClick(e) {
      this.activeIndex = Number(e.currentTarget.id);
      this.$emit('tabClick', this.activeIndex);
    }
  },
  watch: {
    role:function (value){
      this.role = value
      
    },
    activeIndex:function (value){
      this.activeIndex = value
    }
  }
};
</script>

<style scoped>
.weui-tab {
  border-bottom: 1rpx solid #ccc;
}
.weui-navbar {
  position: relative;
  border: none;
}
.weui-tab__content {
  padding-top: 60px;
  text-align: center;
}
.weui-navbar-content__slider {
  display: flex;
}
.weui-navbar-slider {
  flex: 1;
}
.weui-navbar-slider-inner {
  height: 6rpx;
  width: 80%;
  margin: 0 auto;
  transition: all 0.3s;
}
.weui-navbar-slider-on {
  background-color: #1aad19;
}
.weui-navbar-slider-on-o{
  background-color: orangered;
}
.weui-bar-item-on{
  color: #1aad19;
}
.weui-bar-item-on-o{
  color: orangered;
}
.mark{
  border-radius: 5%;
  background-color: rgba(0, 128, 0, 0.466);
}
</style>
