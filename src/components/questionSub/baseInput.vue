<template>
  <div id="base-input">
    <label class="base_input_one" for="one">{{temData.description}}</label>
    <input
      name="one"
      id="one"
      class="base_input_input"
      placeholder="输入"
      type="text"
      v-model="temData.content[0].result"
    >
  </div>
</template>

<script>
export default {
  props: ["baseData"],
  components: {},
  data: function() {
    return {
      temData: this.baseData
    };
  },

  methods: {},
  computed: {}
};
</script>

<style scoped>
label {
  padding-left: 8px;
  height: 24pt;
  font-size: 13pt;
  margin: 8rpx 0rpx 8rpx 0rpx;
}
input {
  padding-left: 8px;
  height: 24pt;
  font-size: 13pt;
  margin: 8rpx 0rpx 8rpx 0rpx;
}
#base-input {
  margin: 0rpx;
}
.base_input_one {
  height: 20pt;
  font-size: 14pt;
  width: 100%;
}
.base_input_input {
  height: 20pt;
  font-size: 14pt;
  margin-bottom: 8rpx;
}
</style>
