// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await wx.cloud.downloadFile({
      fileID:event.fileID
    })
  } catch (e) {
    console.log(e)
  }
}