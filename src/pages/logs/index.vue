<template>
  <div class="mission-main" @touchstart="touchStart" @touchend="touchEnd">
    <div v-bind:class="pageClass">
      <div class="mission-toolbar"></div>
      <div class="navbar">
        <mp-navbar :tabs="tabs" v-bind:activeIndex="tabs_index" @tabClick="tabClick"></mp-navbar>
      </div>
      <div class="fill"></div>
      <div class="missionlist">
        <missionList v-bind:list="missionlist"></missionList>
      </div>
    </div>
  </div>
</template>


<script>
import searchBar from "@/components/logs/searchBar";
import missionList from "@/components/logs/missionList";
import mpNavbar from "mpvue-weui/src/navbar";

import { api } from "../../utils/api.js";

export default {
  components: {
    searchBar,
    missionList,
    mpNavbar
  },

  data() {
    return {
      missionlist: [],
      tabs: ["已接收", "待完成", "已完成"],
      tabs_index: 0
    };
  },

  methods: {
    touchStart(e) {
      console.log("我开始了");
      this.startX = e.mp.changedTouches[0].pageX
      this.startY = e.mp.changedTouches[0].pageY
      console.log(this.startX, this.startY);
    },
    touchEnd(e) {
      console.log("我好了");
      this.endX = e.mp.changedTouches[0].pageX
      this.endY = e.mp.changedTouches[0].pageY
      if (Math.abs(this.endY - this.startY) < 20){
        if(Math.abs(this.endX - this.startX) > 45){
          if(this.endX > this.startX){
            this.tabs_index--;
            if(this.tabs_index < 0){
              this.tabs_index = 2;
            }
          }
          else{
            this.tabs_index++;
            if(this.tabs_index > 2){
              this.tabs_index = 0;
            }
          }
        }
      }
      console.log(this.endX, this.endY);
    }
  },

  created() {
    Date.prototype.Format = function(fmt) {
      //author: meizz
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    };

    api
      .querySomeByModel("tasks", {})
      .then(res => {
        //   console.log(res);
        this.missionlist = res.result;
        //  console.log(this.missionlist);
        this.missionlist.forEach(element => {
          var date = new Date(element.publish.beginTime);
          element.publish.beginTime = date.Format("yyyy-MM-dd");
          element.publish.endTime = date.Format("yyyy-MM-dd");
        });
      })
      .catch(rej => {
        console.warn(rej);
        console.log("NOOOOOO");
      });
  }
};
</script>

<style scoped>
.mission-main {
  height: 100%;
}

.site {
  width: 25%;
  text-align: center;
}

.mission-add {
  width: 15%;
  text-align: center;
}

.navbar {
  position: fixed; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
  top: 0; /* 距离窗口顶部距离 */
  left: 0; /* 距离窗口左边的距离 */
  width: 100%;
  background-color: white;
  z-index: 0;
}

.fill {
  width: 100%;
  height: 44px;
}

/* 侧边栏样式 */
.page-slidebar-close {
  height: 100%;
  width: 50%;
  left: -600rpx;
  position: fixed;
  background-color: white;
  z-index: 1;
  transition: 1s left;
}

.page-slidebar-open {
  height: 100%;
  width: 50%;
  left: 0;
  position: fixed;
  background-color: white;
  z-index: 1;
  transition: 1s left;
}

.page-top-open {
  left: 0;
}
.page-top-close {
  left: 100rpx;
}

/* 控制侧边栏的内容距离顶部的距离 */
.page-content {
  padding-top: 60rpx;
}

/* 侧边栏内容的 css 样式 */
.wc {
  color: black;
  padding: 30rpx 0 30rpx 150rpx;
  border-bottom: 1px solid #eee;
}
</style>