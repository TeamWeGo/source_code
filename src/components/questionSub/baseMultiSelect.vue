<template>
  <div id="base-singleSelect">
    <label>{{temData.description}}</label>
    <br>
    <checkbox
      name="one"
      id="one"
      value="true"
      v-for="it in temData.content"
      :key="it"
      v-model="it.result"
    >{{it.label}}</checkbox>
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
