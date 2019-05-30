<template>
  <div>
    <div class="search-bar">
      <button class="city-button" @click="chooseCity">{{ curCity }}</button>
      <input type="text" class="search-input" placeholder="搜索相关任务">
      <img class="search-icon" src="/static/images/search.png">
    </div>

    <picSlider/>

    <div class="choose-tag">
      <circleCard v-bind:text="study.text" v-bind:imgSrc="study.imgSrc"/>
      <circleCard v-bind:text="live.text" v-bind:imgSrc="live.imgSrc"/>
      <circleCard v-bind:text="play.text" v-bind:imgSrc="play.imgSrc"/>
      <circleCard v-bind:text="info.text" v-bind:imgSrc="info.imgSrc"/>
    </div>

    <menuItem v-for="(item,index) in menuInfo" :key="index" :mission="item"/>
  </div>
</template>

<script>
import card from "@/components/card";
import circleCard from "@/components/circleCard";
import picSlider from "@/components/picSlider";
import menuItem from "@/components/menuItem";

import { api } from "../../utils/api.js";
import store from "@/components/store";

export default {
  data() {
    return {
      motto: "Hello miniprograme",
      curCity: store.state.curCity,
      userInfo: {
        nickName: "mpvue",
        avatarUrl: "http://mpvue.com/assets/logo.png"
      },
      study: {
        text: "学习",
        imgSrc: "/static/images/study.png"
      },
      live: {
        text: "生活",
        imgSrc: "/static/images/live.png"
      },
      play: {
        text: "娱乐",
        imgSrc: "/static/images/play.png"
      },
      info: {
        text: "咨询",
        imgSrc: "/static/images/info.png"
      },
      menuInfo: [
        {
          imgSrc: "/static/images/info.png",
          time: "2019-11-11 11:11:11",
          title: "唱单身情歌",
          address: "至二712",
          account: "11"
        },
        {
          imgSrc: "/static/images/play.png",
          time: "2019-05-20 13:14",
          title: "给晓帆做一天女朋友",
          address: "至二712",
          account: "520"
        }
      ]
    };
  },

  components: {
    card,
    circleCard,
    picSlider,
    menuItem
  },

  methods: {
    bindViewTap() {
      const url = "../logs/main";
      if (mpvuePlatform === "wx") {
        mpvue.switchTab({ url });
      } else {
        mpvue.navigateTo({ url });
      }
    },
    chooseCity() {
      let url = "../citySelect/main";
      wx.navigateTo({ url });
    },
    getLocation() {
      let ak = "71RBASvs1GCE3EwSMOE3Qa1y0sGzSDSr";
      let url = "http://api.map.baidu.com/geocoder/v2/";
      wx.getLocation({
        type: "wgs84",
        success: geo => {
          wx.request({
            url,
            data: {
              ak,
              output: "json",
              location: `${geo.latitude},${geo.longitude}`
            },
            success: res => {
              if (res && res.data) {
                //console.log(res);
                let city = res.data.result.addressComponent.city;
                store.commit("changeCity", city.replace("市", ""));
                this.curCity = store.state.curCity;
                //console.log(this.curCity);
              } else {
                console.log("地址获取失败");
              }
            }
          });
        }
      })
    }
  },

  created() {
    // let app = getApp()
    this.getLocation();
  },

  mounted() {},

  onShow() {
    //console.log(this.curCity);
    this.curCity = store.state.curCity;
  }
};
</script>

<style scoped>
.search-bar {
  display: flex;
  height: 40px;
  align-items: center;
  margin-bottom: 10px;
  /*background-color:burlywood;*/
}

.city-button {
  height: 28px;
  width: auto;
  margin: 5px;
  font-size: 12px;
  font-weight: bold;
  background: transparent;
}

.search-input {
  padding: 0 12px;
  height: 25px;
  border: 1px solid black;
  flex-grow: 1;
  border-radius: 10px;
}

.search-icon {
  height: 25px;
  width: 25px;
  margin: 5px;
}

.choose-tag {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
