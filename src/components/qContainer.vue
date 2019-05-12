<template>
  <div class="container">
    <baseInput></baseInput>
    <ul>
      <li :is="item.type" v-for="item in them" v-bind:key="item" :data="data"></li>
    </ul>
  </div>
</template>

<script>
import baseInput from "./question/baseInput";
export default {
  data: function() {
    return {
      tt: {
        type: "Input",
        data: {
          description: "ss",
          input: ""
        }
      }
    };
  },
  components: {
    baseInput
  }
};
</script>

<style scoped>
</style>

