
<template>
  <div>
    <p class="commiunitytitle">{{ commiunitytitle }}</p>
    <qContainer :temDatas="temDatas"></qContainer>
    <button @click="deleteQues">Delete</button>
    <qEdit
      @addMultiSelectQues="addMultiSelect"
      @addSingleSelectQues="addSingleSelect"
      @addInputQues="addInput"
    ></qEdit>
    <button @click="publish">fa♂布</button>
  </div>
</template>
<script>
import { api } from "../../../utils/api.js";
import qContainer from "@/components/qContainer";
import qEdit from "@/components/qEdit";
import store from "../../../components/store";
export default {
  data() {
    return {
      id: "",
      commiunitytitle: "社区",
      temDatas: []
    };
  },

  components: {
    qContainer,
    qEdit
  },
  methods: {
    deleteQues: function() {
      var size = this.temDatas.length;
      this.temDatas.splice(size - 1, 1);
    },
    addMultiSelect: function(val) {
      this.temDatas.push(val);
    },
    addSingleSelect: function(val) {
      this.temDatas.push(val);
    },
    addInput: function(val) {
      this.temDatas.push(val);
    },
    publish: function() {
      if (this.temDatas.length != 0) {
        if (this.id == "") {
          let questionnaire = {
            title: "nothing",
            description: "nothing",
            maxMount: 50,
            template: this.temDatas,
            results: []
          };
          this.temDatas = [];
          api
            .insertOne("questionnaires", questionnaire)
            .then(res => {
              wx.showToast({
                title: "创建问卷成功",
                icon: "success",
                duration: 2000
              });
              let pages = getCurrentPages();
              let prevPage = pages[pages.length - 2];
              console.log("insert");
              prevPage.setData({
                quesID: res.result
              });
              wx.navigateBack({
                delta: 1
              });
            })
            .catch(rej => {
              wx.showToast({
                title: "创建问卷失败",
                icon: "success",
                duration: 2000
              });
            });
        } else {
          api
            .updateOneById("questionnaires", this.id, {
              template: this.temDatas
            })
            .then(res => {
              let pages = getCurrentPages();
              let prevPage = pages[pages.length - 2];
              console.log("update");
              this.temDatas = [];
              wx.navigateBack({
                delta: 1
              });
            })
            .catch(rej => {
              console.warn(rej);
              wx.navigateBack({
                delta: 1
              });
            });
        }
      } else {
        console.log("nothing");
        wx.navigateBack({
          delta: 1
        });
      }
    }
  },
  onLoad(options) {
    var obj = JSON.parse(decodeURIComponent(options.obj));
    this.temDatas = obj.result[0].template;
    this.id = obj.result[0]._id;
    console.log(this.id);
  },
  onUnload: function (){
    this.temDatas = []
    this.id = ''
  }
};
</script>

<style scoped>
qContainer {
  margin: 2rpx;
}
button {
  background-color: #1aad19;
  color: #ffffff;
  font-size: 14pt;
  margin: 8px 15px 8px 15px;
  border-radius: 5px;
}
</style>