<template>
  <div id="base-input">
    <label>{{baseData.data.description}}</label>
    <input id="input-text" type="text" v-model="baseData.data.input">
  </div>
</template>

<script>
export default {
  props: ["baseData"],
  components: {},
  data: function() {
    return {};
  },

  created: {},
  methods: {},
  computed: {}
};
</script>

<style scoped>
</style>
