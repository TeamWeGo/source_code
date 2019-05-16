<template>
  <div>
    <question :template="tobject"></question>
  </div>
</template>

<script>
import question from "@/components/question/question";

export default {
  data() {
    return {
      tobject: [
        {
          type: Input,
          description: "你的学号",
          input: ""
        },
        {
          type: Input,
          description: "你的学号",
          input: ""
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>
