## user

### user object

```javascript

  let User = {
    '_id':'x',//String database main key
    '_openid':'x'//
    'nickName':'x', // String every User need has unique nickName wechat name
    'name':'X',//String real name
    'studentId':'',//String studient id
    'gender':'male|famale|*',//String
    'tasks':{ //Object the tasks which containd the user
      'published':[task._id],// String Array the tasks._id that the user published
      'finished':[task._id],//String Array the task._id that the user finished
      'doing':[task._id],//String Array the task._id that the user is doing right now
    },
    'idlePay':21,//Number free money coin

  }

  let user = {
    '_id':'4565465',//String database main key
    '_openid':'21313'//
    'nickName':'蚊子', // String every User need has unique nickName wechat name
    'name':'庄蚊子',//String real name
    'studentId':'16340222',//String studient id
    'gender':'male',//String
    'tasks':{ //Object the tasks which containd the user
      'published':['2134574','56454'],// String Array the tasks that the user published
      'finished':['123','213','1231'],//String Array the tasks that the user finished
      'doing':['2134','411'],//String Array the tasks that the user is doing right now
    },
    'idlePay':1000,//Number free money coin



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

api.queryOneUserByUserId(user._id).then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.warn(error)
})
```

* updateUserByUserId
```javascript

api.updateUserByUserId(user._id,{'idlePay':212}).then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.warn(error)
})
```


## task object
```javascript

  let Task = {
    '_id':'x',//String database main key
    'name':'x', // String every task need a name Title
    'type':'学习|生活|娱乐|',//String task type
    'description':'XXX',//String task detail description
    'state':'publishing|doing|finished',//String task state
    'numberOfJoiner':1,//Number Max Nubmer of joiners
    'joiner':['x'],//String Array the joiners _id array
    'location':'x'
    'publish':{
      'publisher':'X',//String user._id
      'beginTime':Date,
      'endTime':Date,
    }
    'idlePay':200,
    'work':{
       'beginTime':Date,
       'endTime':Date,
    }

  }

  let task ={
        '_id':'21231',//String database main key
    'name':'唱歌', // String every task need a name Title
    'type':'娱乐',//String task type
    'description':'唱一首单身情歌',//String task detail description
    'state':'publishing',//String task state
    'numberOfJoiner':10,//Number Max Nubmer of joiners
    'joiner':[],//String Array the joiners _id array
    'location':'广州'
    'publish':{
      'publisher':'',//String user._id
      'beginTime':,
      'endTime':,
    }
    'idlePay':200,
    'work':{
       'beginTime':,
       'endTime':,
    }

  }

```

### task methods

* insertOneTask
创建一个任务，获得任务的id，同时更新任务的publisher的task信息，publisher获得创建的任务的id
```javascript

api.insertOneTask(task).then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.warn(error)
})

```

* updateOneTaskByTaskId
```javascript

api.updateTaskByTaskId(task._id,{
  'idlePay':256
}).then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.warn(error)
})

```

* queryOneTaskByTaskId
```javascript
api.queryOneTaskByTaskId(task._id).then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.warn(error)
})
```
