<template>
  <div >
    <p class="title">{{ pageTitle }}</p>
    <img class="editButton" src="/static/images/edit.png" @click="updateUserInfo"/>
    <button v-bind:class="visibility" @click="saveChanges" >完成</button>
    <!-- <button class="authorize" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">授权登录</button> -->
    <div class = container>


      <div class = "div1">
        <div class = "avatar">
          <img class="userAvatar" v-bind:src=userInfo.avatarUrl background-size="cover" />
        </div>
        <div class = "info">
          <div class= "infoRow">
            <label class="lableClass">姓名: </label>
            <input type="text" id='name'  v-bind:disabled="disabled" v-model='userInfo.userName'/>
          </div>
          <p class= "infoRow">{{ '性别: ' + userInfo.gender }}</p>
          <p class= "infoRow">{{ '闲钱币: ' + userInfo.balance }}</p>
          <p class= "infoRow">{{ '诚信度: ' + userInfo.credit }}</p>
        </div>
      </div>

      <div class = "div2">
        <div class= "ps">
            <label class="lableClass">个签：</label>
            <input type="text"  v-bind:disabled="disabled" v-model='userInfo.personalStatement'/> 
        </div>
      </div> 

      <div class = "div3" >
        <button class = "unclickedTag" @click="tagButtonClicked(0)">{{userInfo.tags.name[0]}}</button>
        <button class = "unclickedTag" @click="tagButtonClicked(1)">{{userInfo.tags.name[1]}}</button>
        <button class = "unclickedTag" @click="tagButtonClicked(2)">{{userInfo.tags.name[2]}}</button>
        <button class = "unclickedTag" @click="tagButtonClicked(3)">{{userInfo.tags.name[3]}}</button>
        <button class = "unclickedTag" @click="tagButtonClicked(4)">{{userInfo.tags.name[4]}}</button>
      </div>

      

      <div class = "div4">
        <span class = "task">{{'joining:' + userInfo.tasks.joining.length}}</span>
        <span class = "task">{{'doing:' + userInfo.tasks.doing.length}}</span>
        <span class = "task">{{'finished:' + userInfo.tasks.finished.length}}</span>
        <span class = "task">{{'publish:' + userInfo.tasks.publishing.length}}</span>
        <span class = "task">{{'verified:' + userInfo.tasks.verified.length}}</span>
        <span class = "task">{{'ended:' + userInfo.tasks.ended.length}}</span>
      </div>

      
    </div>
  </div>
</template>


<script>
import { api } from "../../utils/api.js";
import store from "@/components/store";

export default {
  data () {
    return {
      pageTitle: '个人中心',
      userInfo: {
        userName: 'zjx',
        studentId: '16340301',
        avatarUrl: '/static/images/user.png',
        gender: '男',
        balance: 100,
        credit: 100,
        personalStatement: 'Hello World!',
        isVerified: false,
        tags:{
          name:['学习','维修','快递','社交','娱乐'],
          flag:['1','0','1','1','1']
        },
        index:[0,1,1],
        tasks: {
          joining:[0,1,2],
          doing:[0,1,2],
          finished:[0,1,2],
          publishing: [0,1,2],
          verified: [0],
          ended: [0],
        },
        isVerified: true,
        wechatopenid: 1,
        id:1
      },
      disabled: true,
      visibility: 'invisible',
      isEditing: false,
      
    }
  },

  methods: {
    
    updateUserInfo(){
      
      if(!this.isEditing){
        console.log("Editing...")
        this.isEditing = true;
        this.visibility = 'visible'
        this.disabled = false
      }
      else{
        return;
      }
    },

    saveChanges(){
      console.log("Save changes.")
      this.isEditing = false
      this.visibility = 'invisible'
      this.disabled = true;
      
      api
      .updateOneById("users", this.userInfo.id, 
      { 
        'personalStatement':this.userInfo.personalStatement,
        'tags':{
          'name':this.userInfo.tags.name,
          'flag':this.userInfo.tags.flag
        }})
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.warn(error);
      });

    },

    tagButtonClicked(index){
        if(this.isEditing){
          if(this.tags.flag[index] == 1){
            this.tags.flag[index] = 0
          }else{
            this.tags.flag[index] = 1
          }
        }
    },
    
    getUserInfo(){
      // 弹窗
      wx.showModal({
        title: '提示',
        content: '是否授权登陆',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

      //获取信息
      wx.getUserInfo({
        success: (res) => {
            //get userInfo incluing nickname, avatar and gender
            console.log(res.userInfo)
            
            this.userInfo.userName = res.userInfo.nickName
            this.userInfo.avatarUrl = res.userInfo.avatarUrl
            if(res.userInfo.gender == 1 ){
              this.userInfo.gender = '男'
            }else{
              this.userInfo.gender = '女'
            }
            
            //get openid
            api.getOpenId()
              .then(res => {
                console.log(res);
                this.userInfo.wechatopenid = res.result
                
                let user = {
                  'wechatopenid':this.userInfo.wechatopenid,
                  'nickName': this.userInfo.userName, 
                  'name':'realName',
                  'avatarUrl':this.userInfo.avatarUrl,
                  'studentId':this.userInfo.studentId,
                  'gender':this.userInfo.gender,
                  'tasks':{ 
                    'joining':this.userInfo.tasks.joining,
                    'doing':this.userInfo.tasks.doing,
                    'finished':this.userInfo.tasks.finished,
                    'publishing':this.userInfo.tasks.publishing,
                    'verified':this.userInfo.tasks.verified,
                    'ended':this.userInfo.tasks.ended
                  },
                  'tags':{
                    'name':this.userInfo.tags.name,
                    'flag':this.userInfo.tags.flag
                  },
                  'balance':this.userInfo.balance,
                  'isVerified': this.userInfo.isVerified,
                  'personalStatement':this.userInfo.personalStatement,
                  'credit': this.userInfo.credit
                }
                store.commit('changeUser', user)
                console.log("globalUser is :")
                console.log(store.state.user)
                
                
                //insert the new user if not existed
                api.insertOneUser(user)
                  .then(res => {
                    // console.log(res);
                  })
                  .catch(rej => {
                    // console.warn(rej);
                    //if user already exsited, query uesrInfo by wechatopenid 
                    //and init all the info with the returned message
                    api.querySomeByModel("users", {
                        'wechatopenid':this.userInfo.wechatopenid
                      })
                      .then(result => {
                        console.log(result)
                        
                        this.userInfo.id = result.result[0]._id
                        this.userInfo.userName = result.result[0].nickName
                        this.userInfo.studentId = result.result[0].studentId
                        this.userInfo.gender = result.result[0].gender
                        this.userInfo.isVerified = result.result[0].isVerified
                        this.userInfo.balance = result.result[0].balance
                        this.userInfo.credit = result.result[0].credit
                        this.userInfo.avatarUrl = result.result[0].avatarUrl
                        this.userInfo.personalStatement = result.result[0].personalStatement
                        //init tasks
                        this.userInfo.tasks.joining = result.result[0].tasks.joining
                        this.userInfo.tasks.doing = result.result[0].tasks.doing
                        this.userInfo.tasks.finished = result.result[0].tasks.finished
                        this.userInfo.tasks.publishing = result.result[0].tasks.publishing
                        this.userInfo.tasks.verified = result.result[0].tasks.verified
                        this.userInfo.tasks.ended = result.result[0].tasks.ended
                        //init tags
                        this.userInfo.tags.name = result.result[0].tags.name
                        this.userInfo.tags.flag = result.result[0].tags.flag

                        let user = {
                          'wechatopenid':this.userInfo.wechatopenid,
                          'nickName': this.userInfo.userName, 
                          'name':'realName',
                          'avatarUrl':this.userInfo.avatarUrl,
                          'studentId':this.userInfo.studentId,
                          'gender':this.userInfo.gender,
                          'tasks':{ 
                            'joining':this.userInfo.tasks.joining,
                            'doing':this.userInfo.tasks.doing,
                            'finished':this.userInfo.tasks.finished,
                            'publishing':this.userInfo.tasks.publishing,
                            'verified':this.userInfo.tasks.verified,
                            'ended':this.userInfo.tasks.ended
                          },
                          'tags':{
                            'name':this.userInfo.tags.name,
                            'flag':this.userInfo.tags.flag
                          },
                          'balance':this.userInfo.balance,
                          'isVerified': this.userInfo.isVerified,
                          'personalStatement':this.userInfo.personalStatement,
                          'credit': this.userInfo.credit
                        }
                        store.commit('changeUser', user)
                        console.log("globalUser is :")
                        console.log(store.state.user)

                      })
                      .catch(error => {
                        console.warn(error);
                      });
                  });

              })
              .catch(rej => {
                console.warn(rej);
              });

        }
      })
      
    }
  },

  created () {
    // let app = getApp()
    console.log(this.userInfo.nickName);
    this.getUserInfo();

  }
}
</script>

<style scoped>

.title{
  size: 60px;
  font-weight: bold;
  text-align: center;
}

.editButton{
  width: 40rpx;
  height: 40rpx;
  float: right;
  margin-right: 50rpx;
}

.authorize{
  width:150rpx;
  font-size: 10pt;
}
.container{
  width: 90%;
  margin: 50rpx;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.lableClass{
  float: left;
}

.div1{
  width: 100%;
  display: flex;
  flex-direction: row;
  /* margin-bottom: 20rpx; */
}

.div2{
  width: 100%;
  margin-bottom: 20rpx;
  border-top: 1px solid#DDDDDD;
}

.div3{
  width: 100%;
  margin-bottom: 20rpx;
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
  margin:10rpx;
}

.ps{
  text-align: left;
  margin: 30rpx;
}

.clickedTag{
  border: 1px solid #000;
  background: rgb(104, 204, 113);
  color: white;
  margin: 30rpx;
  width: 20%;
  float: left;
  text-align: center;
}

.unclickedTag{
  border: 1px solid #000;
  background: white;
  color: black;
  margin: 20rpx;
  width: 22%;
  height: 20%;
  float: left;
  text-align: center;
}

.task{
  width:200rpx;
  margin: 10rpx;
  float:left;
}

.invisible{
  visibility: hidden;
  width:110rpx;
  font-size: 11pt;
  color: white;
  background-color: rgb(97, 196, 97);
  margin-left: 50rpx;
  padding: 0;
  float: left;
}

.visible{
  visibility: visible;
  width:110rpx;
  font-size: 11pt;
  color: white;
  background-color: rgb(97, 196, 97);
  margin-left: 50rpx;
  padding: 0;
  float: left;
}
</style>
