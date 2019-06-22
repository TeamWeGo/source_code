<template >
  <view class="community">
    <view class="createTask">
      <p>{{createTask}}</p>
    </view>
    <view class="Task-basicInfo">
      <view class="name">
        <label>标题</label>
        <input type="text" id="name" v-model="Task.title">
      </view>
      <view class="participatorNum">
        <label>人数</label>
        <input type="number" id="participatorNum" v-model="Task.maxJoiner">
      </view>
      <view class="payment">
        <label>报酬</label>
        <input type="number" id="payment" v-model="Task.payment">
      </view>
    </view>
    <view class="Task-description">
      <label>任务描述</label>
      <textarea type="text" id="description" v-model="Task.description"/>
    </view>
    <view class="Task-time">
      <view class="startDate">
        <picker
          mode="date"
          value="Task.startDate"
          start="2019-01-01"
          end="2022-01-01"
          @change="bindStartDate"
        >
          <view class="picker">开始日期：{{Task.startDate}}</view>
        </picker>
      </view>
      <view class="startTime">
        <picker mode="time" value="Task.startDate" @change="bindStartTime">
          <view class="picker">时间：{{Task.startTime}}</view>
        </picker>
      </view>

      <view class="completeDate">
        <picker
          mode="date"
          value="Task.completeTime"
          start="2019-01-01"
          end="2022-01-01"
          @change="bindCompleteDate"
        >
          <view class="picker">截止日期：{{Task.completeDate}}</view>
        </picker>
      </view>

      <view class="completeTime">
        <picker mode="time" value="Task.completeDate" @change="bindCompleteTime">
          <view class="picker">时间：{{Task.completeTime}}</view>
        </picker>
      </view>

      <view class="publishDate">
        <picker
          mode="date"
          value="Task.publishDate"
          start="2019-01-01"
          end="2022-01-01"
          @change="bindPublishDate"
        >
          <view class="picker">报名截止：{{Task.publishDate}}</view>
        </picker>
      </view>

      <view class="publishTime">
        <picker mode="time" value="Task.publishTime" @change="bindPublishTime">
          <view class="picker">时间：{{Task.publishTime}}</view>
        </picker>
      </view>
    </view>
    <view class="Task-tag">
      <picker
        mode="selector"
        :value="index"
        :range="Task.tag"
        :range-key="'name'"
        @change="bindTagChange"
      >
        <view class="picker">标签：{{Task.tag[index].name}}</view>
      </picker>
    </view>
    <view class="Task-location">
      <picker mode="region" value="Task.location" @change="bindRegionChange">
        <view class="picker">地点：{{Task.location}}</view>
      </picker>
    </view>
    <view>
      <view class="addQues" @click="addQues">
        <button>添加问卷</button>
      </view>
      <view class="publish" @click="publishTask">
        <button>{{ publish }}</button>
      </view>
    </view>
  </view>
</template>


<script>
import { api } from "../../utils/api.js";
import store from "../../components/store";
export default {
  data() {
    return {
      createTask: "创建任务",
      index: 0,
      beginTime: "",
      curuser: {},
      Task: {
        title: "",
        maxJoiner: 0,
        payment: 0,
        description: "",
        joiners: [],
        startDate: "2019-04-25",
        startTime: "00:00",
        completeDate: "2019-04-25",
        completeTime: "00:00",
        publishDate: "2019-04-25",
        publishTime: "00:00",
        location: "广东省,广州市,番禺区",
        tag: [
          { id: 0, name: "学习" },
          { id: 1, name: "娱乐" },
          { id: 2, name: "生活" }
        ]
      },
      publish: "fa♂布"
    };
  },
  methods: {
    init() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (day >= 1 && day <= 9) {
        day = "0" + day;
      }
      if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
      }

      this.beginTime =
        year + "-" + month + "-" + day + "/" + hours + ":" + minutes;
      this.Task.startDate = year + "-" + month + "-" + day;
      this.Task.startTime = hours + ":" + minutes;
      this.Task.completeDate = year + "-" + month + "-" + day;
      this.Task.completeTime = hours + ":" + minutes;
      this.Task.publishDate = year + "-" + month + "-" + day;
      this.Task.publishTime = hours + ":" + minutes;
    },
    publishTask() {
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 1];
      console.log(prevPage.data.quesID);

      let task = {
        title: this.Task.title,
        type: this.Task.tag[this.index].name,
        description: this.Task.description,
        state: "publishing",
        maxJoiner: this.Task.maxJoiner,
        joiners: [],
        location: this.Task.location,
        credit: this.curuser.credit,
        publish: {
          publisher: this.curuser._id,
          beginTime: this.beginTime,
          endTime: this.Task.startDate + "/" + this.Task.startTime
        },
        payment: this.Task.payment,
        work: {
          beginTime: this.Task.startDate + "/" + this.Task.startTime,
          endTime: this.Task.completeDate + "/" + this.Task.completeTime
        },
        isQuestionnaire: false,
        questionnaireID: ""
      };
      if (prevPage.data.quesID == undefined) {
        task.isQuestionnaire = false;
        task.questionnaireID = "";
      } else {
        task.isQuestionnaire = true;
        task.questionnaireID = prevPage.data.quesID;
      }
      if (task.publish.publisher == undefined) {
        wx.showToast({
          title: "创建任务失败",
          icon: "success",
          duration: 2000
        });
      } else {
        api
          .publishOneTask(task)
          .then(res => {
            console.log(res);
            wx.showToast({
              title: "创建任务成功",
              icon: "success",
              duration: 2000
            });
            this.Task.title = "";
            this.Task.maxJoiner = 0;
            this.Task.payment = 0;
            this.Task.description = "";
            this.init();
            this.Task.location = "广东省,广州市,番禺区";
          })
          .catch(rej => {
            console.warn(rej);
            wx.showToast({
              title: "创建任务失败",
              icon: "success",
              duration: 2000
            });
            this.Task.title = "";
            this.Task.maxJoiner = 0;
            this.Task.payment = 0;
            this.Task.description = "";
            this.init();
            this.Task.location = "广东省,广州市,番禺区";
          });
      }
    },
    bindStartDate: function(e) {
      this.Task.startDate = e.mp.detail.value;
    },
    bindStartTime: function(e) {
      this.Task.startTime = e.mp.detail.value;
    },
    bindCompleteDate: function(e) {
      this.Task.completeDate = e.mp.detail.value;
    },
    bindCompleteTime: function(e) {
      this.Task.completeTime = e.mp.detail.value;
    },
    bindPublishDate: function(e) {
      this.Task.publishDate = e.mp.detail.value;
    },
    bindPublishTime: function(e) {
      this.Task.publishTime = e.mp.detail.value;
    },
    bindRegionChange: function(e) {
      this.Task.location = e.mp.detail.value;
    },
    bindTagChange: function(e) {
      this.index = e.mp.detail.value;
    },
    addQues: function() {
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 1];
      console.log(prevPage.data.quesID);
      if (prevPage.data.quesID == undefined) {
        let url = "./createQuestionnaire/main";
        wx.navigateTo({ url });
      } else {
        api.queryOneById("questionnaires", prevPage.data.quesID).then(res => {
          var obj = JSON.stringify(res);
          let url = "./createQuestionnaire/main?obj=" + obj;
          console.log(url);
          wx.navigateTo({ url });
        });
      }

      // if(this.quesID == ''){
      //   console.log('new')
      //   let url = "./createQuestionnaire/main"
      //   wx.navigateTo({ url })
      //   this.quesID = store.state.quesID
      // }
      // else{
      //   console.log('old')
      //   let url = "./createQuestionnaire/main?obj="+this.quesID
      //   wx.navigateTo({ url })
      // }
    }
  },
  onShow() {
    this.init();
    this.curuser = store.state.user;
  }
};
</script>
<style scoped>
.community {
  margin: 0rpx 8rpx 0rpx 8rpx;
  background-color: #ffffff;
}
.createTask {
  width: 600rpx;
  margin: 0 auto;
  border-bottom: 1rpx solid gray;
}
input {
  width: 500rpx;
  border-radius: 5rpx;
  padding-left: 5rpx;
  background-color: #efeff4;
}

.createTask p {
  font-size: 50rpx;
  font-weight: bold;
  text-align: left;
}
.Task-basicInfo {
  width: 600rpx;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
}
.Task-basicInfo view {
  margin-top: 10rpx;
  display: flex;
  flex-direction: row;
}
.Task-basicInfo view label {
  width: 100rpx;
}

.Task-description {
  width: 600rpx;
  height: 230rpx;
  margin: 0 auto;
  margin-top: 10rpx;
  margin-bottom: 15rpx;
}

.Task-description textarea {
  margin-top: 10rpx;
  width: 600rpx;
  height: 170rpx;
  border-radius: 5rpx;
  background-color: #efeff4;
}

.Task-time {
  width: 600rpx;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
}

.Task-time view {
  margin-top: 10rpx;
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
  margin-left: auto;
  margin-right: auto;
  margin-top: 10rpx;
  padding-bottom: 15rpx;
}
.Task-location label {
  width: 100rpx;
}
.Task-tag {
  width: 600rpx;
  display: flex;
  flex-direction: row;
  margin-top: 10rpx;
  margin-left: auto;
  margin-right: auto;
}

.Task-tag label {
  width: 100rpx;
}

.publish {
  margin-top: 10rpx;
  margin-bottom: 20rpx;
  width: 600rpx;
  margin-left: auto;
  margin-right: auto;
}
.addQues {
  margin: 10rpx;
  width: 300rpx;
  margin-left: auto;
  margin-right: auto;
}
.publish button {
  font-size: 30rpx;
  color: white;
  width: 500rpx;
  background-color: #fbdd30;
}
.addQues button {
  font-size: 30rpx;
  width: 300rpx;
  color: white;
  background-color: #1aad19;
}
</style>
