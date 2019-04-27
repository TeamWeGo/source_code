<template>
  <view class='ttt'>
    <view class='createTask'>
      <p>{{createTask}}</p>
    </view>
    <view class='Task-basicInfo'>
      <view class='name'>
        <label>标题</label>
        <input type="text" id='name' v-model='Task.name'/>
      </view>
      <view class='participatorNum'>
        <label>人数</label>
        <input type="text" id='participatorNum' v-model='Task.participatorNum'/>
      </view>
      <view class='payment'>
        <label>报酬</label>
        <input type="text" id='payment' v-model='Task.payment' />
      </view>
    </view>
    <view class='Task-description'>
      <label>任务描述</label>
      <textarea type="text" id='description' v-model='Task.description'/>
    </view>
    <view class='Task-time'>
      <view class='startTime'>
        <picker  mode="date"
          value="Task.startTime"
          start="2019-01-01"
          end="2022-01-01"
          bindchange='bindDateChange'>
          <view class='picker'>开始时间：{{Task.startTime}}</view>
        </picker>
      </view>
      <view class='completeTime'>
        <label>截止时间</label>
        <input type='date' id='completeTime' placeholder='2019.04.10' v-model='Task.completeTime' />
      </view>
      <view class='publishTime'>
        <label>截止时间</label>
        <input type='date' id='publishTime' placeholder='2019.04.10' v-model='Task.publishTime' />
      </view>
    </view>
    <view class='Task-tag'>
      <label>标签</label>
      <input type="text" id='tag' v-model='Task.tag'/>
    </view>
    <view class='Task-location'>
      <label>地点</label>
      <input type="text" id='location' V-model='Task.location'/>
    </view>
    <view class='publish' @click='publishTask'>
      <button>{{ publish }}</button>
    </view>
  </view>
</template>


<script>
import { api } from "../../../utils/api.js";
export default {
  data () {
    return {
      createTask: '创建任务',
      Task: {
        name: '',
        participatorNum: '',
        payment: '',
        description: '',
        startTime: '2019-04-25',
        completeTime: '',
        publishTime: '',
        location: '',
        tag: ''
      },
      publish: 'fa♂布'
    }
  },
  methods: {
    publishTask (){
      let task = {
        name: this.Task.name,
        type: this.Task.tag,
        description: this.Task.description,
        state: 'publishing',
        numberOfJoiner: 10,
        joiner: [],
        location: this.Task.location,
        publish: {
          publisher: '96c1cbbe5cc1c6ab06a2fe28085dc760',
          beginTime: "",
          endTime: this.Task.startTime
        },
        idlePay: this.Task.payment,
        work: {
          beginTime: this.Task.startTime,
          endTime: this.Task.completeTime
        }
      };
      api
        .insertOneTask(task)
        .then(res => {
          console.log(res);
        })
        .catch(rej => {
          console.warn(rej);
        });
    },
    bindDateChange(e){
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.Task.startTime = e.detail.value
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

.Task-description textarea{
  margin-top: 10rpx;
  width: 500rpx;
  height: 170rpx;
  background-color: white;
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