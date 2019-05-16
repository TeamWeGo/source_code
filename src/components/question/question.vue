<template>
  <div>
    <button @click="add">add</button>
    <ul class="container">
      <li :is="it.type" v-for="it in template" v-bind:key="it" :data="it"></li>
    </ul>
  </div>
</template>

<script>
//import Input from "./Input.vue";
export default {
  //props: ["template"],
  components: {},
  data() {
    return {
      template: []
    };
  },

  created: {},
  methods: {
    add() {
      template.push(Input);
    }
  },
  computed: {}
};
</script>

<style scoped>
</style>
