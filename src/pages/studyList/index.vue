<template>
  <div class="mission-main">
    <div v-bind:class="pageClass">
      <div class="missionlist">
        <missionList v-bind:list="missionlist" task_state="已发布"></missionList>
      </div>
    </div>
  </div>
</template>


<script>
import store from "@/components/store";
import missionList from "@/components/logs/missionList";

import { api } from "../../utils/api.js";

export default {
  components: {
    missionList
  },

  data() {
    return {
      missionlist: []
    };
  },

  onLoad: function(options) {
    this.missionList = []
    this.type = options.type;
    //  console.log(this.type);
    this.curCity = store.state.curCity;

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
    // console.log(this.missionlist)
    api
      .querySomeByModel("tasks", {
        type: this.type
      })
      .then(res => {
        //  console.log(res);
        let tempList = res.result;
        for (let i in tempList) {
          let li = tempList[i];
          //this.missionlist.push(li);
          if (
            String(li["location"]).includes(this.curCity) &&
            String(li["state"]).includes("publishing")
          ) {
            this.missionlist.push(li);
          }
        }
        //this.missionlist = res.result;
        console.log(this.missionlist);
        this.missionlist.forEach(element => {
          var date = new Date(element.publish.beginTime);
          element.publish.beginTime = date.Format("yyyy-MM-dd");
          element.publish.endTime = date.Format("yyyy-MM-dd");
        });
      })
      .catch(rej => {
        console.warn(rej);
        //console.log("NOOOOOO");
      });
  }
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
</style>