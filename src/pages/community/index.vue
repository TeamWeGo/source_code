
<template>
  <div>
    <p class="commiunitytitle">{{ commiunitytitle }}</p>
    <qContainer :temDatas="temDatas"></qContainer>
    <qEdit></qEdit>
    <button @click="getOpenId">getOpenId</button>
    <button @click="createTask">createTask</button>
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
    },
    createTask() {
      let task = {
        title: "唱歌", // String every task need a name Title
        avatarId: "../", //upload the avatar to server and get an id from the callback
        type: "娱乐", //String task type
        description: "唱一首情歌", //String task detail description
        state: "publishing", //String task state 任务发布中，任务确认中，任务执行中，任务完成
        maxJoiner: 2, //Number Max Nubmer of joiners
        joiners: [""], //String Array the joiners _id array
        location: "广州",
        publish: {
          publisher: "2d9d2d8c5cfcadaf026afb736e36075d", //String user._id
          beginTime: "",
          endTime: ""
        },
        payment: 5,
        work: {
          beginTime: "",
          endTime: ""
        }
      };
      api
        .publishOneTask(task)
        .then(res => {
          console.log("t");
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




