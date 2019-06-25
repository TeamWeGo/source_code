<template>
  <div>
    <p class="commiunitytitle">问卷总数：{{temDatas}}</p>
    <qContainer :temDatas="temDatas"></qContainer>
    <view v-for="(item, index) in results" :key="index">
      <view v-if="item.type == 'baseInput'">
        <view>{{item.description}}</view>
        <view v-for="(re, i) in item.content" :key="i">
          <view>{{ re.result }}</view>
        </view>
      </view>
      <view v-if="item.type == 'baseSingleSelect'">
        <view>{{item.description}}</view>
        <view v-for="(re, i) in item.content" :key="i">
          <view>{{ re.label+re.number }}</view>
        </view>
      </view>
      <view v-if="item.type == 'baseMultiSelect'">
        <view>{{item.description}}</view>
        <view v-for="(re, i) in item.content" :key="i">
          <view>{{ re.label+re.number }}</view>
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
      this.temDatas = obj.result[0].results
      //  console.log(this.temDatas);
      this.id = obj.result[0]._id;
      console.log(this.id);
      this.results = obj.result[0].template
      console.log(this.results);
      var size = this.results.length
      for(var index = 0;index < this.temDatas.length;index+=size){
        for(var i = 0;i < size;i++){
          if(this.results[i].type == 'baseInput'){

            this.results[i].content.push(this.temDatas[index*size+i].content)
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
  width: 600rpx;
}
</style>