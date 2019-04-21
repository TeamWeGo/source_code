/* eslint-disable standard/no-callback-literal */
/* eslint-disable space-before-function-paren */
import { mydb } from './mydb.js'
export var api = {

  /**
   * insert a user in server
   * @param {Object} user user object
   */
  insertOneUser: function (user) {
    return new Promise((resolve, reject) => {
      if (!isVaildUserForm(user)) {
        let msg = {
          'result': 'userform is invalid ',
          'errMsg': 'insert a user:error'
        }
        reject(msg)
      }
      mydb.queryOneUserByUserName(user.name, function (result) {
        if (result.data.length != 0) {
          let msg = {
            'result': 'already has',
            'errMsg': 'insert a user:error'
          }
          reject(msg)
        } else {
          mydb.insertOneUser(user, function (result) {
            if (result._id) {
              let msg = {
                'result': result._id,
                'errMsg': 'insert a user:ok'
              }
              resolve(msg)
            } else {
              let msg = {
                'result': null,
                'errMsg': 'insert a user:error'
              }
              reject(msg)
            }
          })
        }
      })

    })
  },
  /**
    * queryUsersByUserName
    * @param {String} username user name
    */
  queryOneUserByUserName: function (username) {
    return new Promise((resolve, reject) => {
      mydb.queryOneUserByUserName(username, function (result) {
        if (result.data.length != 0) {
          let msg = {
            'result': result.data,
            'errMsg': 'query a user:ok'
          }
          resolve(msg)
        } else {
          let msg = {
            'result': null,
            'errMsg': 'query a user:error'
          }
          reject(msg)
        }
      })

    })
  },
  /**
   * queryOneUserByUserId
   * @param {String} id user id
   */
  queryOneUserByUserId: function (id) {
    return new Promise((resolve, reject) => {
      mydb.queryOneUserByUserId(id, function (result) {
        if (result.data.length != 0) {
          let msg = {
            'result': result.data,
            'errMsg': 'query a user:ok'
          }
          resolve(msg)
        } else {
          let msg = {
            'result': null,
            'errMsg': 'query a user:error'
          }
          reject(msg)
        }
      })
    })
  },
  /**
   * updateUserByUserId
   * @param {String} _id user _id
   * @param {Object} updateInfo update user info
   */
  updateUserByUserId: function (_id, updateInfo) {
    return new Promise((resolve, reject) => {
      mydb.updateOneUserByUserId(_id, updateInfo, function (result) {
        if (result.stats.updated == 1) {
          let msg = {
            'result': result.stats.updated,
            'errMsg': 'update a user:ok'
          }
          resolve(msg)
        } else {
          let msg = {
            'result': null,
            'errMsg': 'update a user:error'
          }
          reject(msg)
        }
      })
    })
  },
  /**
   * insert a task and update publiser
   * @param {Object} task task
   */
  insertOneTask: async function (task) {
    let user;
    let error;
    await new Promise((resolve, reject) => {
      if (!isVaildTaskForm(task)) {
        reject('task form is valid' + task);
      }
      mydb.insertOneTask(task, (result) => {
        if (result._id) {
          resolve(result);
        }
        else {
          reject('error insert task');
        }
      });
    }).then((result) => {
      task._id = result._id;
    }).catch((ref) => {
      error = ref;
    });
    await new Promise((resolve, reject) => {
      mydb.queryOneUserByUserId(task.publish.publiser, (result) => {
        if (result.data.length != 0) {
          resolve(result);
        }
        else {
          reject('error insert task');
        }
      });
    }).then((result) => {
      user = result.data
    }).catch((ref) => {
      error = ref;
    });;

    return new Promise((resolve, reject) => {

      if (error) {
        reject(error)
      }
      let publishs = user.tasks.published;
      publishs.push(task._id);
      let updateInfo = {
        'tasks': {
          'published': publishs
        }
      };
      mydb.updateOneUserByUserId(user._id, updateInfo, (result) => {
        if (result.stats.updated == 1) {
          let msg = {
            'result': task._id,
            'errMsg': 'insert a task:ok'
          }
          resolve(msg);
        }
        else {
          let msg = {
            'result': null,
            'errMsg': 'insert a task:error'
          }
          reject(msg);
        }
      });
    });

  },

  /**
   * update a Task by _id
   * @param {String} id task._id
   * @param {Object} updateInfo Object info
   */
  updateTaskByTaskId: function (id, updateInfo) {
    return new Promise((resolve, reject) => {
      mydb.updateOneTaskByTaskId(id, updateInfo, (result) => {
        if (result.stats.updated == 1) {
          let msg = {
            'result': result.stats.updated,
            'errMsg': 'update a task:ok'
          }
          resolve(msg);
        } else {
          let msg = {
            'result': null,
            'errMsg': 'update a task:error'
          }
          reject(msg);
        }
      })
    })

  },
  queryOneTaskByTaskId: function (id) {
    return new Promise((resolve, reject) => {
      mydb.queryOneTaskByTaskId(id, (result) => {
        if (result.data.length != 0) {
          let msg = {
            'result': result.data,
            'errMsg': 'query a task:ok'
          }
          resolve(msg);
        } else {
          let msg = {
            'result': null,
            'errMsg': 'query a task:error'
          }
          reject(msg);
        }
      })
    })
  }


}

function isVaildUserForm(user) {
  return true
}

function isVaildTaskForm(user) {
  return true
}
