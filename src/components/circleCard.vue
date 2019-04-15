<template>
  <div class="circleTemplate">
    <img class="circle" v-if="imgSrc" :src="imgSrc" >
    <p class="circle-text">
      {{text}}
    </p>
  </div>
</template>

<script>
export default {
  props: [ 'text', 'imgSrc' ]
}
</script>

<style>
.circle {
  border-radius: 50%;
  padding: 10px;
  width: 100px;
  height: 100px;
}
.circle-text {
  size: 20pt;
  text-align: center;
}
.circleTemplate {
  float: left;
}
</style>
