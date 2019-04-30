<template>
  <div class="mission-main">
    <div class="mission-toolbar">
      <searchBar></searchBar>
    </div>
    <div>
      <mp-navbar :tabs="tabs" activeIndex="0" @tabClick="tabClick"></mp-navbar>
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
      missionlist: [
        {
          image: "../../../static/images/user.png",
          title: "取快递",
          time: "2019-4-16 15:34",
          location: "至善园",
          intro: "从丰巢三号柜取快递送到至善园二号",
          price: "30"
        },
        {
          image: "../../../static/images/user.png",
          title: "陪打农药",
          time: "2019-4-16 15:34",
          location: "至善园",
          intro: "从王者一星打到百星王者",
          price: "10000"
        }
      ],
      tabs: ["待完成", "待确认", "已确认", "已完成"]
    };
  },
  methods: {},

  created() {
    console.log("abc");
    api
      .queryTasksByModel({})
      .then(res => {
        console.log(res);
        this.missionlist = res.result;
      })
      .catch(rej => {
        console.warn(rej);
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
