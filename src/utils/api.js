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
          'result': null,
          'msg': 'insert a user:error',
          'errMsg': 'user is not valid'
        }
        reject(msg)

      }
      wx.cloud
        .callFunction({
          name: "querySome",
          data: {
            colName: "users",
            queryInfo: {
              wechatopenid: user.wechatopenid
            }
          }
        })
        .then(res => {
          if (res.result.data.length == 0) {
            wx.cloud.callFunction({
              name: "insertOne",
              data: {
                colName: "users",
                data: user
              }
            }).then((result) => {
              let msg = {
                'result': result.result._id,
                'msg': 'insert a user:ok',
                'errMsg': null
              }
              resolve(msg)
            }).catch((err) => {
              let msg = {
                'result': null,
                'msg': 'insert a user:error',
                'errMsg': err
              }
              reject(msg)
            })
          } else {
            let msg = {
              'result': null,
              'msg': 'insert a user:error',
              'errMsg': 'user has already in db'
            }
            reject(msg)
          }
        }).catch((err => {
          let msg = {
            'result': null,
            'msg': 'insert a user:error',
            'errMsg': err
          }
          reject(msg)
        }));


    })
  },

  querySomeByModel: function (colName, queryInfo) {
    return new Promise((resolve, reject) => {
      wx.cloud
        .callFunction({
          name: "querySome",
          data: {
            colName: colName,
            queryInfo: queryInfo
          }
        })
        .then(result => {
          if (result.result) {
            if (result.result.data.length != 0) {
              let msg = {
                'result': result.result.data,
                'msg': 'query all user:ok',
                'errMsg': null
              }
              resolve(msg);
            } else {
              let msg = {
                'result': null,
                'msg': 'query all user:error',
                'errMsg': 'query error in db '
              }
              reject(msg);
            }
          } else {
            let msg = {
              'result': null,
              'msg': 'query all user:error',
              'errMsg': 'error in db'
            }
            reject(msg);
          }
        });
    })
  },
  /**
   * queryOneUserByUserId
   * @param {String} id user id
   */
  queryOneById: function (colName, _id) {
    return new Promise((resolve, reject) => {
      wx.cloud
        .callFunction({
          name: "queryOne",
          data: {
            colName: colName,
            _id: _id
          }
        })
        .then(result => {
          if (result.result) {
            if (result.result.data.length != 0) {
              let msg = {
                'result': result.result.data,
                'msg': 'query a user:ok',
                'errMsg': null
              }
              resolve(msg)
            } else {
              let msg = {
                'result': null,
                'msg': 'query a user:error',
                'errMsg': 'error in db'
              }
              reject(msg)
            }
          } else {
            let msg = {
              'result': null,
              'msg': 'query a user:error',
              'errMsg': 'error in db'
            }
            reject(msg)
          }
        })
    });
  },
  /**
   * updateUserByUserId
   * @param {String} _id user _id
   * @param {Object} updateInfo update user info
   */
  updateOneById: function (colName, _id, updateInfo) {
    return new Promise((resolve, reject) => {
      wx.cloud
        .callFunction({
          name: "updateOne",
          data: {
            colName: colName,
            _id: _id,
            updateInfo: updateInfo
          }
        })
        .then(result => {
          if (result.result.stats.updated == 1) {
            let msg = {
              'result': result.stats.updated,
              'msg': 'update a user:ok',
              'errMsg': null
            }
            resolve(msg)
          } else {
            let msg = {
              'result': null,
              'msg': 'update a user:error',
              'errMsg': 'error in db'
            }
            reject(msg)
          }
        });

    })
  },
  /**
   * publish a task and update publiser
   * @param {Object} task task
   */
  publishOneTask: async function (task) {
    return new Promise((resolve, reject) => {
      if (!isVaildTaskForm(task)) {
        let msg = {
          'result': null,
          'msg': 'publish a task:error',
          'errMsg': 'task is no valid'
        }
        reject(msg)
      } else {
        resolve();
      }


    }).then((result => {
      return new Promise((resolve, reject) => {
        wx.cloud.callFunction({
          name: "insertOne",
          data: {
            colName: "tasks",
            data: task
          }
        }).then((result) => {
          resolve(result.result._id);
        }).catch((err) => {
          let msg = {
            'result': null,
            'msg': 'publish a task:error',
            'errMsg': err
          }
          reject(msg)
        })
      }).then((result) => {
        task._id = result;
        return new Promise((resolve, reject => {
          wx.cloud.callFunction({
            name: "queryOne",
            data: {
              colName: "users",
              _id: task.publish.publiser
            }
          }).then((result => {
            if (result.result.data.length != 0) {
              resolve(result.result.data);
            } else {
              let msg = {
                'result': null,
                'msg': 'publish a task:error',
                'errMsg': 'no publisher in db'
              }
              reject(msg)
            }
          })).catch((err) => {
            let msg = {
              'result': null,
              'msg': 'publish a task:error',
              'errMsg': err
            }
            reject(msg)
          })
        })).then((result => {
          return new Promise((resolve, reject) => {
            let user = result;
            if (user.balance - task.payment < 0) {
              let msg = {
                'result': null,
                'msg': 'insert a task:error',
                'msg': 'user.balance - task.payment < 0'
              }
              reject(msg)
            }
            let published = user.tasks.published;
            published.push(task._id);
            wx.cloud.callFunction({
              name: "updateOne",
              data: {
                colName: 'users',
                _id: user._id,
                updateInfo: {
                  tasks: {
                    published: published
                  }
                }
              }
            }).then((result => {
              if (result.result.state.update == 1) {
                let msg = {
                  'result': result.result.state.update,
                  'msg': 'publish a task:ok',
                  'errMsg': null
                }
                resolve(msg)
              } else {
                let msg = {
                  'result': null,
                  'msg': 'publish a task:error',
                  'errMsg': 'update publisher error'
                }
                reject(msg)
              }
            })).catch((err => {
              let msg = {
                'result': null,
                'msg': 'publish a task:error',
                'errMsg': err
              }
              reject(msg)
            }))
          }).catch((err) => {
            new Promise((resolve, reject) => {
              wx.cloud.callFunction({
                name: "deleteOne",
                data: {
                  colName: "tasks",
                  _id: task._id
                }
              }).then((result) => {
                let msg = {
                  'result': null,
                  'msg': 'insert a task:error',
                  'msg': err
                }
                reject(msg)
              })
            })
          })

        }))

      })

    }))

  },


  joinOneTask: function (task, userid) {
    return new Promise((resolve, reject => {
      if (task.joiners.length >= task.maxJoiner) {
        let msg = {
          'result': null,
          'msg': 'join a task:error',
          'errMsg': 'the task already has max number of joiner'
        }
        reject(msg);
      } else {
        let joiners = task.joiners;
        joiners.push(userid);
        mydb.updateOneTaskByTaskId(task._id, {
          'joiners': joiners
        }, (result => {
          if (result.stats.updated == 1) {
            let msg = {
              'result': result.stats.updated,
              'msg': 'joiner a task:ok',
              'errMsg': null
            }
            task.joiners = joiners;
            resolve(msg);
          } else {
            let msg = {
              'result': null,
              'msg': 'joiner a task:error',
              'errMsg': 'error in db'
            }
            reject(msg);
          }
        }))
      }
    }))
  },
  verifyOneTask: function (task, user) {
    return new Promise((resolve, reject) => {
      if (task.publish.publiser != user._id) {
        let msg = {
          'result': null,
          'msg': 'verify a task:error',
          'errMsg': 'error in db'
        }
        reject(msg);
      } else {
        let upTask = new Promise((resolve, reject => {
          mydb.updateOneTaskByTaskId(task._id, {
            'state': 'doing'
          }, (result) => {
            if (result.stats.updated == 1) {
              let msg = {
                'result': result.stats.updated,
                'msg': 'update a task:ok',
                'errMsg': null
              }
              resolve(msg);
            } else {
              let msg = {
                'result': null,
                'msg': 'update a task:error',
                'errMsg': 'error in db'
              }
              reject(msg);
            }
          })
        }));

        let upUser = new Promise((resolve, reject => {
          mydb.updateOneUserByUserId(user._id, {
            'balance': user.balance - task.payment
          }, (result) => {
            if (result.stats.updated == 1) {
              let msg = {
                'result': result.stats.updated,
                'msg': 'update a task:ok'
              }
              resolve(msg);
            } else {
              let msg = {
                'result': null,
                'msg': 'update a task:error'
              }
              reject(msg);
            }
          })
        }));

        Promise.all([upTask, upUser]).then((res) => {
          let msg = {
            'result': task._id,
            'msg': 'varify a task:ok',
            'errMsg': null
          }
          resolve(msg);
        }).catch((rej) => {
          let msg = {
            'result': null,
            'msg': 'varify a task:error',
            'errMsg': 'error in db'
          }
          reject(msg);
        })

      }
    })
  }


}

function isVaildUserForm(user) {
  return true
}

function isVaildTaskForm(user) {
  return true
}
