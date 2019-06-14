
<template>
  <div>
    <p class="commiunitytitle">{{ commiunitytitle }}</p>
    <qContainer :temDatas="temDatas" ></qContainer>
    <button @click="deleteQues">Delete</button>
    <qEdit @addMultiSelectQues="addMultiSelect" @addSingleSelectQues="addSingleSelect" 
    @addInputQues="addInput"></qEdit>
    <button @click="publish">fa♂布</button>
    <button @click="getOpenId">getOpenId</button>
  </div>
</template>
<script>
import { api } from "../../../utils/api.js";
import qContainer from "@/components/qContainer";
import qEdit from "@/components/qEdit";
import store from '../../../components/store';
export default {
  data() {
    return {
      commiunitytitle: "社区",
      temDatas: [],
      template: []
    };
  },

  components: {
    qContainer,
    qEdit
  },
  methods: {
    deleteQues:function(){
      var size = this.temDatas.length
      this.temDatas.splice(size-1, 1)
      this.template.splice(size-1, 1)
    },
    getOpenId:function() {
      api
        .getOpenId()
        .then(res => {
          console.log(res);
        })
        .catch(rej => {
          console.warn(rej);
        });
    },
    addMultiSelect:function(val) {
      this.temDatas.push(val)
      this.template.push(val)
    },
    addSingleSelect:function(val){
      this.temDatas.push(val)
      this.template.push(val)
    },
    addInput:function(val){
      this.temDatas.push(val)
      this.template.push(val)
    },
    publish: function(){
      let questionnaire = {
        title: 'nothing',
        description: 'nothing',
        maxMount: 50,
        template: this.template,
        results: this.temDatas
      }
      api
        .insertOne('questionnaires', questionnaire)
        .then(res => {
          store.commit('changeQuesID',res.result)
        })
        .catch(rej => {
          console.warn(rej);
        })
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      
      wx.navigateBack({
            delta: 1
      })
    }
  }
};
</script>

<style scoped>
</style>