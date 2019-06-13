<template>
  <view class='ttt'>
    <view class='createTask'>
      <p>{{title}}</p>
    </view>
    <view class='Task-basicInfo'>
      <view class='name'>
        <view>标题 {{Task.title}}</view>
      </view>
      <view class='participatorNum'>
        <view>人数 {{Task.maxJoiner}}</view>
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
        <view>开始日期：{{Task.work.beginTime}}</view>
      </view>

      <view class='completeDate'>
        <view>截止日期：{{Task.work.endTime}}</view>
      </view>


      <view class='publishDate'>
        <view>报名截止：{{Task.publish.endTime}}</view>
      </view>

    </view>
    <view class='Task-tag'>
      <view>标签：{{Task.type}}</view>
    </view>
    <view class='Task-location'>
        <view>地点：{{Task.location}}</view>
    </view>
    <view class='accept' @click='acceptTask'>
      <button>{{ accept }}</button>
    </view>
  </view>
  <!-- Today is Monday, our air conditioner ran out of money in the midnight, fuck! I wake up because of the heat, and heard xiaofan getting out of bed to turn on the fan
  Bye Bye! See you next time. -->
</template>


<script>
import { api } from "../../../utils/api.js";
export default {
  data () {
    return {
      title: '任务详情',
      Task: {
        title: '',
        avatarId: '',
        type: '学习',
        description: '',
        state: 'publishing', 
        maxJoiner: 10,
        joiners: '',
        location: '北京市,北京市,东城区',
        publish: {
          publisher: '',
          beginTime: '',
          endTime: ''
        },
        payment: 200,
        work: {
          beginTime: '',
          endTime: ''
        },
        isQuestionnaire: true,
        questionnaireId: ''
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