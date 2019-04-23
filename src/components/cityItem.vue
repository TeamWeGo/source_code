<template>
  <div class="item" @click="goBack">
    <p class="text">{{ city }}</p>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  props: ['city'],
  methods: {
    goBack () {
      console.log("goback");
      let pages = getCurrentPages();
      if(pages.length > 1){
        //上一个页面实例对象
        var prePage = pages[pages.length - 2];
        //关键在这里
        prePage.changeCity(this.city);
        wx.navigateBack({
          delta: 1
        })
      }else{
        console.log("return page fail!");
      }
    }
  }
}
</script>

<style scoped>
.item {
  margin: 5px;
  position: relative;
}
.text {
  font-size: 18px;
  margin: 10px;
}
.line {
  margin-left: 10px;
  border-bottom: 1px solid #C9C5C7;
}
</style>
