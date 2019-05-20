<template>
  <div id="base-singleSelect">
    <label>{{temData.description}}</label>
    <br>
    <div v-for="(item, index) in temData.content" :key="index">
    <input type="radio" value="true" :name="index" :id="index" v-model="item.result">
    <label :for="index">{{item.label}}</label>
    </div>
    <!--<input type="radio" name="two" id="two" value="true" v-model="temData.content[0].result">
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

//  created: {},
// methods: {},
 // computed: {}
};
</script>

<style scoped>
</style>
