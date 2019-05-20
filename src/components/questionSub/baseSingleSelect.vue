<template>
  <div id="base-singleSelect">
    <radio-group class="radio-group" @change="radioChange">
      <label>{{temData.description}}</label>
      <br>
      <radio name="one" id="one" value="true" v-model="temData.content[0].result"></radio>
      <label for="one">{{temData.content[0].label}}</label>
      <br>
      <radio name="two" id="two" value="true" v-model="temData.content[0].result"></radio>
      <label for="two">{{temData.content[1].label}}</label>
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

  created: {},
  methods: {},
  computed: {}
};
</script>

<style scoped>
</style>
