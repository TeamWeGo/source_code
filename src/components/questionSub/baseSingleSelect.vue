<template>
  <div id="base-singleSelect">
    <radio-group class="radio-group" @change="radioChange">
      <label class="base_singleSelect_one">{{temData.description}}</label>
      <div class="base_singleSelect_radio">
        <radio
          name="one"
          id="one"
          value="true"
          v-model="temData.content[0].result"
        >{{temData.content[0].label}}</radio>
        <radio
          name="two"
          id="two"
          value="true"
          v-model="temData.content[0].result"
        >{{temData.content[1].label}}</radio>
      </div>
    </radio-group>
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
#base-singleSelect {
  margin: 0rpx;
}
.base_singleSelect_one {
  height: 20pt;
  font-size: 14pt;
  width: 100%;
}
.base_singleSelect_radio {
  font-size: 14pt;
  margin: 8rpx 0rpx 8rpx 0rpx;
}
</style>
