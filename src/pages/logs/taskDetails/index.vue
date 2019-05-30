<template>
  <view class='ttt'>
    <view class='createTask'>
      <p>{{title}}</p>
    </view>
    <view class='Task-basicInfo'>
      <view class='name'>
        <view>标题 {{Task.name}}</view>
      </view>
      <view class='participatorNum'>
        <view>人数 {{Task.participatorNum}}</view>
      </view>
      <view class='payment'>
        <view>报酬 {{Task.payment}}</view>
      </view>
    </view>
    <view class='Task-description'>
      <label>任务描述</label>
      <label>{{Task.description}}</label>
    </view>
    <view class='Task-time'>
      <view class='startDate'>
        <view>开始日期：{{Task.startDate}}</view>
      </view>
      <view class='startTime'>
        <view>时间：{{Task.startTime}}</view>
      </view>

      <view class='completeDate'>
        <view>截止日期：{{Task.completeDate}}</view>
      </view>

      <view class='completeTime'>
        <view>时间：{{Task.completeTime}}</view>
      </view>

      <view class='publishDate'>
        <view>报名截止：{{Task.publishDate}}</view>
      </view>

      <view class='publishTime'>
        <view>时间：{{Task.publishTime}}</view>
      </view>

    </view>
    <view class='Task-tag'>
      <view class='picker'>标签：{{Task.tag[index].name}}</view>
    </view>
    <view class='Task-location'>
        <view>地点：{{Task.location}}</view>
    </view>
    <view class='accept' @click='acceptTask'>
      <button>{{ accept }}</button>
    </view>
  </view>
</template>


<script>
import { api } from "../../../utils/api.js";
export default {
  data () {
    return {
      title: '任务详情',
      index: 0,
      Task: {
        name: '未定',
        participatorNum: '',
        payment: '',
        description: '',
        startDate: '2019-04-25',
        startTime: '00:00',
        completeDate: '2019-04-25',
        completeTime: '00:00',
        publishDate: '2019-04-25',
        publishTime: '00:00',
        location: '北京市,北京市,东城区',
        tag: [{id: 0, name: '学习'}, {id: 1, name: '娱乐'}, {id: 2, name: '生活'}]
      },
      accept: '接♂受'
    }
  },
  onLoad (options) {
    var obj =JSON.parse(decodeURIComponent(options.obj));
    console.log(obj);
    this.Task = obj;
  },
  methods: {
    accpetTask (){
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

      let task = {
        name: this.Task.name,
        type: this.Task.tag,
        description: this.Task.description,
        state: 'publishing',
        numberOfJoiner: 10,
        joiner: [],
        location: this.Task.location,
        publish: {
          publisher: 'ee3099285cc7c051093255c93e1edebc',
          beginTime: "",
          endTime: Date(this.Task.startDate + this.Task.startTime)
        },
        payment: this.Task.payment,
        work: {
          beginTime: Date(this.Task.startDate + this.Task.startTime),
          endTime: Date(this.Task.completeDate + this.Task.completeTime)
        }
      };
      api
        .publishOneTask(task)
        .then(res => {
          console.log(res);
        })
        .catch(rej => {
          console.warn(rej);
        });
    },
    bindStartDate: function(e){
      this.Task.startDate = e.mp.detail.value
    },
    bindStartTime: function(e){
      this.Task.startTime = e.mp.detail.value
    },
    bindCompleteDate: function(e){
      this.Task.completeDate = e.mp.detail.value
    },
    bindCompleteTime: function(e){
      this.Task.completeTime = e.mp.detail.value
    },
    bindPublishDate: function(e){
      this.Task.publishDate = e.mp.detail.value
    },
    bindPublishTime: function(e){
      this.Task.publishTime = e.mp.detail.value
    },
    bindRegionChange: function(e){
      this.Task.location = e.mp.detail.value
    },
    bindTagChange: function(e){
      this.index = e.mp.detail.value
    }
  }
}
</script>

<style scoped>
.ttt{
  background-color: #EFEFF4;
}
.createTask{
  width: 500rpx;
  margin: 0 auto;
  border-bottom: 1rpx solid gray;
}
input{
  border-bottom: 1rpx solid gray;
}
.createTask p{
  font-size: 50rpx;
  font-weight: bold;
  text-align: center;
}
.Task-basicInfo{
  width: 500rpx;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
}
.Task-basicInfo view{
  margin-top: 10rpx;
  display: flex;
  flex-direction: row;
}
.Task-basicInfo view label{
  width: 100rpx;
}

.Task-description{
  width: 500rpx;
  height: 230rpx;
  margin: 0 auto;
  margin-top: 10rpx;
  margin-bottom: 15rpx;
}

.Task-description label{
  margin-top: 10rpx;
  width: 500rpx;
  height: 170rpx;
}

.Task-time{
  width: 500rpx;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
}

.Task-time view{
  margin-top: 10rpx;
  display: flex;
  flex-direction: row;
}
.Task-time view label{
  width: 200rpx;
}

.Task-location{
  width: 500rpx;
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10rpx;
  padding-bottom: 15rpx;
}
.Task-location label{
  width: 100rpx;
}
.Task-tag{
  width: 500rpx;
  display: flex;
  flex-direction: row;
  margin-top: 10rpx;
  margin-left: auto;
  margin-right: auto;
}

.Task-tag label{
  width: 100rpx;
}

.accept{
  margin-top: 10rpx;
  width: 300rpx;
  margin-left: auto;
  margin-right: auto;
}
.accept button{
  font-size: 30rpx;
  color: white;
  background-color: #1AAD19;
}

</style>