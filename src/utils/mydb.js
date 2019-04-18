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
      db.collection('users').add({
        data: user,
        success: res => {
          callback(null, res)
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
   * @param {Funtfion} callback err,result
   */
  deleteOneUser: function (userId, callback) {
    if (userId) {
      db.collection('users').doc(userId).remove({
        success: res => {
          callback(null, res)
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
   * @param {Function} callback err,result
   */
  updateOneUser: function (userId, updateInfo, callback) {
    if (userId) {
      db.collection('users').doc(userId).update({
        data: updateInfo,
        success: res => {
          callback(null, res)
        },
        fail: console.error
      })
    } else {
      callback('userId id null or undefined')
    }
  },
  /**
   * get a user info by user id
   * @param {String} userId user _id
   * @param {Function} callback err,result
   */
  queryOneUserByUserId: function (userId, callback) {
    if (userId) {
      db.collection('users').doc(userId).get({
        success: res => {
          callback(null, res.data)
        },
        fail: console.error
      })
    } else {
      callback('userId id null or undefined')
    }
  },
  /**
   * query user info by user name
   * @param {Sring} userName user name
   * @param {Function } callback err,result
   */
  queryOneUserByUserName: function (userName, callback) {
    if (userName) {
      db.collection('users').where({
        'name': userName
      }).get({
        success: res => {
          callback(null, res)
        },
        fail: console.error
      })

    } else {
      callback('userName is null or undefined')
    }
  },
  /**
   * query 20 users
   * @param {Function} callback err,result
   */
  queryAllUsers: function (callback) {
    db.collection('users').get({
      success: res => {
        callback(null, res.data)
      },
      fail: console.error
    }
    )
  },
  /**
   * insert a task
   * @param {Object} task task info
   * @param {Function} callback err,result
   */
  insertOneTask: function (task, callback) {
    if (task) {
      db.collection('tasks').add({
        data: task,
        success: res => {
          callback(null, res)
        },
        fail: console.error
      })
    } else {
      callback('task is null or undefined', null)
    }
  },
  /**
 * delete a task by task id
 * @param {String} taskId task _id
 * @param {Funtfion} callback err,result
 */
  deleteOneTask: function (taskId, callback) {
    if (taskId) {
      db.collection('tasks').doc(taskId).remove({
        success: res => {
          callback(null, res)
        },
        fail: console.error
      })
    } else {
      callback('taskId id null or undefined')
    }
  },
  /**
   * update a task info by task id
   * @param {String} taskId task _id
   * @param {Object} updateInfo task info Object
   * @param {Function} callback err,result
   */
  updateOneTask: function (taskId, updateInfo, callback) {
    if (taskId) {
      db.collection('tasks').doc(taskId).update({
        data: updateInfo,
        success: res => {
          callback(null, res)
        },
        fail: console.error
      })
    } else {
      callback('taskId id null or undefined')
    }
  },
  /**
   * get a task info by task id
   * @param {String} taskId task _id
   * @param {Function} callback err,result
   */
  queryOneTaskByTaskId: function (taskId, callback) {
    if (taskId) {
      db.collection('tasks').doc(taskId).get({
        success: res => {
          callback(null, res.data)
        },
        fail: console.error
      })
    } else {
      callback('taskId id null or undefined')
    }
  },
  /**
   * query task info by task name
   * @param {Sring} taskName task name
   * @param {Function } callback err,result
   */
  queryTasksByTaskName: function (taskName, callback) {
    if (taskName) {
      db.collection('tasks').where({
        name: taskName
      }).get({
        success: res => {
          callback(null, res.data)
        },
        fail: console.error
      })
    } else {
      callback('taskName null or undefined')
    }
  },
  /**
   * query 20 tasks
   * @param {Function} callback err,result
   */
  queryAllTasks: function (callback) {
    db.collection('tasks').get({
      success: res => {
        callback(null, res.data)
      },
      fail: console.error
    }
    )
  }
}
