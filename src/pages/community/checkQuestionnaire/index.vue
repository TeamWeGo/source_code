<template>
  <div>
    <p class="commiunitytitle">{{ commiunitytitle }}</p>
    <qContainer :temDatas="temDatas"></qContainer>
    <button @click="confirm">完成</button>
  </div>
</template>
<script>
import { api } from "../../../utils/api.js";
import qContainer from "@/components/qContainer";
export default {
  data() {
    return {
      id: "",
      commiunitytitle: "社区",
      temDatas: []
    };
  },

  components: {
    qContainer
  },
  methods: {
    confirm: function() {
      this.temDatas = [];
      wx.navigateBack({
        delta: 1
      });
    }
  },
  onLoad(options) {
    if (Object.keys(options).length != 0) {
      var obj = JSON.parse(decodeURIComponent(options.obj));
      console.log(obj);
<<<<<<< HEAD
      this.temDatas = obj.results;
=======
      this.temDatas = obj.result[0].results[0];
>>>>>>> upstream/master
      console.log(this.temDatas);
      this.id = obj._id;
      console.log(this.id);
    }
  }
};
</script>

<style scoped>
button {
  background-color: #1aad19;
  color: #ffffff;
  font-size: 14pt;
  margin: 8px 15px 8px 15px;
  border-radius: 5px;
}
</style>