## user

### user object

更新日期：4.25 19:26
- User属性更改
  - 增加personalStatement属性（个性签名）
  - 增加isVerified属性（是否认证）
  - 增加credit属性
  - idle -> balance
- Task
  - name -> title
  - idlepay -> payment

更新日期：4.27 17.00
- User 属性更改
  - 增加wechatopenid （用于保存微信api 返回的用户标识）

- Task 属性更改
  - 增加 state 的选择 增加 verifying
  - 修改numberOfJoiner 为 maxJoiner 代表 最多参加的人数
  - 增加 avatarId 标识任务的封面图片的 存入数据库后得到的id


```javascript

  let User = {
   // '_id':'x',//String database main key
    'wechatopenid':'x'//
    'nickName':'x', // String every User need has unique nickName wechat name
    'avatarUrl':'x',
    'name':'X',//String real name
    'studentId':'',//String studient id
    'gender':'male|famale|*',//String
    'tasks':{ //Object the tasks which containd the user
      'published':[task._id],// String Array the tasks._id that the user published
      'finished':[task._id],//String Array the task._id that the user finished
      'doing':[task._id],//String Array the task._id that the user is doing right now
    },
    'balance':21,//Number free money coin
    'credit':100,//诚信度
    'isVerified': True,
    'personalStatement':'Hello World',
  }

  let user = {
   // '_id':'4565465',//String database main key
    'wechatopenid':'0001',
    'nickName':'蚊子', // String every User need has unique nickName wechat name
    'name':'庄蚊子',//String real name
    'studentId':'16340222',//String studient id
    'gender':'male',//String
    'tasks':{ //Object the tasks which containd the user
      'published':['2134574','56454'],// String Array the tasks that the user published
      'finished':['123','213','1231'],//String Array the tasks that the user finished
      'doing':['2134','411'],//String Array the tasks that the user is doing right now
    },
    'balance':21,//Number free money coin
    'credit':100
    'isVerified': True,
    'personalStatement':'Hello World'
  }
```

### user methods

* insertOneUser
```javascript

api.insertOneUser(user).then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.warn(error)
})

```

* queryOneUserByUserId
```javascript

api.queryOneById("users",user._id).then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.warn(error)
})
```

* updateUserByUserId
```javascript

api.updateOneById("users",user._id,{'balance':212}).then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.warn(error)
})
```


## task object
```javascript

  let Task = {
    //'_id':'x',//String database main key
    'title':'x', // String every task need a name Title
    'avatarId':'',//upload the avatar to server and get an id from the callback
    'type':'学习|生活|娱乐|',//String task type
    'description':'XXX',//String task detail description
    'state':'publishing|verifying|doing|finished',//String task state 任务发布中，任务确认中，任务执行中，任务完成
    'maxJoiner':1,//Number Max Nubmer of joiners
    'joiners':['x'],//String Array the joiners _id array
    'location':'x'
    'publish':{
      'publisher':'X',//String user._id
      'beginTime':Date,
      'endTime':Date,
    }
    'payment':200,
    'work':{
       'beginTime':Date,
       'endTime':Date,
    }

  }

  let task ={
        //'_id':'21231',//String database main key
    'title':'唱歌', // String every task need a name Title
    'avatarId':'../',//upload the avatar to server and get an id from the callback
    'type':'娱乐', //String task type
    'description':'唱一首情歌',//String task detail description
    'state':'publishing',//String task state 任务发布中，任务确认中，任务执行中，任务完成
    'maxJoiner':2,//Number Max Nubmer of joiners
    'joiners':[''],//String Array the joiners _id array
    'location':'广州中山大学'
    'publish':{
      'publisher':'X',//String user._id
      'beginTime':Date,
      'endTime':Date,
    }
    'payment':200,
    'work':{
       'beginTime':Date,
       'endTime':Date,
    }


  }

```

### task methods

* publishOneTask
创建并发布一个任务，获得任务的_id，同时更新任务的publisher的task信息，publisher获得创建的任务的id
```javascript

api.insertOneTask(task).then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.warn(error)
})

```

* updateOneTaskByTaskId
通过任务_id 更新任务的信息
```javascript

api.updateOneById("tasks",task._id,{
  'payment':256
}).then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.warn(error)
})

```

* joinOneTask
加入一个任务，第一个参数为 当前 task 信息 必须包含{ task._id，task.joiners ，task.maxJoiner}，第二个参数为 加入者的_id
```javascript
api.joinOneTask(task, user._id).then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.warn(error)
})

```

* queryOneTaskByTaskId
```javascript
api.queryOneById("tasks",task._id).then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.warn(error)
})
```

*  queryAllTasks
```javascript

api.querySomeByModel("tasks",{}).then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.warn(error)
})

```

*  queryTasksByPublisherId
```javascript

api.querySomeByModel("tasks",{
  'publish':{
    'publisher':PublisherId
  }
}).then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.warn(error)
})

```

* queryFinishedTasksByPublisherId
```javascript

api.querySomeByModel("tasks",{
  'state':'finished',
  'publish':{
    'publisher':PublisherId
  }
}).then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.warn(error)
})

```

* queryDoingTasksByPublisherId
```javascript

api.querySomeByModel("tasks",{
  'state':'doing',
  'publish':{
    'publisher':PublisherId
  }
}).then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.warn(error)
})

```

* queryPublishingTasksByPublisherId
```javascript

api.querySomeByModel("tasks",{
  'state':'publishing',
  'publish':{
    'publisher':PublisherId
  }
}).then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.warn(error)
})

```

* queryAllPublishingTasks
```javascript

api.querySomeByModel("tasks",{
  'state':'publishing'
}).then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.warn(error)
})

```
