<template>
  <div class='ttt'>
    <view class='createTask'>
      <p>{{createTask}}</p>
    </view>
    <view class='Task-basicInfo'>
      <view class='name'>
        <label>{{ Task.name }}</label>
        <input type="text" id='name' />
      </view>
      <view class='participatorNum'>
        <label>{{ Task.participatorNum }}</label>
        <input type="text" id='participatorNum' >
      </view>
      <view class='payment'>
        <label>{{ Task.payment }}</label>
        <input type="text" id='payment'>
      </view>
    </view>
    <view class='Task-description'>
      <label>{{ Task.description }}</label>
      <textarea type="text" id='description'/>
    </view>
    <view class='Task-time'>
      <view class='startTime'>
        <label>{{ Task.startTime }}</label>
        <input type='date' id='startTime' placeholder='2019.04.10'/>
      </view>
      <view class='completeTime'>
        <label>{{ Task.completeTime }}</label>
        <input type='date' id='completeTime' placeholder='2019.04.10'>
      </view>
      <view class='publishTime'>
        <label>{{ Task.publishTime }}</label>
        <input type='date' id='publishTime' placeholder='2019.04.10'>
      </view>
    </view>
    <div class='Task-tag'>
      <label>{{ Task.tag }}</label>
      <input type="text" id='tag'/>
    </div>
    <div class='Task-location'>
      <label>{{ Task.location }}</label>
      <input type="text" id='location'/>
    </div>
    <div class='publish'>
      <button>{{ publish }}</button>
    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      createTask: '创建任务',
      Task: {
        name: '标题',
        participatorNum: '人数',
        payment: '报酬',
        description: '任务描述',
        startTime: '开始时间',
        completeTime: '截止时间',
        publishTime: '发布时间',
        location: '地点',
        tag: '标签'
      },
      publish: 'fa♂布'
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
  background-color: white;
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
}

.Task-description textarea{
  margin-top: 10rpx;
  width: 500rpx;
  height: 170rpx;
  background-color: white;
}

.Task-time{
  width: 500rpx;
  margin: 0 auto;
  margin-top: 10rpx;
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

.publish{
  margin-top: 10rpx;
  width: 300rpx;
  margin-left: auto;
  margin-right: auto;
}
.publish button{
  font-size: 30rpx;
  color: white;
  background-color: #1AAD19;
}

</style>
