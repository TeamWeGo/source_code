/* eslint-disable standard/no-callback-literal */
const db = wx.cloud.database({
  env: 'earnmoney-7c2ab8'
})
export var mydb = {

  /**
   * insert a user
   * @param {Object} user USER
   * @param {function} callback CALLBACK
   */
  insertOneUser: function (user, callback) {
    if (user) {
      let tem = user;
      tem.createTime = db.serverDate();
      db.collection('users').add({
        data: tem,
        success: res => {
          callback(res)
        },
        fail: console.error
      })
    } else {
      callback('user is null or undefined', null)
    }
  },
  /**
   * delete a user by user id
   * @param {String} userId user _id
   * @param {Funtfion} callback result
   */
  deleteOneUserByUserId: function (userId, callback) {
    if (userId) {
      db.collection('users').doc(userId).remove({
        success: res => {
          callback(res)
        },
        fail: console.error
      })
    } else {
      callback('userId id null or undefined')
    }
  },
  /**
   * update a user info by user id
   * @param {String} userId user _id
   * @param {Object} updateInfo usr info Object
   * @param {Function} callback result
   */
  updateOneUserByUserId: function (userId, updateInfo, callback) {
    if (userId) {
      db.collection('users').doc(userId).update({
        data: updateInfo,
        success: res => {
          callback(res)
        },
        fail: console.error
      })
    } else {
      callback('userId id null or undefined')
    }
  },
  /**
   * get a user info by user id
   * @param {String} _id user._id
   * @param {Function} callback result
   */
  queryOneUserByUserId: function (_id, callback) {
    db.collection('users').doc(_id).get({
      success: res => {
        callback(res)
      },
      fail: () => {
        let msg = {
          'result': console.error.toString(),
          'errMsg': 'query a user:eror'
        }
        console.log(msg);
        callback(null)
      }
    })

  },
  /**
   * query user info by user openid
   * @param {Sring} openid user openid
   * @param {Function } callback result
   */
  queryOneUserByUserWeChatOpenId: function (wechatopenid, callback) {
    if (wechatopenid) {
      db.collection('users').where({
        'wechatopenid': wechatopenid
      }).get({
        success: res => {
          callback(res)
        },
        fail: () => {
          let msg = {
            'result': console.error.toString(),
            'errMsg': 'query a user:eror'
          }
          console.log(msg);
          callback(null)
        }
      })

    } else {
      callback('wechatopenid is null or undefined')
    }
  },
  /**
   * query 20 users
   * @param {Function} callback result
   */
  queryAllUsers: function (callback) {
    db.collection('users').orderBy('createTime', 'desc').get({
      success: res => {
        callback(res)
      }
    }
    )
  },
  /**
   * insert a task
   * @param {Object} task task info
   * @param {Function} callback result
   */
  insertOneTask: function (task, callback) {
    let tem = task;
    tem.createTime = db.serverDate();
    db.collection('tasks').add({
      data: tem,
      success: res => {
        callback(res)
      },
      fail: console.error
    })
  },
  /**
 * delete a task by task id
 * @param {String} taskId task _id
 * @param {Funtfion} callback result
 */
  deleteOneTaskByTaskId: function (taskId, callback) {
    db.collection('tasks').doc(taskId).remove({
      success: res => {
        callback(res)
      },
      fail: console.error
    })
  },
  /**
   * update a task info by task id
   * @param {String} taskId task _id
   * @param {Object} updateInfo task info Object
   * @param {Function} callback result
   */
  updateOneTaskByTaskId: function (taskId, updateInfo, callback) {
    db.collection('tasks').doc(taskId).update({
      data: updateInfo,
      success: res => {
        callback(res)
      },
      fail: console.error
    })
  },
  /**
   * get a task info by task id
   * @param {String} taskId task _id
   * @param {Function} callback result
   */
  queryOneTaskByTaskId: function (taskId, callback) {
    if (taskId) {
      db.collection('tasks').doc(taskId).get({
        success: res => {
          callback(res)
        },
        fail: () => {
          let msg = {
            'result': console.error.toString(),
            'errMsg': 'query a task:eror'
          }
          console.log(msg);
        }
      })
    } else {
      callback('taskId id null or undefined')
    }
  },
  /**
   * query task info by task name
   * @param {Sring} taskName task name
   * @param {Function } callback result
   */
  // queryTasksByTaskTitle: function (taskTitle, callback) {
  //   db.collection('tasks').where({
  //     title: taskTitle
  //   }).get({
  //     success: res => {
  //       callback(res)
  //     },
  //     fail: () => {
  //       let msg = {
  //         'result': console.error.toString(),
  //         'errMsg': 'query a task:eror'
  //       }
  //       console.log(msg);
  //     }
  //   })
  // },
  // queryTasksByPublisherId: function (publisherId, callback) {
  //   db.collection('tasks').orderBy('createTime', 'desc').where({
  //     publish: {
  //       publisher: publisherId
  //     }
  //   }).get({
  //     success: res => {
  //       callback(res)
  //     },
  //     fail: () => {
  //       let msg = {
  //         'result': console.error.toString(),
  //         'errMsg': 'query a task:eror'
  //       }
  //       console.log(msg);
  //     }
  //   })
  // },
  queryTasksModel: function (queryObject, callback) {
    db.collection('tasks').where(queryObject).orderBy('createTime', 'desc').get({
      success: res => {
        callback(res)
      },
      fail: () => {
        let msg = {
          'result': console.error.toString(),
          'errMsg': 'query a task:eror'
        }
        console.log(msg);
      }
    })
  },
  /**
   * query 20 tasks
   * @param {Function} callback result
   */
  // queryAllTasks: function (callback) {
  //   db.collection('tasks').limit(20).orderBy('createTime', 'desc').get({
  //     success(res) {
  //       callback(res)
  //     }
  //   }
  //   )
  // }
}
