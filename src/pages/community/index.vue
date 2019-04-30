<template>
  <div>
    <p class="ttt">{{ txt }}</p>
    <button @click="insertOneUser">insertOneUser</button>
    <button @click="queryOneUserByUserId">queryOneUserByUserId</button>
    <button @click="updateOneUserById">updateOneUserById</button>
    <button @click="publishOneTask">publishOneTask</button>
    <button @click="queryOneTaskByTaskId">queryOneTaskByTaskId</button>
    <button @click="updateOneTaskByTaskId">updateOneTaskByTaskId</button>
    <button @click="queryAllTasks">queryAllTasks</button>
    <button @click="queryAllUsers">queryAllUsers</button>
  </div>
</template>


<script>
import { api } from "../../utils/api.js";
export default {
  data() {
    return {
      txt: "社区"
    };
  },

  created() {
    // let app = getApp()
  },
  methods: {
    insertOneUser() {
      let user = {
        name: "庄蚊子", //String real name
        wechatopenid: "00020",
        studentId: "16340222", //String studient id
        gender: "male", //String
        tasks: {
          //Object the tasks which containd the user
          published: [], // String Array the tasks that the user published
          finished: [], //String Array the tasks that the user finished
          doing: [] //String Array the tasks that the user is doing right now
        },
        balance: 1000 //Number free money coin
      };
      api
        .insertOneUser(user)
        .then(res => {
          console.log(res);
        })
        .catch(rej => {
          console.warn(rej);
        });
    },
    queryOneUserByUserId() {
      wx.cloud
        .callFunction({
          name: "queryOne",
          data: {
            colName: "users",
            _id: "96c1cbbe5cc7ac420928f5b7449fdd"
          }
        })
        .then(res => {
          console.log(res);
        });
    },
    updateOneUserById() {
      wx.cloud
        .callFunction({
          name: "updateOne",
          data: {
            colName: "users",
            _id: "9c4488c75cc720cc090e539350a9e278",
            updateInfo: {
              balance: 3000
            }
          }
        })
        .then(res => {
          console.log(res);
        });
    },
    publishOneTask() {
      let task = {
        name: "唱歌", // String every task need a name Title
        type: "娱乐", //String task type
        description: "唱一首单身情歌", //String task detail description
        state: "publishing", //String task state
        numberOfJoiner: 10, //Number Max Nubmer of joiners
        joiner: [], //String Array the joiners _id array
        location: "广州",
        publish: {
          publisher: "ee3099285cc44cdd07c405e104efb85b", //String user._id
          beginTime: "",
          endTime: ""
        },
        payment: 200,
        work: {
          beginTime: "",
          endTime: ""
        }
      };
      wx.cloud
        .callFunction({
          name: "insertOne",
          data: {
            colName: "tasks",
            data: task
          }
        })
        .then(res => {
          console.log(res);
        });
    },
    queryOneTaskByTaskId() {
      wx.cloud
        .callFunction({
          name: "queryOne",
          data: {
            colName: "tasks",
            queryInfo: {
              _id: ""
            }
          }
        })
        .then(res => {
          console.log(res);
        });
    },
    updateOneTaskByTaskId() {
      wx.cloud
        .callFunction({
          name: "updateOne",
          data: {
            colName: "tasks",
            _id: "988c1b1b5cc7acc9092ab3cc40fb6b8d",
            updateInfo: {
              payment: 3000
            }
          }
        })
        .then(res => {
          console.log(res);
        });
    },
    queryAllTasks() {
      api
        .queryTasksByModel({})
        .then(res => {
          console.log(res);
        })
        .catch(rej => {
          console.warn(rej);
        });
    },
    queryAllUsers() {
      wx.cloud
        .callFunction({
          name: "querySome",
          data: {
            colName: "users",
            queryInfo: {}
          }
        })
        .then(res => {
          console.log(res);
        });
    }
  }
};
</script>

<style scoped>
</style>
