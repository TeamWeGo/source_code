<template>
  <div class="item" @click="goBack">
    <p class="text">{{ city }}</p>
    <div class="line"></div>
  </div>
</template>

<script>
import store from "./store";
export default {
  props: ["city"],
  methods: {
    goBack() {
      let pages = getCurrentPages();
      if (pages.length > 1) {
        //上一个页面实例对象
        //var prePage = pages[pages.length - 2];
        //关键在这里
        store.commit("changeCity", this.city);
        //   console.log("goback");
        wx.navigateBack();
      } else {
        //console.log("return page fail!");
      }
    }
  }
};
</script>

<style scoped>
.item {
  margin: 5px;
  position: relative;
  margin-bottom: 0;
}
.text {
  font-size: 16px;
  margin: 10px;
}
.line {
  margin-left: 10px;
  border-bottom: 1px solid #c9c5c7;
}
</style>
