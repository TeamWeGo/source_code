<template>
  <div class="index-page">
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
      cammond: [],
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
                // console.log(res.data.result.addressComponent);
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
      });
    },
    getTasks() {
      let a = this.menuInfo[0];
      this.menuInfo = [];
      api
        .querySomeByModel("tasks", {
          state: "publishing"
        })
        .then(res => {
          let tempList = res.result;
          let curNum = 0;
          let curType = "";
          for (let i in tempList) {
            if (curNum >= 2) break;
            let li = tempList[i];
            if (String(li["location"]).includes(this.curCity)) {
              curType = li["type"];
              let pid = li["publish"]["publisher"];
              let userCredit = 0;
              api
                .queryOneById("users", pid)
                .then(res => {
                  userCredit = res.result[0]["credit"];
                  //console.log(res);
                  if (userCredit >= 95) {
                    if (curType == "咨询")
                      a["imgSrc"] = "/static/images/info.png";
                    else if (curType == "学习")
                      a["imgSrc"] = "/static/images/study.png";
                    else if (curType == "生活")
                      a["imgSrc"] = "/static/images/live.png";
                    else a["imgSrc"] = "/static/images/play.png";
                    var date = new Date(li["work"]["beginTime"]);
                    a["time"] = date.Format("yyyy-MM-dd");
                    a["address"] = li["location"];
                    a["account"] = li["payment"];
                    a["title"] = li["description"];
                    a["task"] = li;
                    if (this.menuInfo.length < 2) {
                      this.menuInfo.push(a);
                    }
                    curNum += 1;
                  }
                })
                .catch(rej => {
                  console.warn("22222", rej);
                });
            } else {
            }
          }
          //this.missionlist = res.result;

          if (this.menuInfo.length >= 1) {
          } else {
            let li = tempList[0];
            let curType = li["type"];
            if (curType == "咨询") {
              a["imgSrc"] = "/static/images/info.png";
            } else if (curType == "学习") {
              a["imgSrc"] = "/static/images/study.png";
            } else if (curType == "生活") {
              a["imgSrc"] = "/static/images/live.png";
            } else {
              a["imgSrc"] = "/static/images/play.png";
            }
            var date = new Date(li["work"]["beginTime"]);
            // a["time"] = date.Format("yyyy-MM-dd");
            console.warn(date);
            a["address"] = li["location"];
            a["account"] = li["payment"];
            a["title"] = li["description"];
            a["task"] = li;
            this.menuInfo.push(a);
          }
          console.log(this.menuInfo);
        })
        .catch(rej => {
          console.warn(rej);
          //console.log("NOOOOOO");
        });
    }
  },
  created() {
    // let app = getApp()
    this.getLocation();
  },

  onLoad() {},
  onShow() {
    //console.log(this.curCity);
    this.curCity = store.state.curCity;
    this.getTasks();

    console.log("this is index");
    // wx.navigateBack({
    //     delta:1
    // })

    if (store.state.isAuthorized) {
      console.log("already authorized");
    } else {
      console.log("not authorized");
      wx.navigateBack({
        delta: -1
      });
    }
  }
};
</script>

<style scoped>
.index-page {
  margin: 0rpx 8rpx 0rpx 8rpx;
}
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
