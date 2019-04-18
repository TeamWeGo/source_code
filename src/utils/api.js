/* eslint-disable standard/no-callback-literal */
/* eslint-disable space-before-function-paren */
import { mydb } from './mydb.js'
export var api = {
  queryUsersByUserName: function (username) {
    return new Promise((res, rej) => {
      mydb.queryOneUserByUserName(username, function (err, result) {
        if (result.data.length != 0) {
          res(result)
        } else {
          rej('no query')
        }
      })

    })
  },
  insertOneUser: function (user) {
    return new Promise((res, rej) => {
      mydb.queryOneUserByUserName(user.name, function (err, result) {
        if (result.data.length != 0) {
          rej(result + 'already has')
        } else {
          mydb.insertOneUser(user, function (err, result) {
            if (result && !err) {
              res('insert ok' + result)
            } else {
              rej('insert error')
            }
          })
        }
      })

    })
  }

}

function vaildUserForm(user) {
  return true
}
