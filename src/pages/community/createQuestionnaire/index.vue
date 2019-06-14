
<template>
  <div>
    <p class="commiunitytitle">{{ commiunitytitle }}</p>
    <qContainer :temDatas="temDatas"></qContainer>
    <button @click="deleteQues">删除一条问题</button>
    <qEdit
      @addMultiSelectQues="addMultiSelect"
      @addSingleSelectQues="addSingleSelect"
      @addInputQues="addInput"
    ></qEdit>
    <button @click="getOpenId">getOpenId</button>
  </div>
</template>
<script>
import { api } from "../../../utils/api.js";
import qContainer from "@/components/qContainer";
import qEdit from "@/components/qEdit";
export default {
  data() {
    return {
      commiunitytitle: "创建问卷",
      temDatas: [
        /*  {
          type: "baseInput",
          description: "你的学号",
          content: [
            {
              result: ""
            }
          ]
        },
        {
          type: "baseSingleSelect",
          description: "是否喜欢xx",
          content: [
            {
              label: "是",
              result: false
            },
            {
              label: "否",
              result: false
            }
          ]
        },
        {
          type: "baseMultiSelect",
          description: "以下哪一个代表你现在的心情",
          content: [
            {
              label: "开心",
              result: false
            },
            {
              label: "沮丧",
              result: false
            },
            {
              label: "感激",
              result: false
            }
          ]
        }*/
      ]
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
    getOpenId: function() {
      api
        .getOpenId()
        .then(res => {
          console.log(res);
        })
        .catch(rej => {
          console.warn(rej);
        });
    },
    addMultiSelect: function(val) {
      this.temDatas.push(val);
    },
    addSingleSelect: function(val) {
      this.temDatas.push(val);
    },
    addInput: function(val) {
      this.temDatas.push(val);
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