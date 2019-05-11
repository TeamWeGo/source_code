<template>
  <div id="Input">
    <label for="input-text">{{data.description}}</label>
    <input id="input-text" type="text" value="data.input">
  </div>
</template>

<script>
export default {
  props: ["data"],
  components: {},
  data() {},

  created() {},
  methods() {},
  computed() {}
};
</script>

<style scoped>
</style>
