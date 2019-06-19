<template>
  <view class="ttt">
    <view class="createTask">
      <p>{{createTask}}</p>
    </view>
    <view class="Task-basicInfo">
      <view class="name">
        <label>标题</label>
        <input type="text" id="name" v-model="Task.name">
      </view>
      <view class="participatorNum">
        <label>人数</label>
        <input type="text" id="participatorNum" v-model="Task.participatorNum">
      </view>
      <view class="payment">
        <label>报酬</label>
        <input type="text" id="payment" v-model="Task.payment">
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

    <view class="publish" @click="publishTask">
      <button>{{ publish }}</button>
    </view>
  </view>
</template>


<script>
import { api } from "../../../utils/api";
import store from "../../../components/store";
export default {
  data() {
    return {
      createTask: "创建任务",
      index: 0,
      Task: {
        name: "",
        participatorNum: "",
        payment: "",
        description: "",
        startDate: "2019-04-25",
        startTime: "00:00",
        completeDate: "2019-04-25",
        completeTime: "00:00",
        publishDate: "2019-04-25",
        publishTime: "00:00",
        location: "北京市,北京市,东城区",
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
    publishTask() {
      curuser = store.state.user;
      let task = {
        name: this.Task.name,
        type: this.Task.tag[index].name,
        description: this.Task.description,
        state: "publishing",
        numberOfJoiner: 10,
        joiner: [],
        location: this.Task.location,
        publish: {
          publisher: curuser._id,
          beginTime: this.Task.publishDate + this.Task.publishTime,
          endTime: this.Task.startDate + this.Task.startTime
        },
        payment: this.Task.payment,
        work: {
          beginTime: this.Task.startDate + this.Task.startTime,
          endTime: this.Task.completeDate + this.Task.completeTime
        }
      };
      api
        .publishOneTask(task)
        .then(res => {
          wx.showToast({
            title: "创建任务成功",
            icon: "success",
            duration: 2000
          });
        })
        .catch(rej => {
          wx.showToast({
            title: "创建任务失败",
            icon: "success",
            duration: 2000
          });
        });
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
    }
  }
};
</script>

<style scoped>
.ttt {
  background-color: #efeff4;
}
.createTask {
  width: 500rpx;
  margin: 0 auto;
  border-bottom: 1rpx solid gray;
}
input {
  border-bottom: 1rpx solid gray;
}
.createTask p {
  font-size: 50rpx;
  font-weight: bold;
  text-align: center;
}
.Task-basicInfo {
  width: 500rpx;
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
  width: 500rpx;
  height: 230rpx;
  margin: 0 auto;
  margin-top: 10rpx;
  margin-bottom: 15rpx;
}

.Task-description textarea {
  margin-top: 10rpx;
  width: 500rpx;
  height: 170rpx;
  background-color: white;
}

.Task-time {
  width: 500rpx;
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
  width: 500rpx;
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
  width: 500rpx;
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
  width: 300rpx;
  margin-left: auto;
  margin-right: auto;
}
.publish button {
  font-size: 30rpx;
  color: white;
  background-color: #1aad19;
}
</style>