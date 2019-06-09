
<template>
  <div>
    <p class="commiunitytitle">{{ commiunitytitle }}</p>
    <qContainer :temDatas="temDatas"></qContainer>
    <qEdit></qEdit>
    <button @click="getOpenId">getOpenId</button>
  </div>
</template>
<script>
import { api } from "../../utils/api.js";
import qContainer from "@/components/qContainer";
import qEdit from "@/components/qEdit";
export default {
  data() {
    return {
      commiunitytitle: "社区",
      temDatas: [
        {
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
        }
      ]
    };
  },

  components: {
    qContainer,
    qEdit
  },
  methods: {
    getOpenId() {
      api
        .getOpenId()
        .then(res => {
          console.log(res);
        })
        .catch(rej => {
          console.warn(rej);
        });
    }
  }
};
</script>

<style scoped>
</style>




