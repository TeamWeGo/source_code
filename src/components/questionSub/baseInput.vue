<template>
  <div id="base-input">
    <label for="one">{{temData.description}}</label>
    <input name="one" id="one" placeholder="输入" type="text" v-model="temData.content[0].result">
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
</style>
