// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    console.log(event)
    return await db.collection(event.colName).where(event.queryInfo).orderBy('createTime', 'desc').get()
  } catch (e) {
    console.log(e)
  }
}
