<template>
  <div>
    <input placeholder="输入问题描述" type="text" v-model="data">
    <button>add a Input</button>

    <input placeholder="输入单选问题描述" type="text" v-model="data">
    <input placeholder="输入选项描述 例如：开心;不开心;" type="text" v-model="data">
    <button>add a SingleSelect</button>

    <input placeholder="输入多选问题描述" type="text" v-model="data">
    <input placeholder="输入选项描述 例如：开心;不开心;沮丧;兴奋;" type="text" v-model="data">
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
</style>
