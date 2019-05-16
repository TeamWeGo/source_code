// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  event.data.createTime = db.serverDate();
  try {
    return await db.collection(event.colName).add({
      data:event.data,
    })
  } catch (e) {
    console.log(e)
  }
}