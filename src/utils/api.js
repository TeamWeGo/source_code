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
      mydb.queryOneUserByUserWeChatOpenId(user.wechatopenid, function (result) {
        if (result.data.length != 0) {

          let msg = {
            'result': null,
            'msg': 'insert a user:error',
            'errMsg': 'user has already in db'
          }
          reject(msg)
        } else {
          mydb.insertOneUser(user, function (result) {
            if (result._id) {
              let msg = {
                'result': result._id,
                'msg': 'insert a user:ok',
                'errMsg': null
              }
              resolve(msg)
            } else {
              let msg = {
                'result': null,
                'msg': 'insert a user:error',
                'errMsg': 'user insert  db error'
              }
              reject(msg)
            }
          })
        }
      })

    })
  },
  queryAllUsers: function () {
    return new Promise((resolve, reject) => {
      mydb.queryAllUsers((result) => {
        if (result) {
          if (result.data.length != 0) {
            let msg = {
              'result': result.data,
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
        if (result) {
          if (result.data.length != 0) {
            let msg = {
              'result': result.data,
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
      })
    })
  },
  /**
   * publish a task and update publiser
   * @param {Object} task task
   */
  publishOneTask: async function (task) {
    let user;
    let error;
    await new Promise((resolve, reject) => {
      if (!isVaildTaskForm(task)) {
        let msg = {
          'result': null,
          'msg': 'publish a task:error',
          'errMsg': 'task is no valid'
        }
        reject(msg)
      }
      mydb.insertOneTask(task, (result) => {
        if (result._id) {
          resolve(result);
        }
        else {
          let msg = {
            'result': null,
            'msg': 'insert a task:error',
            'errMsg': 'error in db'
          }
          reject(msg)

        }
      });
    }).then((result) => {
      task._id = result._id;
    }).catch((ref) => {
      error = ref;
    });
    await new Promise((resolve, reject) => {
      mydb.queryOneUserByUserId(task.publish.publisher, (result) => {
        if (result) {
          if (result.data.length != 0) {
            let msg = {
              'result': result.data,
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
      });
    }).then((result) => {
      user = result.result;
    }).catch((ref) => {
      error = ref;
    });;

    return new Promise((resolve, reject) => {

      if (error) {
        mydb.deleteOneTaskByTaskId(task._id, (result) => {
          let msg = {
            'result': null,
            'msg': 'insert a task:error',
            'msg': error
          }
          reject(msg)
        })
      }
      let publishs = user.tasks.published;
      publishs.push(task._id);
      if (user.balance - task.payment < 0) {
        mydb.deleteOneTaskByTaskId(task._id, (result) => {
          let msg = {
            'result': null,
            'msg': 'insert a task:error',
            'msg': 'user.balance - task.payment < 0'
          }
          reject(msg)
        })
      } else {
        let updateInfo = {
          'tasks': {
            'published': publishs
          }
        };
        mydb.updateOneUserByUserId(user._id, updateInfo, (result) => {
          if (result.stats.updated == 1) {
            let msg = {
              'result': task._id,
              'msg': 'insert a task:ok',
              'errMsg': null
            }
            resolve(msg);
          }
          else {
            let msg = {
              'result': null,
              'msg': 'insert a task:error',
              'errMsg': 'error in db'
            }
            mydb.deleteOneTaskByTaskId(task._id, (result) => {
              reject(msg)
            })
          }
        });
      }
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
    })

  },
  queryOneTaskByTaskId: function (id) {
    return new Promise((resolve, reject) => {
      mydb.queryOneTaskByTaskId(id, (result) => {
        if (result.data.length != 0) {
          let msg = {
            'result': result.data,
            'msg': 'query a task:ok',
            'errMsg': null
          }
          resolve(msg);
        } else {
          let msg = {
            'result': null,
            'msg': 'query a task:error',
            'errMsg': 'error in db'
          }
          reject(msg);
        }
      })
    })
  },
  // queryAllTasksByPublisherId: function (publisherId) {
  //   return new Promise((resolve, reject) => {
  //     mydb.queryTasksByPublisherId(publisherId, (result) => {
  //       if (result) {
  //         if (result.data.length != 0) {
  //           let msg = {
  //             'result': result.data,
  //             'msg': 'query a task:ok'
  //           }
  //           resolve(msg);
  //         } else {
  //           let msg = {
  //             'result': null,
  //             'msg': 'query a task:error'
  //           }
  //           reject(msg);
  //         }
  //       } else {
  //         let msg = {
  //           'result': null,
  //           'msg': 'query a task:error'
  //         }
  //         reject(msg);
  //       }
  //     })
  //   })
  // },

  // queryFinishedTasksByPublisherId: function (publisherId) {
  //   return new Promise((resolve, reject) => {
  //     mydb.queryTasksModule({
  //       state: "finished",
  //       publish: {
  //         publiser: publisherId
  //       }
  //     }, (result) => {
  //       if (result.data.length != 0) {
  //         let msg = {
  //           'result': result.data,
  //           'msg': 'query a task:ok'
  //         }
  //         resolve(msg);
  //       } else {
  //         let msg = {
  //           'result': null,
  //           'msg': 'query a task:error'
  //         }
  //         reject(msg);
  //       }
  //     })
  //   })
  // },
  queryTasksByModel: function (model) {
    return new Promise((resolve, reject) => {
      mydb.queryTasksModel(model, (result) => {
        if (result.data.length != 0) {
          let msg = {
            'result': result.data,
            'msg': 'query a task:ok',
            'errMsg': null
          }
          resolve(msg);
        } else {
          let msg = {
            'result': null,
            'msg': 'query a task:error',
            'errMsg': 'error in db'
          }
          reject(msg);
        }
      })
    })
  },
  // queryAllTasks: function () {
  //   return new Promise((resolve, reject) => {
  //     mydb.queryAllTasks((result) => {
  //       if (result) {
  //         if (result.data.length != 0) {
  //           let msg = {
  //             'result': result.data,
  //             'msg': 'query a task:ok'
  //           }
  //           resolve(msg);
  //         } else {
  //           let msg = {
  //             'result': null,
  //             'msg': 'query a task:error'
  //           }
  //           reject(msg);
  //         }
  //       } else {
  //         let msg = {
  //           'result': null,
  //           'msg': 'query a task:error'
  //         }
  //         reject(msg);
  //       }
  //     })
  //   })
  // },
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
