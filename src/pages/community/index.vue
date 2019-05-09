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
    <button @click="joinOneTask">joinOneTask</button>
    <button @click="verifyOneTask">verifyOneTask</button>
    <button @click="endOneTask">endOneTask</button>
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
        name: "zzp", //String real name
        wechatopenid: "00010",
        studentId: "16340212", //String studient id
        gender: "male", //String
        tasks: {
          //Object the tasks which containd the user
          publishing: [], // String Array the tasks that the user published
          finished: [], //String Array the tasks that the user finished
          doing: [], //String Array the tasks that the user is doing right now
          joining: [],
          verifyed: [],
          ended: []
        },
        balance: 5000, //Number free money coin
        credit: 100,
        isVerified: true,
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
          publisher: "9c4488c75ccd7f600bf8fe206feb2726", //String user._id
          beginTime: "",
          endTime: ""
        },
        payment: 40,
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
      api
        .querySomeByModel("users", {})
        .then(res => {
          console.log(res);
        })
        .catch(rej => {
          console.warn(rej);
        });
    },
    joinOneTask() {
      let task = {
        _id: "96c1cbbe5ccd7fd00bf71e5b6040ab63",
        joiners: [],
        maxJoiner: 10
      };
      let joiner = {
        _id: "9c4488c75ccd7f9d0bf92e032f5159d6"
      };
      api
        .joinOneTask(task, joiner)
        .then(res => {
          console.log(res);
        })
        .catch(rej => {
          console.warn(rej);
        });
    },
    verifyOneTask() {
      let task = {
        _id: "96c1cbbe5ccd7fd00bf71e5b6040ab63",
        joiners: ["9c4488c75ccd7f9d0bf92e032f5159d6"],
        publish: {
          publisher: "9c4488c75ccd7f600bf8fe206feb2726"
        },
        maxJoiner: 10,
        payment: 40
      };
      let publisher = {
        _id: "9c4488c75ccd7f600bf8fe206feb2726"
      };
      api
        .verifyOneTask(task, publisher)
        .then(res => {
          console.log(res);
        })
        .catch(rej => {
          console.warn(rej);
        });
    },
    endOneTask() {
      let task = {
        _id: "96c1cbbe5ccd7fd00bf71e5b6040ab63",
        joiners: ["9c4488c75ccd7f9d0bf92e032f5159d6"],
        publish: {
          publisher: "9c4488c75ccd7f600bf8fe206feb2726"
        },
        maxJoiner: 10,
        payment: 40
      };
      let publisher = {
        _id: "9c4488c75ccd7f600bf8fe206feb2726"
      };

      api
        .endOneTask(task, publisher)
        .then(res => {
          console.log(res);
        })
        .catch(rej => {
          console.warn(rej);
        });
    },
    deleteOneTask() {
      let task;
      let publisher;
      api
        .deleteOneTask(task, publisher)
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
