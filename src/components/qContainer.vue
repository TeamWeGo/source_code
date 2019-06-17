<template>
  <div class="container">
    <!-- <label>{{title}}</label> -->
    <div v-for="(item, index) in temDatas" :key="index">
      <ul v-if="item.type=='baseInput'">
        <baseInput :baseData="item"></baseInput>
        <!--       
        <button @click="deleteQues(index)">delete Ques</button> 
        -->
      </ul>
      <ul v-if="item.type=='baseSingleSelect'">
        <baseSingleSelect :baseData="item"></baseSingleSelect>
        <!--    
        <button @click="addOption(index)">add Option</button>
        <button @click="deleteOption(index)">delete Option</button>
        <button @click="deleteQues(index)">delete Ques</button>
        -->
      </ul>
      <ul v-if="item.type=='baseMultiSelect'">
        <baseMultiSelect :baseData="item"></baseMultiSelect>
        <!--    
        <button @click="addOption(index)">add Option</button>
        <button @click="deleteOption(index)">delete Option</button>
        <button @click="deleteQues(index)">delete Ques</button> 
        -->
      </ul>
    </div>

    <!--
      <component :is="item.type"  v-for="(item, index) in temDatas" :key="index" :baseData="item"> </component>
    -->
  </div>
</template>

<script>
import baseInput from "./questionSub/baseInput";
import baseSingleSelect from "./questionSub/baseSingleSelect";
import baseMultiSelect from "./questionSub/baseMultiSelect";
export default {
  components: {
    baseInput,
    baseSingleSelect,
    baseMultiSelect
  },
  props: ["temDatas"],
  data: function() {
    return {
      temDatas: this.temDatas
    };
  },
  methods: {
    addOption: function(index) {
      this.$emit("addOption", index);
    },
    deleteOption: function(index) {
      this.$emit("deleteOption", index);
    },
    deleteQues: function(index) {
      this.$emit("deleteQues", index);
    }
  }
};
</script>

<style scoped>
.container {
  margin: 8rpx 10rpx 8rpx 10rpx;
  padding: 10rpx;
}
ul {
  margin: 0rpx;
  width: 700rpx;
}
baseInput {
  margin: 0rpx;
  left: 0rpx;
}
</style>

