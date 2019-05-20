<template>
  <div id="base-input">
    <label for="one">{{temData.description}}</label>
    <input
      name="one"
      id="one"
      placeholder="输入"
      type="text"
      focus="true"
      v-model="temData.content[0].result"
    >
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
