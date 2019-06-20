<template>
  <div class="user-page">
    <p class="title">{{ pageTitle }}</p>
    <img class="editButton" src="/static/images/edit.png" @click="updateUserInfo">
    <button v-bind:class="visibility" @click="saveChanges">完成</button>
    <!-- <button class="authorize" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">授权登录</button> -->
    <div class="container">
      <div class="div1">
        <div class="avatar">
          <img class="userAvatar" v-bind:src="userInfo.avatarUrl" background-size="cover">
        </div>
        <div class = "info">
          <!-- <div class= "infoRow">
            <label class="lableClass">姓名: </label>
            <input type="text" id='name'  v-bind:disabled="disabled" v-model='userInfo.userName'/>
          </div> -->
          <p class= "infoRow">{{ '姓名: ' + userInfo.userName }}</p>
          <p class= "infoRow">{{ '性别: ' + userInfo.gender }}</p>
          <p class= "infoRow">{{ '闲钱币: ' + userInfo.balance }}</p>
          <p class= "infoRow">{{ '诚信度: ' + userInfo.credit }}</p>
        </div>
      </div>

      <div class="div2">
        <div class="ps">
          <label class="lableClass">个签：</label>
          <input type="text" v-bind:disabled="disabled" v-model="userInfo.personalStatement">
        </div>
      </div>

      <div class="div3">
        <button class="unclickedTag" @click="tagButtonClicked(0)">{{userInfo.tags.name[0]}}</button>
        <button class="unclickedTag" @click="tagButtonClicked(1)">{{userInfo.tags.name[1]}}</button>
        <button class="unclickedTag" @click="tagButtonClicked(2)">{{userInfo.tags.name[2]}}</button>
        <button class="unclickedTag" @click="tagButtonClicked(3)">{{userInfo.tags.name[3]}}</button>
        <button class="unclickedTag" @click="tagButtonClicked(4)">{{userInfo.tags.name[4]}}</button>
      </div>

      <div class="div4">
        <span class="task">{{'joining:' + userInfo.tasks.joining.length}}</span>
        <span class="task">{{'doing:' + userInfo.tasks.doing.length}}</span>
        <span class="task">{{'finished:' + userInfo.tasks.finished.length}}</span>
        <span class="task">{{'publish:' + userInfo.tasks.publishing.length}}</span>
        <span class="task">{{'verified:' + userInfo.tasks.verified.length}}</span>
        <span class="task">{{'ended:' + userInfo.tasks.ended.length}}</span>
      </div>
    </div>
  </div>
</template>


<script>
import { api } from "../../utils/api.js";
import store from "@/components/store";

export default {
  data() {
    return {
      pageTitle: "个人中心",
      userInfo: {
        userName: "zjx",
        studentId: "16340301",
        avatarUrl: "/static/images/user.png",
        gender: "男",
        balance: 100,
        credit: 100,
        personalStatement: "Hello World!",
        isVerified: false,
        tags: {
          name: ["学习", "维修", "快递", "社交", "娱乐"],
          flag: ["1", "0", "1", "1", "1"]
        },
        index: [0, 1, 1],
        tasks: {
          joining: [],
          doing: [],
          finished: [],
          publishing: [],
          verified: [],
          ended: []
        },
        isVerified: true,
        wechatopenid: 1,
        id: 1
      },
      disabled: true,
      visibility: "invisible",
      isEditing: false
    };
  },

  methods: {
    updateUserInfo() {
      if (!this.isEditing) {
        console.log("Editing...");
        this.isEditing = true;
        this.visibility = "visible";
        this.disabled = false;
      } else {
        return;
      }
    },

    saveChanges() {
      console.log("Save changes.");
      this.isEditing = false;
      this.visibility = "invisible";
      this.disabled = true;

      api
        .updateOneById("users", this.userInfo.id, {
          personalStatement: this.userInfo.personalStatement,
          tags: {
            name: this.userInfo.tags.name,
            flag: this.userInfo.tags.flag
          }
        })
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.warn(error);
        });
    },

    tagButtonClicked(index) {
      if (this.isEditing) {
        if (this.tags.flag[index] == 1) {
          this.tags.flag[index] = 0;
        } else {
          this.tags.flag[index] = 1;
        }
      }
    },

    getUserInfo() {
      // 弹窗
      var that = this;

      wx.showModal({
        title: "提示",
        content: "是否授权登陆",
        success(res) {
          if (res.confirm) {
            console.log("用户点击确定");

            //获取信息
            wx.getUserInfo({
              success: res => {
                //get userInfo incluing nickname, avatar and gender
                console.log(res.userInfo);

                that.userInfo.userName = res.userInfo.nickName;
                that.userInfo.avatarUrl = res.userInfo.avatarUrl;
                if (res.userInfo.gender == 1) {
                  that.userInfo.gender = "男";
                } else {
                  that.userInfo.gender = "女";
                }

                //get openid
                api
                  .getOpenId()
                  .then(res => {
                    console.log(res);
                    that.userInfo.wechatopenid = res.result;

                    let user = {
                      wechatopenid: that.userInfo.wechatopenid,
                      nickName: that.userInfo.userName,
                      name: "realName",
                      avatarUrl: that.userInfo.avatarUrl,
                      studentId: that.userInfo.studentId,
                      gender: that.userInfo.gender,
                      tasks: {
                        joining: that.userInfo.tasks.joining,
                        doing: that.userInfo.tasks.doing,
                        finished: that.userInfo.tasks.finished,
                        publishing: that.userInfo.tasks.publishing,
                        verified: that.userInfo.tasks.verified,
                        ended: that.userInfo.tasks.ended
                      },
                      tags: {
                        name: that.userInfo.tags.name,
                        flag: that.userInfo.tags.flag
                      },
                      balance: that.userInfo.balance,
                      isVerified: that.userInfo.isVerified,
                      personalStatement: that.userInfo.personalStatement,
                      credit: that.userInfo.credit
                    };
                    store.commit("changeUser", user);
                    console.log("globalUser is :");
                    console.log(store.state.user);

                    //insert the new user if not existed
                    api
                      .insertOneUser(user)
                      .then(res => {
                        // console.log(res);
                      })
                      .catch(rej => {
                        // console.warn(rej);
                        //if user already exsited, query uesrInfo by wechatopenid
                        //and init all the info with the returned message
                        api
                          .querySomeByModel("users", {
                            wechatopenid: that.userInfo.wechatopenid
                          })
                          .then(result => {
                            console.log(result);

                            that.userInfo._id = result.result[0]._id;
                            that.userInfo.userName = result.result[0].nickName;
                            that.userInfo.studentId =
                              result.result[0].studentId;
                            that.userInfo.gender = result.result[0].gender;
                            that.userInfo.isVerified =
                              result.result[0].isVerified;
                            that.userInfo.balance = result.result[0].balance;
                            that.userInfo.credit = result.result[0].credit;
                            that.userInfo.avatarUrl =
                              result.result[0].avatarUrl;
                            that.userInfo.personalStatement =
                              result.result[0].personalStatement;
                            //init tasks
                            that.userInfo.tasks.joining =
                              result.result[0].tasks.joining;
                            that.userInfo.tasks.doing =
                              result.result[0].tasks.doing;
                            that.userInfo.tasks.finished =
                              result.result[0].tasks.finished;
                            that.userInfo.tasks.publishing =
                              result.result[0].tasks.publishing;
                            that.userInfo.tasks.verified =
                              result.result[0].tasks.verified;
                            that.userInfo.tasks.ended =
                              result.result[0].tasks.ended;
                            //init tags
                            that.userInfo.tags.name =
                              result.result[0].tags.name;
                            that.userInfo.tags.flag =
                              result.result[0].tags.flag;

                            let user = {
                              _id: that.userInfo._id,
                              wechatopenid: that.userInfo.wechatopenid,
                              nickName: that.userInfo.userName,
                              name: "realName",
                              avatarUrl: that.userInfo.avatarUrl,
                              studentId: that.userInfo.studentId,
                              gender: that.userInfo.gender,
                              tasks: {
                                joining: that.userInfo.tasks.joining,
                                doing: that.userInfo.tasks.doing,
                                finished: that.userInfo.tasks.finished,
                                publishing: that.userInfo.tasks.publishing,
                                verified: that.userInfo.tasks.verified,
                                ended: that.userInfo.tasks.ended
                              },
                              tags: {
                                name: that.userInfo.tags.name,
                                flag: that.userInfo.tags.flag
                              },
                              balance: that.userInfo.balance,
                              isVerified: that.userInfo.isVerified,
                              personalStatement:
                                that.userInfo.personalStatement,
                              credit: that.userInfo.credit
                            };
                            store.commit("changeUser", user);
                            console.log("globalUser is :");
                            console.log(store.state.user);
                          })
                          .catch(error => {
                            console.warn(error);
                          });
                      });
                  })
                  .catch(rej => {
                    console.warn(rej);
                  });
              }
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
            store.commit('changeAuthorized', false)
            // wx.navigateTo({
            //   url:'../index/main'
            // })
          }
        }
      });
    }
  },

  created() {
    // let app = getApp()
    //  console.log(this.userInfo.nickName);
    this.getUserInfo();
  }
};
</script>

<style scoped>
.user-page {
  margin: 0rpx 8rpx 0rpx 8rpx;
}
.title {
  size: 60px;
  font-weight: bold;
  text-align: center;
}

.editButton {
  width: 40rpx;
  height: 40rpx;
  float: right;
  margin-right: 50rpx;
}

.authorize {
  width: 150rpx;
  font-size: 10pt;
}
.container {
  width: 90%;
  margin: 50rpx;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.lableClass {
  float: left;
}

.div1 {
  width: 100%;
  display: flex;
  flex-direction: row;
  /* margin-bottom: 20rpx; */
}

.div2 {
  width: 100%;
  margin-bottom: 20rpx;
  border-top: 1px solid#DDDDDD;
}

.div3 {
  width: 100%;
  margin-bottom: 20rpx;
  border-top: 1px solid #dddddd;
}

.div4 {
  width: 100%;
  border-top: 1px solid #dddddd;
  padding-top: 30rpx;
}

.avatar {
  width: 35%;

  margin: 30rpx;
}

.userAvatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.info {
  width: 45%;
  display: flex;
  flex-direction: column;
  margin: 30rpx;
  border-left: 1px solid #dddddd;
}

.infoRow {
  margin: 10rpx;
}

.ps {
  text-align: left;
  margin: 30rpx;
}

.clickedTag {
  border: 1px solid #000;
  background: rgb(104, 204, 113);
  color: white;
  margin: 30rpx;
  width: 20%;
  float: left;
  text-align: center;
}

.unclickedTag {
  border: 1px solid #000;
  background: white;
  color: black;
  margin: 20rpx;
  width: 22%;
  height: 20%;
  float: left;
  text-align: center;
}

.task {
  width: 200rpx;
  margin: 10rpx;
  float: left;
}

.invisible {
  visibility: hidden;
  width: 110rpx;
  font-size: 11pt;
  color: white;
  background-color: rgb(97, 196, 97);
  margin-left: 50rpx;
  padding: 0;
  float: left;
}

.visible {
  visibility: visible;
  width: 110rpx;
  font-size: 11pt;
  color: white;
  background-color: rgb(97, 196, 97);
  margin-left: 50rpx;
  padding: 0;
  float: left;
}
</style>
