
<template>
  <div>
    <qContainer :temDatas="temDatas"></qContainer>
    <questionnaire @confirmSend="addQues"></questionnaire>
    
    <!-- <qContainer :temDatas="temDatas"></qContainer>
    <button @click="deleteQues">Delete</button>
    <qEdit
      @addMultiSelectQues="addMultiSelect"
      @addSingleSelectQues="addSingleSelect"
      @addInputQues="addInput"
    ></qEdit> -->
    <button @click="deleteQues">删除问题</button>
    <button @click="publish">发布问卷</button>
  </div>
</template>
<script>
import { api } from "../../../utils/api.js";
import qContainer from "@/components/qContainer";
import questionnaire from '@/components/logs/questionnaire'
import qEdit from "@/components/qEdit";
import store from "../../../components/store";
export default {
  data() {
    return {
      id: "",
      temDatas: []
    };
  },

  components: {
    qContainer,
    qEdit,
    questionnaire
  },
  methods: {
    deleteQues: function() {
      var size = this.temDatas.length;
      this.temDatas.splice(size - 1, 1);
    },
    addQues: function(val) {
      this.temDatas.push(val);
      console.log('addQues')
      console.log(this.temDatas)
    },
    publish: function() {
      if (this.temDatas.length != 0) {
        if (this.id == "") {
          let questionnaire = {
            title: "nothing",
            description: "nothing",
            maxCount: 50,
            template: this.temDatas,
            results: []
          };
          api
            .insertOne("questionnaires", questionnaire)
            .then(res => {
              wx.showToast({
                title: "创建问卷成功",
                icon: "success",
                duration: 2000
              });
              this.temDatas = [];
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
              this.temDatas = [];
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
              this.temDatas = [];
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
        this.temDatas = [];
      }
    }
  },
  onLoad(options) {
    if(Object.keys(options).length!=0){
      var obj = JSON.parse(decodeURIComponent(options.obj));
      this.temDatas = obj.result[0].template;
      this.id = obj.result[0]._id;
      console.log(this.id);
    }
  },
  onUnload: function() {
    this.temDatas = [];
    this.id = "";
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