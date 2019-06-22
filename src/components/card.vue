<template>
  <div class="item">
    <div class="card">
      <!-- picture -->
      <img class="item_image" :src="imgSrc">
      <!-- content -->
      <!--<div class="descript">{{ desc }}</div>-->
    </div>
  </div>
</template>

<script>
export default {
  props: ["imgSrc", "desc"]
};
</script>

<style scoped>
.item {
  margin: 5px;
  position: relative;
}
.card {
  position: relative;
  height: 170px;
  width: 250px;
  background: #ffffff;
}
.item_image {
  position: relative;
  height: 100%;
  width: 100%;
}
.descript {
  font-size: 20px;
  width: 100%;
  height: auto;
  background-color: #dcdcdc;
  opacity: 0.5;
  position: absolute;
  top: 85%;
  text-align: center;
}
</style>
