<template class="dd">
  <view class="taskdetail">
    <view class="createTask">
      <p>{{title}}</p>
    </view>
    <view class="Task-basicInfo">
      <view class="name">
        <label class="task-res-title">标题:</label>
        <label class="task-res">{{Task.title}}</label>
      </view>
      <view class="participatorNum">
        <label class="task-res-title">人数:</label>
        <label class="task-res">{{Task.maxJoiner}}</label>
      </view>
      <view class="payment">
        <label class="task-res-title">报酬:</label>
        <label class="task-res">{{Task.payment}}</label>
      </view>
    </view>
    <view class="Task-description">
      <label class="des-title">任务描述:</label>
      <label class="des-des">{{Task.description}}</label>
    </view>
    <view class="Task-time">
      <view class="startDate">
        <view>开始日期：{{Task.work.beginTime}}</view>
      </view>

      <view class="completeDate">
        <view>截止日期：{{Task.work.endTime}}</view>
      </view>

      <view class="publishDate">
        <view>报名截止：{{Task.publish.endTime}}</view>
      </view>
    </view>
    <view class="Task-tag">
      <view>标签：{{Task.type}}</view>
    </view>
    <view class="Task-location">
      <view>地点：{{Task.location}}</view>
    </view>
    <view
      v-if="Task.isQuestionnaire == true && Task.publish.publisher != userID"
      class="accept"
      @click="fillQuestionnaire"
    >
      <button class="btn-if">填写问卷</button>
    </view>

    <view
      v-if="Task.isQuestionnaire == true && Task.publish.publisher == userID"
      class="accept"
      @click="checkQuestionnaire"
    >
      <button class="btn-if">查看问卷</button>
    </view>

    <!-- <view
       v-if="Task.state == 'publishing' && Task.publish.publisher != userID"
      class="accept"
      @click="acceptTask" 
    >
    </view>-->

    <button class="btn-deal" @click="dealwithtask">{{ accept }}</button>
  </view>
  <!-- Today is Monday, our air conditioner ran out of money in the midnight, fuck! I wake up because of the heat, and heard xiaofan getting out of bed to turn on the fan
  Bye Bye! See you next time.-->
</template>


<script>
import { api } from "../../../utils/api.js";
import store from "../../../components/store.js";
export default {
  data() {
    return {
      title: "任务详情",
      userID: store.state.user._id,
      Task: {
        title: "",
        avatarId: "",
        type: "学习",
        description: "",
        state: "",
        maxJoiner: 10,
        joiners: "",
        location: "北京市,北京市,东城区",
        publish: {
          publisher: "",
          beginTime: "",
          endTime: ""
        },
        payment: 200,
        work: {
          beginTime: "",
          endTime: ""
        },
        isQuestionnaire: false,
        questionnaireID: ""
      },
      accept: "接♂受"
    };
  },
  onLoad(options) {
    var obj = JSON.parse(decodeURIComponent(options.obj));
    // console.log(obj);
    this.Task = obj;
    console.log(this.Task.questionnaireID);
    this.userID = store.state.user._id;
    if (this.Task.publish.publisher == this.userID) {
      if (this.Task.state == "publishing") {
        this.accept = "确认";
      } else if (this.Task.state == "doing") {
        this.accept = "结束";
      } else {
        this.accept = "^_^";
      }
    } else {
      if (this.Task.state == "publishing") {
        this.accept = "加入";
      } else {
        this.accept = "^_^";
      }
    }
  },
  methods: {
    // acceptTask() {
    //   console.log(this.Task);
    //   api
    //     .joinOneTask(this.Task, this.userID)
    //     .then(result => {
    //       console.log("success");
    //     })
    //     .catch(error => {
    //       console.warn(error);
    //     });
    // },
    fillQuestionnaire() {
      console.log(this.Task.questionnaireID);
      api
        .queryOneById("questionnaires", this.Task.questionnaireID)
        .then(res => {
          console.log(res);
          res = res.result[0];
          res.state = this.Task.state;
          var obj = JSON.stringify(res);
          let url = "../fillQuestionnaire/main?obj=" + obj;
          console.log(url);
          wx.navigateTo({ url });
        });
    },
    checkQuestionnaire() {
      api
        .queryOneById("questionnaires", this.Task.questionnaireID)
        .then(res => {
          console.log(res);
          res = res.result[0];
          res.state = this.Task.state;
          var obj = JSON.stringify(res);
          let url = "../fillQuestionnaire/main?obj=" + obj;
          console.log(url);
          wx.navigateTo({ url });
        });
    },
    dealwithtask() {
      if (this.Task.publish.publisher == this.userID) {
        if (this.Task.state == "publishing") {
          api
            .verifyOneTask(this.Task, store.state.user)
            .then(res => {
              console.log("verify" + res);
            })
            .catch(err => {
              console.warn(err);
            });
        } else if (this.Task.state == "doing") {
          api
            .endOneTask(this.Task, store.state.user)
            .then(res => {
              console.log("end" + res);
            })
            .catch(err => {
              console.warn(err);
            });
        } else {
        }
      } else {
        if (this.Task.state == "publishing") {
          api
            .joinOneTask(this.Task, store.state.user)
            .then(res => {
              console.log("join" + res);
            })
            .catch(err => {
              console.warn(err);
            });
        } else {
        }
      }
    }
  }
};
</script>

<style scoped>
.btn-deal {
  width: 600rpx;
  background-color: #1aad19;
}
.Task-basicInfo {
  width: 600rpx;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
}
.Task-basicInfo view {
  margin: 10rpx 8rpx 10rpx 8rpx;
  display: flex;
  flex-direction: row;
}
.task-res-title {
  width: 150rpx;
}
.dd {
  height: 95%;
}
.taskdetail {
  margin: 8rpx 8rpx 8rpx 8rpx;
  background-color: #ffffff;
  height: 100%;
  width: 95%;
}
.createTask {
  width: 600rpx;
  margin: 0 auto;
  border-bottom: 1rpx solid gray;
}
input {
  border-bottom: 1rpx solid gray;
}
.task-res {
  width: 100%;
  background-color: #efeff4;
  border-radius: 5rpx;
  padding-left: 10rpx;
}
.createTask p {
  font-size: 50rpx;
  font-weight: bold;
  text-align: center;
}

.Task-description {
  width: 600rpx;
  height: auto;
  margin: 0 auto;
  margin-top: 10rpx;
  margin-bottom: 15rpx;
}

.Task-description label {
  margin: 10rpx 8rpx 10rpx 8rpx;
  width: 600rpx;
}

.des-des {
  display: block;
  background-color: #efeff4;
  border-radius: 5rpx;
  min-height: 230rpx;
}
.des-title {
  display: block;
  height: auto;
}

.Task-time {
  width: 600rpx;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
}

.Task-time view {
  margin: 10rpx 8rpx 10rpx 8rpx;
  display: flex;
  flex-direction: row;
}
.Task-time view label {
  width: 200rpx;
}

.Task-location {
  width: 600rpx;
  display: flex;
  flex-direction: row;
  margin: 10rpx auto 10rpx auto;
  padding-bottom: 15rpx;
  padding-left: 40rpx;
}
.Task-location label {
  width: 100rpx;
}
.Task-tag {
  width: 600rpx;
  display: flex;
  flex-direction: row;
  margin-top: 10rpx;
  margin: 10rpx auto 10rpx auto;
  padding-left: 40rpx;
}

.Task-tag label {
  width: 100rpx;
}

.accept {
  margin-top: 10rpx;
  width: 300rpx;
  margin-left: auto;
  margin-right: auto;
}
.accept button {
  font-size: 30rpx;
  color: white;
  background-color: #1aad19;
  margin: 20rpx;
}
</style>