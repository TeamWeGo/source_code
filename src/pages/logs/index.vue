<template>
  <div class="mission-main">
    <div class="mission-toolbar">
      <searchBar></searchBar>
    </div>
    <div>
      <mp-navbar :tabs="tabs" activeIndex="0" @tabClick="tabClick"></mp-navbar>
    </div>
    <div>
      <swiper @change="switchItem('switchItem',$event)" :current="currentTab" circular="true" skip-hidden-item-layout="true">
          <swiper-item><div class="item">A</div></swiper-item>
          <swiper-item><div class="item">B</div></swiper-item>
          <swiper-item><div class="item">C</div></swiper-item>
      </swiper>
    </div>
    <div>
      <missionList v-bind:list="missionlist"></missionList>
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
      tabs: ["已发布", "待完成", "待确认", "已确认", "已完成"]
    };
  },
  methods: {},

  created() {
    Date.prototype.Format = function(fmt)   
    { //author: meizz   
      var o = {   
        "M+" : this.getMonth()+1,                 //月份   
        "d+" : this.getDate(),                    //日   
        "h+" : this.getHours(),                   //小时   
        "m+" : this.getMinutes(),                 //分   
        "s+" : this.getSeconds(),                 //秒   
        "q+" : Math.floor((this.getMonth()+3)/3), //季度   
        "S"  : this.getMilliseconds()             //毫秒   
      };   
      if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
      for(var k in o)   
        if(new RegExp("("+ k +")").test(fmt))   
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
      return fmt;   
    }  

    api
      .queryTasksByModel({})
      .then(res => {
        console.log(res);
        this.missionlist = res.result;
        console.log(this.missionlist);
        this.missionlist.forEach(element => {
          // var date = new Date(element.publish.beginTime);
          // element.publish.beginTime = date.Format("yyyy-MM-dd")
          // element.publish.endTime = date.Format("yyyy-MM-dd")
        });
      })
      .catch(rej => {
        console.warn(rej);
        console.log("no!!!")
      });
  }
};
</script>

<style>
.site {
  width: 25%;
  text-align: center;
}

.mission-add {
  width: 15%;
  text-align: center;
}
</style>
