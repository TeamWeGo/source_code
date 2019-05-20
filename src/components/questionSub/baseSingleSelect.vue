<template>
  <div id="base-singleSelect">
<<<<<<< HEAD
    <label>{{temData.description}}</label>
    <br>
    <div v-for="(item, index) in temData.content" :key="index">
    <input type="radio" value="true" :name="index" :id="index" v-model="item.result">
    <label :for="index">{{item.label}}</label>
    </div>
    <!--<input type="radio" name="two" id="two" value="true" v-model="temData.content[0].result">
    <label for="two">{{temData.content[1].label}}</label>-->
=======
    <radio-group class="radio-group" @change="radioChange">
      <label>{{temData.description}}</label>
      <br>
      <radio
        name="one"
        id="one"
        value="true"
        v-model="temData.content[0].result"
      >{{temData.content[0].label}}</radio>
      <br>
      <radio
        name="two"
        id="two"
        value="true"
        v-model="temData.content[0].result"
      >{{temData.content[1].label}}</radio>
    </radio-group>
>>>>>>> 92e7ed134c18aad309f09164df8d44b1e81df577
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

<<<<<<< HEAD
//  created: {},
// methods: {},
 // computed: {}
=======
  methods: {},
  computed: {}
>>>>>>> 92e7ed134c18aad309f09164df8d44b1e81df577
};
</script>

<style scoped>
</style>
