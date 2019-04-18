<template>
  <div >
    <p class="title">{{ pageTitle }}</p>
    <div class = container>

      <div class = "div1">
        <div class = "avatar">
          <img class="userAvatar" src="/static/images/user.png" background-size="cover" />
        </div>
        <div class = "info">
          <p class= "infoRow">{{ '姓名: ' + userInfo.userName }}</p>
          <p class= "infoRow">{{ '闲钱币: ' + userInfo.balance }}</p>
          <p class= "infoRow">{{ '诚信度: ' + userInfo.credit }}</p>
        </div>
      </div>

      <div class = "div2">
        <p class="ps">{{ "个签：" + userInfo.personalStatement}} </p>
      </div>

      <div class = "div3">
        <span class = "tag">{{tags[0]}}</span>
        <span class = "tag">{{tags[1]}}</span>
        <span class = "tag">{{tags[2]}}</span>
        <span class = "tag">{{tags[3]}}</span>
        <span class = "tag">{{tags[4]}}</span>

      </div>

      <div class = "div4">
        <span class = "task">{{'进行中：' + tasks.active}}</span>
        <span class = "task">{{'已发布：' + tasks.published}}</span>
        <span class = "task">{{'已完成：' + tasks.completed}}</span>
      </div>

    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      pageTitle: '个人中心',
      userInfo: {
        userName: 'zjx',
        avatarUrl: '/static/images/user.png',
        balance: 100,
        credit: 99,
        personalStatement: 'Hello World!'
      },
      tags: ['学习', '维修', '快递', '社交', '娱乐'],
      tasks: {
        active: 1,
        published: 0,
        completed: 1
      }
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>

.title{
  size: 60px;
  font-weight: bold;
  text-align: center;
}

.container{
  width: 90%;
  margin: 50rpx;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.div1{
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 50rpx;
}

.div2{
  width: 100%;
  margin-bottom: 50rpx;
  border-top: 1px solid#DDDDDD;
}

.div3{
  width: 100%;
  margin-bottom: 50rpx;
  border-top: 1px solid #DDDDDD;
}

.div4{
  width: 100%;
  border-top: 1px solid #DDDDDD;
  padding-top: 30rpx;
}

.avatar{
  width: 35%;
  
  margin: 30rpx;
}

.userAvatar{
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.info{
  width:45%;
  display: flex;
  flex-direction: column;
  margin: 30rpx;
  border-left: 1px solid #DDDDDD;
}

.infoRow{
  margin:20rpx;
}

.ps{
  text-align: left;
  margin: 30rpx;
}

.tag{
  border: 1px solid #000;
  margin: 30rpx;
  width: 20%;
  float: left;
  text-align: center;
}

.task{
  margin: 30rpx;
}

</style>
