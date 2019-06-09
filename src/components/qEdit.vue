<template>
  <div id="qEdit">
    <input class="edit_input_input" placeholder="输入问题描述" type="text" v-model="data">
    <button class="edit_input_button">add a Input</button>

    <input class="edit_singleSelect_input_one" placeholder="输入单选问题描述" type="text" v-model="data">
    <input
      class="edit_singleSelect_input_two"
      placeholder="输入选项描述 例如：开心;不开心;"
      type="text"
      v-model="data"
    >
    <button>add a SingleSelect</button>

    <input class="edit_multiSelect_input_one" placeholder="输入多选问题描述" type="text" v-model="data">
    <input
      class="edit_multiSelect_input_two"
      placeholder="输入选项描述 例如：开心;不开心;沮丧;兴奋;"
      type="text"
      v-model="data"
    >
    <button>add a MultiSelect</button>
  </div>
</template>

<script>
export default {
  data() {
    return [];
  },
  methods: {},
  components: {}
};
</script>

<style scoped>
input {
  padding-left: 8px;
  height: 24pt;
  font-size: 13pt;
  margin: 8rpx 0rpx 8rpx 0rpx;
}
button {
  background-color: #1aad19;
  color: #ffffff;
  font-size: 14pt;
  margin: 8rpx 0rpx 8rpx 0rpx;
}
#qEdit {
  margin: 0rpx;
}
.edit_input_input {
}
.edit_input_button {
}
</style>
