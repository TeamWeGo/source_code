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
        balance: 1000, //Number free money coin
        credit: 100,
        isVerified: True,
        personalStatement: "Hello World"
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
      api
        .queryOneById("users", "")
        .then(res => {
          console.log(res);
        })
        .catch(rej => {
          console.warn(rej);
        });
    },
    updateOneUserById() {
      api
        .updateOneById("users", "", {
          balance: 5000
        })
        .then(res => {
          console.log(res);
        })
        .catch(rej => {
          console.warn(rej);
        });
    },
    publishOneTask() {
      let task = {
        title: "唱歌", // String every task need a name Title
        type: "娱乐", //String task type
        description: "唱一首单身情歌", //String task detail description
        state: "publishing", //String task state
        maxJoiner: 10, //Number Max Nubmer of joiners
        joiners: [], //String Array the joiners _id array
        location: "广州",
        publish: {
          publisher: "ee3099285cc7c051093255c93e1edebc", //String user._id
          beginTime: "",
          endTime: ""
        },
        payment: 4000,
        work: {
          beginTime: "",
          endTime: ""
        }
      };
      api
        .publishOneTask(task)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.warn(err);
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
        .querySomeByModel("tasks", {})
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
