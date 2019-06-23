<template>
  <div id="base-singleSelect">
    <radio-group class="radio-group" @change="radioChange">
      <label class="base_singleSelect_one" for="radio_one">{{"*"+temData.description}}</label>
      <div class="base_singleSelect_radio">
        <radio
          name="radio_one"
          id="radio_one"
          value="true"
          v-for="it in temData.content"
          :key="it"
          v-model="it.result"
        >{{it.label}}</radio>
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
radio {
  margin: 0rpx 8rpx 0rpx 8rpx;
}
#base-singleSelect {
  margin: 0rpx;
  background-color: gainsboro;
  border-radius: 10rpx;
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
