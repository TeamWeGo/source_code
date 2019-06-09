/* eslint-disable standard/no-callback-literal */
/* eslint-disable space-before-function-paren */
import { mydb } from "./mydb.js";

export var api = {
  /**
   * insert a user in server
   * @param {Object} user user object
   */
  insertOneUser: function (user) {
    return new Promise((resolve, reject) => {
      if (!isVaildUserForm(user)) {
        let msg = {
          result: null,
          msg: "insert a user:error",
          errMsg: "user is not valid"
        };
        reject(msg);
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
            wx.cloud
              .callFunction({
                name: "insertOne",
                data: {
                  colName: "users",
                  data: user
                }
              })
              .then(result => {
                let msg = {
                  result: result.result._id,
                  msg: "insert a user:ok",
                  errMsg: null
                };
                resolve(msg);
              })
              .catch(err => {
                let msg = {
                  result: null,
                  msg: "insert a user:error",
                  errMsg: err
                };
                reject(msg);
              });
          } else {
            let msg = {
              result: null,
              msg: "insert a user:error",
              errMsg: "user has already in db"
            };
            reject(msg);
          }
        })
        .catch(err => {
          let msg = {
            result: null,
            msg: "insert a user:error",
            errMsg: err
          };
          reject(msg);
        });
    });
  },

  insertOne: function (colName, data) {
    return new Promise((resolve, reject) => {
      wx.cloud
        .callFunction({
          name: "insertOne",
          data: {
            colName: colName,
            data: data
          }
        }).then((result) => {
          let msg = {
            result: result.result._id,
            msg: "insert a user:ok",
            errMsg: null
          };
          resolve(msg);
        }).catch(err => {
          let msg = {
            result: null,
            msg: "insert a user:error",
            errMsg: err
          };
          reject(msg);
        });
    })
  },

  /**
   * querysome
   * @param {string} colName table
   * @param {object} queryInfo query object
   */
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
                result: result.result.data,
                msg: "query all user:ok",
                errMsg: null
              };
              resolve(msg);
            } else {
              let msg = {
                result: null,
                msg: "query all user:error",
                errMsg: "query error in db "
              };
              reject(msg);
            }
          } else {
            let msg = {
              result: null,
              msg: "query all user:error",
              errMsg: "error in db"
            };
            reject(msg);
          }
        });
    });
  },

  /**
   * query one doc by id
   * @param {String} colName table name
   * @param {String} _id _id
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
                result: result.result.data,
                msg: "query a user:ok",
                errMsg: null
              };
              resolve(msg);
            } else {
              let msg = {
                result: null,
                msg: "query a user:error",
                errMsg: "error in db"
              };
              reject(msg);
            }
          } else {
            let msg = {
              result: null,
              msg: "query a user:error",
              errMsg: "error in db"
            };
            reject(msg);
          }
        });
    });
  },

  /**
   * update a doc by id
   * @param {String} colName table
   * @param {string} _id _id
   * @param {Object} updateInfo update object
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
              result: result.stats.updated,
              msg: "update a user:ok",
              errMsg: null
            };
            resolve(msg);
          } else {
            let msg = {
              result: null,
              msg: "update a user:error",
              errMsg: "error in db"
            };
            reject(msg);
          }
        });
    });
  },
  /**
   * publish a task and update publiser
   * @param {Object} task task
   */
  publishOneTask: async function (task) {
    let user;
    let p1 = new Promise((resolve, reject) => {
      wx.cloud
        .callFunction({
          name: "insertOne",
          data: {
            colName: "tasks",
            data: task
          }
        })
        .then(result => {
          task._id = result.result._id;
          resolve(task);
        });
    });

    let p2 = new Promise((resolve, reject) => {
      wx.cloud
        .callFunction({
          name: "queryOne",
          data: {
            colName: "users",
            _id: task.publish.publisher
          }
        })
        .then(result => {
          resolve(result.result.data[0]);
        });
    });

    return new Promise((resolve, reject) => {
      Promise.all([p1, p2]).then(res => {
        // console.log(res);
        user = res[1];

        if (user.balance - task.payment * task.maxJoiner > 0) {
          let publishing = user.tasks.publishing;
          publishing.push(task._id);

          let updateInfo = {
            tasks: {
              publishing: publishing
            }
          };
          wx.cloud
            .callFunction({
              name: "updateOne",
              data: {
                colName: "users",
                _id: user._id,
                updateInfo: updateInfo
              }
            })
            .then(result => {
              if (result && result.result.stats.updated == 1) {
                let msg = {
                  result: task._id,
                  msg: "publish a task:ok",
                  errMsg: null
                };
                resolve(msg);
              } else {
                let msg = {
                  result: null,
                  msg: "publish a task:error",
                  errMsg: "insert to db error"
                };
                reject(msg);
              }
            })
            .catch(err => {
              wx.cloud
                .callFunction({
                  name: "deleteOne",
                  data: {
                    colName: "tasks",
                    _id: task._id
                  }
                })
                .then(result => {
                  let msg = {
                    result: null,
                    msg: "publish a task:error",
                    errMsg: err
                  };
                  reject(msg);
                });
            });
        } else {
          wx.cloud
            .callFunction({
              name: "deleteOne",
              data: {
                colName: "tasks",
                _id: task._id
              }
            })
            .then(result => {
              let msg = {
                result: null,
                msg: "publish a task:error",
                errMsg: "user.balance - task.payment*task.maxJoiner <0"
              };
              reject(msg);
            });
        }
      });
    });
  },

  /**
   *
   * @param {object} task task object
   * @param {object} user user object
   */
  joinOneTask: function (task, user) {
    return new Promise((resolve, reject) => {
      if (task.joiners.length >= task.maxJoiner || task.state != "publishing") {
        let msg = {
          result: null,
          msg: "join a task:error",
          errMsg: "the task already has max number of joiner || task.state != publishing"
        };
        reject(msg);
      } else {
        wx.cloud
          .callFunction({
            name: "queryOne",
            data: {
              colName: "users",
              _id: user._id
            }
          })
          .then(result => {
            user = result.result.data[0];
            var joiners = task.joiners;
            joiners.push(user._id);
            var joining = user.tasks.joining;
            joining.push(task._id);

            let p1 = wx.cloud.callFunction({
              name: "updateOne",
              data: {
                colName: "tasks",
                _id: task._id,
                updateInfo: {
                  joiners: joiners
                }
              }
            });

            let p2 = wx.cloud.callFunction({
              name: "updateOne",
              data: {
                colName: "users",
                _id: user._id,
                updateInfo: {
                  tasks: {
                    joining: joining
                  }
                }
              }
            });

            Promise.all([p1, p2])
              .then(result => {
                let resultP1 = result[0];
                let resultP2 = result[1];
                if (
                  result &&
                  resultP1.result.stats.updated == 1 &&
                  resultP2.result.stats.updated == 1
                ) {
                  let msg = {
                    result: 1,
                    msg: "joiner a task:ok",
                    errMsg: null
                  };
                  task.joiners = joiners;
                  user.tasks.joining = joining;
                  resolve(msg);
                } else {
                  let msg = {
                    result: null,
                    msg: "joiner a task:error",
                    errMsg: "the joiner has joined the task"
                  };
                  reject(msg);
                }
              })
              .catch(err => {
                let msg = {
                  result: null,
                  msg: "joiner a task:error",
                  errMsg: err
                };
                reject(msg);
              });
          });
      }
    });
  },
  /**
   * publisher verify a task
   * @param {object} task task object
   * @param {object} publisher user object
   */
  verifyOneTask: function (task, publisher) {
    return new Promise((resolve, reject) => {
      wx.cloud
        .callFunction({
          name: "queryOne",
          data: {
            colName: "users",
            _id: publisher._id
          }
        })
        .then(result => {
          publisher = result.result.data[0];
          if (
            task.publish.publisher != publisher._id || task.state != "publishing" ||
            publisher.balance - task.payment * task.joiners.length < 0
          ) {
            let msg = {
              result: null,
              msg: "verify a task:error",
              errMsg:
                "error in db || publisher.balance - task.payment * task.joiners.length < 0 || task.state != publishing "
            };
            reject(msg);
          } else {
            let upTask = new Promise((resolve, reject) => {
              wx.cloud
                .callFunction({
                  name: "updateOne",
                  data: {
                    colName: "tasks",
                    _id: task._id,
                    updateInfo: {
                      state: "doing"
                    }
                  }
                })
                .then(result => {
                  if (result && result.result.stats.updated == 1) {
                    resolve();
                  } else {
                    let msg = {
                      result: null,
                      msg: "update a task:error",
                      errMsg: "error in db"
                    };
                    reject(msg);
                  }
                });
            });

            let upPubliser = new Promise((resolve, reject) => {
              let verifyed = publisher.tasks.verifyed;
              verifyed.push(task._id);
              let publishing = publisher.tasks.publishing;
              let i = publishing.indexOf(task._id);
              publishing.splice(i, 1);
              wx.cloud
                .callFunction({
                  name: "updateOne",
                  data: {
                    colName: "users",
                    _id: publisher._id,
                    updateInfo: {
                      balance:
                        publisher.balance - task.payment * task.joiners.length,
                      tasks: {
                        verifyed: verifyed,
                        publishing: publishing
                      }
                    }
                  }
                })
                .then(result => {
                  if (result.result.stats.updated == 1) {
                    resolve();
                  } else {
                    let msg = {
                      result: null,
                      msg: "update a task:error",
                      errMsg: "error in db"
                    };
                    reject(msg);
                  }
                });
            });

            let upJoiners = task.joiners.map((joinerId, idx) => {
              return new Promise((resolve, reject) => {
                wx.cloud
                  .callFunction({
                    name: "queryOne",
                    data: {
                      colName: "users",
                      _id: joinerId
                    }
                  })
                  .then(result => {
                    let temUser = result.result.data[0];
                    let joining = temUser.tasks.joining;
                    let doing = temUser.tasks.doing;
                    if (joining.indexOf(task._id) == -1) {
                      let msg = {
                        result: null,
                        msg: "find a task:error",
                        errMsg: "joining has no id"
                      };
                      reject(msg);
                    } else {
                      let i = joining.indexOf(task._id);
                      joining.splice(i, 1);
                      doing.push(task._id);

                      wx.cloud
                        .callFunction({
                          name: "updateOne",
                          data: {
                            colName: "users",
                            _id: joinerId,
                            updateInfo: {
                              tasks: {
                                doing: doing,
                                joining: joining
                              }
                            }
                          }
                        })
                        .then(result => {
                          if (result && result.result.stats.updated == 1) {
                            resolve();
                          }
                        })
                        .catch(err => {
                          let msg = {
                            result: null,
                            msg: "find a task:error",
                            errMsg: err
                          };
                          reject(msg);
                        });
                    }
                  })
                  .catch(err => {
                    let msg = {
                      result: null,
                      msg: "find a task:error",
                      errMsg: err
                    };
                    reject(msg);
                  });
              });
            });

            Promise.all([upTask, upPubliser, upJoiners])
              .then(res => {
                let msg = {
                  result: task._id,
                  msg: "varify a task:ok",
                  errMsg: null
                };
                resolve(msg);
              })
              .catch(err => {
                let msg = {
                  result: null,
                  msg: "varify a task:error",
                  errMsg: err
                };
                reject(msg);
              });
          }
        });
    });
  },

  /**
   * publisher end a task
   * @param {object} task task object
   * @param {object} publisher user object
   */
  endOneTask: function (task, publisher) {
    return new Promise((resolve, reject) => {
      wx.cloud
        .callFunction({
          name: "queryOne",
          data: {
            colName: "users",
            _id: publisher._id
          }
        })
        .then(result => {
          publisher = result.result.data[0];
          if (
            task.publish.publisher != publisher._id || task.state != "doing" ||
            publisher.balance - task.payment * task.joiners.length < 0
          ) {
            let msg = {
              result: null,
              msg: "end a task:error",
              errMsg:
                "error in db || publisher.balance - task.payment * task.joiners.length < 0 || task.state != doing "
            };
            reject(msg);
          } else {
            let upTask = new Promise((resolve, reject) => {
              wx.cloud
                .callFunction({
                  name: "updateOne",
                  data: {
                    colName: "tasks",
                    _id: task._id,
                    updateInfo: {
                      state: "finished"
                    }
                  }
                })
                .then(result => {
                  if (result && result.result.stats.updated == 1) {
                    resolve();
                  } else {
                    let msg = {
                      result: null,
                      msg: "update a task:error",
                      errMsg: "error in db"
                    };
                    reject(msg);
                  }
                });
            });

            let upPubliser = new Promise((resolve, reject) => {
              let verifyed = publisher.tasks.verifyed;
              let ended = publisher.tasks.ended;

              let i = verifyed.indexOf(task._id);
              verifyed.splice(i, 1);
              ended.push(task._id);
              wx.cloud
                .callFunction({
                  name: "updateOne",
                  data: {
                    colName: "users",
                    _id: publisher._id,
                    updateInfo: {
                      tasks: {
                        verifyed: verifyed,
                        ended: ended
                      }
                    }
                  }
                })
                .then(result => {
                  if (result.result.stats.updated == 1) {
                    resolve();
                  } else {
                    let msg = {
                      result: null,
                      msg: "update a task:error",
                      errMsg: "error in db"
                    };
                    reject(msg);
                  }
                });
            });

            let upJoiners = task.joiners.map((joinerId, idx) => {
              return new Promise((resolve, reject) => {
                wx.cloud
                  .callFunction({
                    name: "queryOne",
                    data: {
                      colName: "users",
                      _id: joinerId
                    }
                  })
                  .then(result => {
                    let temUser = result.result.data[0];
                    let finished = temUser.tasks.finished;
                    let doing = temUser.tasks.doing;
                    if (doing.indexOf(task._id) == -1) {
                      let msg = {
                        result: null,
                        msg: "find a task:error",
                        errMsg: "doing has no id"
                      };
                      reject(msg);
                    } else {
                      let i = doing.indexOf(task._id);
                      doing.splice(i, 1);
                      finished.push(task._id);

                      wx.cloud
                        .callFunction({
                          name: "updateOne",
                          data: {
                            colName: "users",
                            _id: temUser._id,
                            updateInfo: {
                              balance: temUser.balance + task.payment,
                              tasks: {
                                doing: doing,
                                finished: finished
                              }
                            }
                          }
                        })
                        .then(result => {
                          if (result && result.result.stats.updated == 1) {
                            resolve();
                          }
                        })
                        .catch(err => {
                          let msg = {
                            result: null,
                            msg: "find a task:error",
                            errMsg: err
                          };
                          reject(msg);
                        });
                    }
                  })
                  .catch(err => {
                    let msg = {
                      result: null,
                      msg: "find a task:error",
                      errMsg: err
                    };
                    reject(msg);
                  });
              });
            });

            Promise.all([upTask, upPubliser, upJoiners])
              .then(res => {
                let msg = {
                  result: task._id,
                  msg: "end a task:ok",
                  errMsg: null
                };
                resolve(msg);
              })
              .catch(err => {
                let msg = {
                  result: null,
                  msg: "end a task:error",
                  errMsg: err
                };
                reject(msg);
              });
          }
        });
    });
  },

  /**
   * publisher delete a task before verifyed
   * @param {object} task task object
   * @param {object} publisher user object
   */
  deleteOneTask: function (task, publisher) {
    return new Promise((resolve, reject) => {
      wx.cloud
        .callFunction({
          name: "queryOne",
          data: {
            colName: "users",
            _id: publisher._id
          }
        })
        .then(result => {
          publisher = result.result.data[0];
          if (
            task.publish.publisher != publisher._id ||
            task.state != "publishing"
          ) {
            let msg = {
              result: null,
              msg: "delete a task:error",
              errMsg:
                "error in db || the task is not publishing"
            };
            reject(msg);
          } else {
            let upTask = new Promise((resolve, reject) => {
              wx.cloud
                .callFunction({
                  name: "deleteOne",
                  data: {
                    colName: "tasks",
                    _id: task._id,

                  }
                })
                .then(result => {
                  if (result && result.result.stats.updated == 1) {
                    resolve();
                  } else {
                    let msg = {
                      result: null,
                      msg: "delete a task:error",
                      errMsg: "error in db"
                    };
                    reject(msg);
                  }
                });
            });

            let upPubliser = new Promise((resolve, reject) => {
              let publishing = publisher.tasks.publishing;
              let i = publishing.indexOf(task._id);
              publishing.splice(i, 1);

              wx.cloud
                .callFunction({
                  name: "updateOne",
                  data: {
                    colName: "users",
                    _id: publisher._id,
                    updateInfo: {
                      tasks: {
                        publishing: publishing,

                      }
                    }
                  }
                })
                .then(result => {
                  if (result.result.stats.updated == 1) {
                    resolve();
                  } else {
                    let msg = {
                      result: null,
                      msg: "update a task:error",
                      errMsg: "error in db"
                    };
                    reject(msg);
                  }
                });
            });

            let upJoiners = task.joiners.map((joinerId, idx) => {
              return new Promise((resolve, reject) => {
                wx.cloud
                  .callFunction({
                    name: "queryOne",
                    data: {
                      colName: "users",
                      _id: joinerId
                    }
                  })
                  .then(result => {
                    let temUser = result.result.data[0];
                    let joining = temUser.tasks.joining;

                    if (joining.indexOf(task._id) == -1) {
                      let msg = {
                        result: null,
                        msg: "find a task:error",
                        errMsg: "doing has no id"
                      };
                      reject(msg);
                    } else {
                      let i = joining.indexOf(task._id);
                      joining.splice(i, 1);

                      wx.cloud
                        .callFunction({
                          name: "updateOne",
                          data: {
                            colName: "users",
                            _id: temUser._id,
                            updateInfo: {
                              tasks: {
                                joining: joining,
                              }
                            }
                          }
                        })
                        .then(result => {
                          if (result && result.result.stats.updated == 1) {
                            resolve();
                          }
                        })
                        .catch(err => {
                          let msg = {
                            result: null,
                            msg: "find a task:error",
                            errMsg: err
                          };
                          reject(msg);
                        });
                    }
                  })
                  .catch(err => {
                    let msg = {
                      result: null,
                      msg: "find a task:error",
                      errMsg: err
                    };
                    reject(msg);
                  });
              });
            });

            Promise.all([upTask, upPubliser, upJoiners])
              .then(res => {
                let msg = {
                  result: task._id,
                  msg: "delete a task:ok",
                  errMsg: null
                };
                resolve(msg);
              })
              .catch((err) => {
                let msg = {
                  result: null,
                  msg: "delete a task:error",
                  errMsg: err
                };
                reject(msg);
              });
          }
        });
    });
  },

  getOpenId: function () {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'getOpenId',
      }).then((result) => {

        console.log(result);

        let msg = {
          result: result.result.userInfo.openId,
          msg: "get open id :ok",
          errMsg: null
        };
        resolve(msg);
      }).catch((err) => {
        let msg = {
          result: null,
          msg: "get open id :error",
          errMsg: err
        };
        reject(msg);
      })
    })
  }
};

function isVaildUserForm(user) {
  return true;
}

function isVaildTaskForm(user) {
  return true;
}
