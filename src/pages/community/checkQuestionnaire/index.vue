<template>
  <div>
    <p class="commiunitytitle">问卷总数：{{temDatas.length/results.length}}</p>
    <view class='quesResult' v-for="(item, index) in results" :key="index">
      <view class='input' v-if="item.type == 'baseInput'">
        <view class='description'>{{"★ " + item.description}}</view>
        <view v-for="(re, i) in item.content" :key="i">
          <view>{{ re.result }}</view>
        </view>
      </view>
      <view class='singleSelect' v-if="item.type == 'baseSingleSelect'">
        <view class='description'>{{"☆ " + item.description}}</view>
        <view v-for="(re, i) in item.content" :key="i">
          <view><span class='content'>{{re.label}}</span><span class='number'>{{re.number+"%"}}</span></view>
        </view>
      </view>
      <view class='multiSelect' v-if="item.type == 'baseMultiSelect'">
        <view class='description'>{{"▲ " + item.description}}</view>
        <view v-for="(re, i) in item.content" :key="i">
          <view><span class='content'>{{re.label}}</span><span class='number'>{{re.number+"%"}}</span></view>
        </view>
      </view>
    </view>
    <button @click="confirm">完成</button>
  </div>
</template>
<script>
import { api } from "../../../utils/api.js";
import qContainer from "@/components/qContainer";
export default {
  data() {
    return {
      id: "",
      temDatas: [],
      results: []
    };
  },

  components: {
    qContainer
  },
  methods: {
    confirm: function() {
      this.temDatas = [];
      wx.navigateBack({
        delta: 1
      });
    }
  },
  onLoad(options) {
    if (Object.keys(options).length != 0) {
      var obj = JSON.parse(decodeURIComponent(options.obj));
      // console.log(obj);
      this.temDatas = obj.result[0].results[0]
      //  console.log(this.temDatas);
      this.id = obj.result[0]._id;
      console.log(this.id);
      this.results = obj.result[0].template
      console.log(this.results);
      var size = this.results.length
      for(var index = 0;index < this.temDatas.length;index+=size){
        console.log(index)
        for(var i = 0;i < size;i++){
          if(this.results[i].type == 'baseInput'){
            if(this.temDatas[index*size+i].content[0].result!='')
            this.results[i].content.push(this.temDatas[index*size+i].content[0])
          }
          else if(this.results[i].type == 'baseSingleSelect'){
            if(index == 0){
              for(var j = 0;j < this.results[i].content.length;j++){
                this.results[i].content[j].number = 0
              }
            }
            for(var j = 0;j < this.results[i].content.length;j++){
              if(this.temDatas[index*size+i].content[j].result == true){
                this.results[i].content[j].number++
              }
            }
          }
          else if(this.results[i].type == 'baseMultiSelect'){
            if(index == 0){
              for(var j = 0;j < this.results[i].content.length;j++){
                this.results[i].content[j].number = 0
              }
            }
            for(var j = 0;j < this.results[i].content.length;j++){
              if(this.temDatas[index*size+i].content[j].result == true){
                this.results[i].content[j].number++
              }
            }
          }
        }
      }
      for(var i = 0;i < size;i++){
        for(var j = 0;j < this.results[i].content.length;j++){
          this.results[i].content[j].number = parseFloat(this.results[i].content[j].number).toFixed(2)*100
        }
      }
      console.log(this.results)
    }
  }
};
</script>

<style scoped>
.commiunitytitle{
  width: 600rpx;
  margin: auto auto;
  border-bottom: 1rpx solid gray;
  font-size: 50rpx;
  font-weight: bold;
  text-align: center;
}
button {
  background-color: #1aad19;
  color: #ffffff;
  font-size: 12pt;
  margin: 8px 15px 8px 15px;
  border-radius: 5px;
  width: 700rpx;
}
.quesResult{
  margin: 8px 15px 8px 15px;
  width: 700rpx;
}
.description{
  height: 20pt;
  font-size: 14pt;
}
.input, .singleSelect, .multiSelect{
  padding-left: 8px;
  padding-right: 8px;
  background-color: gainsboro;
  border-radius: 10rpx;
}
.content{
  text-align: center;
}
.number{
  float: right;
  margin-right: 20px;
}
</style>