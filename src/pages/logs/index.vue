<template>
  <div class="mission-main" @touchstart="touchStart" @touchend="touchEnd" @touchmove="touchmove">
    <div v-bind:class="pageClass">
      <!-- <button :class="curRole" @click="tanchuang">{{  }}</button> -->
      <div class="mission-toolbar"></div>
      <div class="navbar">
        <mp-navbar
          :role="curRole"
          :tabs="tabs"
          v-bind:activeIndex="tabs_index"
          @tabClick="tabClick"
        ></mp-navbar>
      </div>
      <div class="fill"></div>
      <div class="missionlist">
        <missionList v-bind:list="missionlist" v-bind:task_state="tabs[tabs_index]"></missionList>
      </div>
    </div>
  </div>
</template>


<script>
import searchBar from "@/components/logs/searchBar";
import missionList from "@/components/logs/missionList";
import mpNavbar from "@/components/logs/mpnavbar";
import store from "../../components/store";
import { api } from "../../utils/api.js";
import { userInfo } from "os";
import questionnaire from "@/components/logs/questionnaire";

export default {
  components: {
    searchBar,
    missionList,
    mpNavbar,
    questionnaire
  },

  data() {
    return {
      missionlist: [],
      tabs: ["已接收", "待完成", "已完成", "切换"],
      tabs_index: 0,
      curRole: "worker"
    };
  },

  methods: {
    touchStart(e) {
      this.startX = e.mp.changedTouches[0].pageX;
      this.startY = e.mp.changedTouches[0].pageY;
      //  console.log(this.startX, this.startY);
    },
    touchmove(e) {
      this.endX = e.mp.changedTouches[0].pageX;
      this.endY = e.mp.changedTouches[0].pageY;
      if (Math.abs(this.endY - this.startY) < 100) {
        if (Math.abs(this.endX - this.startX) > 100) {
          if (this.endX > this.startX) {
            this.tabs_index--;
            if (this.tabs_index < 0) {
              this.tabs_index = 2;
            }
          } else {
            this.tabs_index++;
            if (this.tabs_index > 2) {
              this.tabs_index = 0;
            }
          }
          this.startX = this.endX;
          this.startY = this.endY;
          // console.log(this.endX, this.endY);
        }
      }
    },
    touchEnd(e) {},
    switchRole() {
      if (this.curRole == "worker") {
        this.curRole = "cow";
        this.tabs = ["已发布", "完成中", "已结束", "切换"];
      } else {
        this.curRole = "worker";
        this.tabs = ["已接收", "待完成", "已完成", "切换"];
      }
    },
    tabClick(e) {
      if (e == 3) {
        this.switchRole();
      } else {
        this.tabs_index = e;
      }
    },
    getData(){
      this.load1 = 0;
      this.load2 = 0;
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
      let curuser = store.state.user;
      console.log(curuser)
      this.missionlist = []
      api
        .querySomeByModel("tasks", {
          publish: {
            publisher: curuser._id
          }
        })
        .then(res => {
          console.log(curuser._id)
          console.log("query publish")
          this.result = res.result;
          console.log(res.result)
          //  console.log(this.missionlist);
          this.result.forEach(element => {
            if (element.publish.publisher != curuser._id) {
              let index = this.result.indexOf(element);
              if (index > -1) {
                this.result.splice(index, 1);
              }
            }
            var date = new Date(element.publish.beginTime);
            element.publish.beginTime = date.Format("yyyy-MM-dd");
            element.publish.endTime = date.Format("yyyy-MM-dd");
          });
          this.missionlist.push(...this.result);
          this.load1 = 1;
          if(this.load1 == 1 && this.load2 ==1){
            wx.hideLoading()
            wx.showToast({
              title: '加载成功',
              duration: 2000
            })
          }
        })
        .catch(rej => {
          console.warn(rej);
          wx.hideLoading()
          // wx.showToast({
          //   title: '加载失败',
          //   icon: 'none',
          //   duration: 2000
          // })
        });
      api
        .querySomeByModel("tasks", {
          joiners: {
              $regex:'.*'+curuser._id+'.*'
            }
        })
        .then(res => {
          console.log("query joinning")
          console.log(res)
          this.result = res.result;
          this.result.forEach(element => {
            if(element.state == 'publishing')
            {
              element.state = 'joining'
            }else if(element.state == 'doing')
            {
              element.state = 'todo'
            }else if(element.state == 'finished')
            {
              element.state = 'ended'
            }
            var date = new Date(element.publish.beginTime);
            element.publish.beginTime = date.Format("yyyy-MM-dd");
            element.publish.endTime = date.Format("yyyy-MM-dd");
          });
          this.missionlist.push(...this.result);
          this.load2 = 1;
          if(this.load1 == 1 && this.load2 ==1){
            wx.hideLoading()
            wx.showToast({
              title: '加载成功',
              duration: 2000
            })
          }
        })
        .catch(rej => {
          console.warn(rej);
          wx.hideLoading()
          // wx.showToast({
          //   title: '加载失败',
          //   icon: 'none',
          //   mask: true,
          //   duration: 2000
          // })
        });
    },
    // 打开模态框
  },

  onLoad() {
    this.getData()
  },
  onPullDownRefresh:function()
  {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //加载
    this.getData()
    setTimeout(function(){
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
      },1500);
  },
};
</script>

<style>
page {
  height: 100%;
}

.navbar.weui-navbar__item.weui-bar__item_on {
  color: orangered !important;
}
</style>


<style scoped>
.mission-main {
  margin: 0rpx 8rpx 0rpx 8rpx;
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

.worker {
  position: fixed; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
  top: 22rpx; /* 距离窗口顶部距离 */
  right: 10rpx; /* 距离窗口左边的距离 */
  height: 28px;
  width: 4rpx;
  font-size: 12px;
  font-weight: bold;
  background: transparent;
  z-index: 1;
  background-color: green;
}

.role-button {
  position: fixed; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
  top: 22rpx; /* 距离窗口顶部距离 */
  right: 10rpx; /* 距离窗口左边的距离 */
  height: 28px;
  width: 4rpx;
  font-size: 12px;
  font-weight: bold;
  background: transparent;
  z-index: 1;
  background-color: orangered;
}

.mark{
  background-color: rgba(0, 128, 0, 0.466)
}
</style>