<template>
  <div id="base-multiSelect">
    <label class="base_multiSelect_one">{{temData.description}}</label>
    <div>
      <checkbox
        name="one"
        id="one"
        value="true"
        v-for="it in temData.content"
        :key="it"
        v-model="it.result"
      >{{it.label}}</checkbox>
    </div>
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
.base_multiSelect_one {
  height: 20pt;
  font-size: 14pt;
  margin: 8rpx 0rpx 8rpx 0rpx;
}
</style>
