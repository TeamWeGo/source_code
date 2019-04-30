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
        name: "zzq", //String real name
        wechatopenid: "0002",
        studentId: "16340296", //String studient id
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
      api
        .queryOneUserByUserId("ee3099285cc44cdd07c405e104efb85b")
        .then(res => {
          console.log(res);
        })
        .catch(rej => {
          console.warn(rej);
        });
    },
    updateOneUserById() {
      api
        .updateUserByUserId("ee3099285cc44cdd07c405e104efb85b", {
          balance: 250
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
          publisher: "96c1cbbe5cc6a00d08b8e1e2413479ca", //String user._id
          beginTime: new Date(),
          endTime: new Date()
        },
        payment: 10,
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
        .catch(rej => {
          console.warn(rej);
        });
    },
    queryOneTaskByTaskId() {
      api
        .queryOneTaskByTaskId("96c1cbbe5cc44d7d07c4b4b0572fc005")
        .then(res => {
          console.log(res);
        })
        .catch(rej => {
          console.warn(rej);
        });
    },
    updateOneTaskByTaskId() {
      api
        .updateTaskByTaskId("96c1cbbe5cc44d7d07c4b4b0572fc005", {
          payment: 2500
        })
        .then(res => {
          console.log(res);
        })
        .catch(rej => {
          console.warn(rej);
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
      api
        .queryAllUsers()
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
