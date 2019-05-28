<template>
  <div>
    <p class="title">{{ pageTitle }}</p>
    <img class="editButton" src="/static/images/edit.png" @click="updateUserInfo">
    <button v-bind:class="visibility" @click="saveChanges">完成</button>
    <div class="container">
      <div class="div1">
        <div class="avatar">
          <img class="userAvatar" src="/static/images/user.png" background-size="cover">
        </div>
        <div class="info">
          <div class="infoRow">
            <label class="lableClass">姓名:</label>
            <input type="text" id="name" v-bind:disabled="disabled" v-model="userInfo.userName">
          </div>
          <p class="infoRow">{{ '性别: ' + userInfo.gender }}</p>
          <p class="infoRow">{{ '闲钱币: ' + userInfo.balance }}</p>
          <p class="infoRow">{{ '诚信度: ' + userInfo.credit }}</p>
        </div>
      </div>

      <div class="div2">
        <div class="ps">
          <label class="lableClass">个签：</label>
          <input type="text" v-bind:disabled="disabled" v-model="userInfo.personalStatement">
        </div>
      </div>

      <div class="div3">
        <span class="tag">{{userInfo.tags[0]}}</span>
        <span class="tag">{{userInfo.tags[1]}}</span>
        <span class="tag">{{userInfo.tags[2]}}</span>
        <span class="tag">{{userInfo.tags[3]}}</span>
        <span class="tag">{{userInfo.tags[4]}}</span>
      </div>

      <div class="div4">
        <span class="task">{{'进行中：' + userInfo.tasks.doing.length}}</span>
        <span class="task">{{'已发布：' + userInfo.tasks.published.length}}</span>
        <span class="task">{{'已完成：' + userInfo.tasks.finished.length}}</span>
      </div>
    </div>
  </div>
</template>


<script>
import { api } from "../../utils/api.js";

export default {
  data() {
    return {
      pageTitle: "个人中心",
      userInfo: {
        userName: "zjx",
        avatarUrl: "/static/images/user.png",
        gender: "男",
        balance: 100,
        credit: 99,
        personalStatement: "Hello World!",
        isVerified: false,
        tags: ["学习", "维修", "快递", "社交", "娱乐"],
        tasks: {
          published: [0, 1, 2],
          finished: [0],
          doing: [1, 2]
        },
        isVerified: true
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
      console.log(this.userInfo.userName);

      let user = {
        _id: "x",
        // '_openid':'124',
        nickName: this.userInfo.userName,
        name: "X",
        studentId: "123",
        gender: this.userInfo.gender,
        tasks: {
          published: this.userInfo.tasks.published,
          finished: this.userInfo.tasks.finished,
          doing: this.userInfo.tasks.doing
        },
        idlePay: this.userInfo.balance,
        isVerified: this.userInfo.isVerified,
        personalStatement: this.userInfo.personalStatement,
        credit: this.userInfo.credit
      };

      api
        .insertOneUser(user)
        .then(res => {
          console.log(res);
        })
        .catch(rej => {
          console.warn(rej);
        });
    }
  },

  created() {
    // let app = getApp()
    // console.log("creating")
  }
};
</script>

<style scoped>
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
  margin-bottom: 50rpx;
}

.div2 {
  width: 100%;
  margin-bottom: 50rpx;
  border-top: 1px solid#DDDDDD;
}

.div3 {
  width: 100%;
  margin-bottom: 50rpx;
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

.tag {
  border: 1px solid #000;
  background: rgb(37, 119, 228);
  color: white;
  margin: 30rpx;
  width: 20%;
  float: left;
  text-align: center;
}

.task {
  margin: 30rpx;
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
