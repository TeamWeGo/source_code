<template>
  <div class="container">
    <baseInput baseData="temDatas[0]"></baseInput>
    <baseSingleSelect baseData="temDatas[1]"></baseSingleSelect>
  </div>
</template>

<script>
import baseInput from "./questionSub/baseInput";
import baseSingleSelect from "./questionSub/baseSingleSelect";
import baseMultiSelect from "./questionSub/baseMultiSelect";
export default {
  data: function() {
    return {
      temDatas: [
        {
          type: baseInput,
          description: "你的学号",
          content: [
            {
              result: ""
            }
          ]
        },
        {
          type: baseSingleSelect,
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
          type: baseMultiSelect,
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
        }
      ]
    };
  },
  components: {
    baseInput,
    baseSingleSelect,
    baseMultiSelect
  }
};
</script>

<style scoped>
</style>

