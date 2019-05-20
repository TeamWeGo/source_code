<template>
  <div id="base-singleSelect">
    <label>{{temData.description}}</label>
    <br>
    <div v-for="(item, index) in temData.content" :key="index">
      <input type="checkbox" value="true" :name="index" :id="index" v-model="item.result">
      <label :for="index">{{item.label}}</label>
    </div>
    <!--<input type="checkbox" name="one" id="one" value="true" v-model="temData.content[0].result">
    <label for="one">{{temData.content[0].label}}</label>
    <br>
    <input type="checkbox" name="two" id="two" value="true" v-model="temData.content[1].result">
    <label for="two">{{temData.content[1].label}}</label>-->
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
  }

 // created: {},
 // methods: {},
 // computed: {}
};
</script>

<style scoped>
</style>
