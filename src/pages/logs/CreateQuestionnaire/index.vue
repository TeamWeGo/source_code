<template>
  <div>
    <view class="name">
      调查名称
      <input>
    </view>
    <view class="description">
      调查说明
      <textarea type="text"/>
    </view>
    <view>
      <picker mode='selector'
        :value='index'
        :range='questionType'
        :range-key="'name'"
        @change='bindTypeChange'>
        <view class='picker'>添加问题</view>
      </picker>
    </view>
    <view>
      <qContainer v-bind:temDatas="temDatas" @addOption="addOption" @deleteOption="deleteOption" @deleteQues="deleteQues"></qContainer>
    </view>
  </div>
</template>

<script>
import { api } from "../../../utils/api.js";
import qContainer from "@/components/qContainer";
import baseInput from "@/components/questionSub/baseInput";
import baseSingleSelect from "@/components/questionSub/baseSingleSelect";
import baseMultiSelect from "@/components/questionSub/baseMultiSelect";
export default {
  components: {
    baseInput,
    baseSingleSelect,
    baseMultiSelect,
    qContainer
  },

  data(){
    return{
      index: 0,
      questionType: [{id: 0, name: '单项选择题'}, {id: 1, name: '多项选择题'}, {id: 2, name: '填空题'}],
      temDatas: [
        {
          type: 'baseSingleSelect',
          description: "是否喜欢xx",
          content: [
            {
              label: "是",
              result: false
            },
            {
              label: "否",
              result: false
            }
          ]
        },
        {
          type: 'baseSingleSelect',
          description: "是否喜欢xx",
          content: [
            {
              label: "是",
              result: false
            },
            {
              label: "否",
              result: false
            }
          ]
        }
      ]
    }
  },

  methods: {
    bindTypeChange: function(e){
      this.index = e.mp.detail.value;
      if(this.index == 0){
        var questionnaire = {
          type: 'baseSingleSelect',
          description: "是否喜欢xx",
          content: [
            {
              label: "是",
              result: false
            },
            {
              label: "否",
              result: false
            }
          ]
        };
        this.temDatas.push(questionnaire);
      }
      else if(this.index == 1){
        var questionnaire = {
          type: 'baseMultiSelect',
          description: "以下哪一个代表你现在的心情",
          content: [
            {
              label: "开心",
              result: false
            },
            {
              label: "沮丧",
              result: false
            },
            {
              label: "感激",
              result: false
            }
          ]
        };
        this.temDatas.push(questionnaire);
      }
      else{
        var questionnaire = {
          type: 'baseInput',
          description: "你的学号",
          content: [
            {
              result: ""
            }
          ]
        };
        this.temDatas.push(questionnaire);
      }
    },
    addOption: function(data){
      var tempIndex = data;
      var option = {
        label: "是",
        result: false
      };
      this.temDatas[tempIndex].content.push(option);
    },
    deleteOption: function(data){
      var tempIndex = data;
      var size = this.temDatas[tempIndex].content.length;
      this.temDatas[tempIndex].content.splice(size-1, 1);
    },
    deleteQues: function(data){
      var tempIndex = data;
      this.temDatas.splice(tempIndex, 1);
    }
  }
}
</script>