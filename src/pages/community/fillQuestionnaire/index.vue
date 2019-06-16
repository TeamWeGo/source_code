<template>
  <div>
    <p class="commiunitytitle">{{ commiunitytitle }}</p>
    <qContainer :temDatas="temDatas" ></qContainer>
    <button @click="confirm">van♂成</button>
    <button @click="getOpenId">getOpenId</button>
  </div>
</template>
<script>
import { api } from "../../../utils/api.js";
import qContainer from "@/components/qContainer";
export default {
  data() {
    return {
      id: '',
      commiunitytitle: "社区",
      temDatas: [],
      results: []
    };
  },

  components: {
      qContainer
  },
  methods: {
    confirm: function(){
        this.results.push(this.temDatas)
        api
            .updateOneById('questionnaires', this.id, {
                results: this.results
            })
            .then(res => {
                let pages = getCurrentPages()
                let prevPage = pages[pages.length - 2]
                console.log("update")
                this.temDatas = []
                this.results = []
                wx.navigateBack({
                    delta: 1
                })
            })
            .catch(rej => {
                console.warn(rej);
                wx.navigateBack({
                    delta: 1
                })
            })
    }
  },
  onLoad (options) {
    var obj =JSON.parse(decodeURIComponent(options.obj))
    console.log(obj)
    this.temDatas = obj.result[0].template
    console.log(this.temDatas)
    this.results = obj.result[0].results
    this.id = obj.result[0]._id
    console.log(this.id)
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