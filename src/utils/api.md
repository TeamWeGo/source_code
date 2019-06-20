## user

### user object

更新日期：4.25 19:26

* User 属性更改
  * 增加 personalStatement 属性（个性签名）
  * 增加 isVerified 属性（是否认证）
  * 增加 credit 属性
  * idle -> balance
* Task
  * name -> title
  * idlepay -> payment

更新日期：4.27 17.00

* User 属性更改

  * 增加 wechatopenid （用于保存微信 api 返回的用户标识）
  * 增加 tasks->joining （用于保存 用户加入任务的 id，该任务还在发布中）
  * 更改 tasks-> published 改为 tasks->publishing
  * 增加 tasks-> ended （发布者 已经结束的任务）
  * 增加 tasks-> verified （发布者 已经确认的任务 还没有完成）

* Task 属性更改
  * 增加 state 的选择 增加 verifying
  * 修改 numberOfJoiner 为 maxJoiner 代表 最多参加的人数
  * 增加 avatarId 标识任务的封面图片的 存入数据库后得到的 id

更新日期：5.10 16.12

* Task 属性更改
  * 增加 isQuestionnaire 发布的任务是否是调查问卷
  * 增加 questionnaireId 调查问卷的 id
* Questionnaire 属性更改
  * 增加 Questionnaire 代表调查哦问卷
  * 增加 template 代表 调查问卷的模板，是一个 array 类型
  * 增加 title 代表 调查问卷的标题
  * 增加 description 代表 调查问卷的简述
  * 增加 results 代表 每一份调查问卷的结果，是一个 array 类型，其中每一个结果都是 template 的实例
  * 增加 maxCount 代表 调查问卷最多需要多少份

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
      'joining':[task._id]//Strng Array the tasl._id that the user is joining the task and task has not verifed
      'doing':[task._id],//String Array the task._id that the user is doing right now
      'finished':[task._id],//String Array the task._id that the user finished

      'publishing':[task._id],// String Array the tasks._id that the publihser published
      'verified':[task._id]//Strng Array the tasl._id that the publish task has  verifed not end
      'ended':[task._id]//Strng Array the tasl._id that the publish task has  verifed and end
    },
    'balance':21,//Number free money coin
    'credit':100,//诚信度
    'isVerified': true,
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
api
  .insertOneUser(user)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.warn(error);
  });
```

* queryOneUserByUserId

```javascript
api
  .queryOneById("users", user._id)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.warn(error);
  });
```

* updateUserByUserId

```javascript
api
  .updateOneById("users", user._id, { balance: 212 })
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.warn(error);
  });
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
  'isQuestionnaire':true,
    'questionnaireId':X,
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
  创建并发布一个任务，获得任务的\_id，同时更新任务的 publisher 的 task 信息，publisher 获得创建的任务的 id

````javascript
api.publishOneTask(task).then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.warn(error)
})

```javascript
api
  .insertOneTask(task)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.warn(error);
  });
````

* updateOneTaskByTaskId
  通过任务\_id 更新任务的信息

```javascript
api
  .updateOneById("tasks", task._id, {
    payment: 256
  })
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.warn(error);
  });
```

* joinOneTask
  加入一个任务，第一个参数为 当前 task 信息 必须包含{ task.\_id，task.joiners ，task.maxJoiner}，第二个参数为 加入者的\_id

```javascript
api
  .joinOneTask(task, user._id)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.warn(error);
  });
```

* verifyOneTask
  奶牛确认任务，任务开始执行，并从奶牛的账户中扣除闲钱币。第一个参数未当前 task 信息 必须包含{ task.\_id，task.joiners ，task.maxJoiner task.payment, task.publish.publisher}，第二个参数 为 publisher 发布者信息，必须包含{user.\_id}

```javascript
api
  .verifyOneTask(task, user._id)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.warn(error);
  });
```

* endOneTask
  奶牛结束任务，任务结束，参加者获得闲钱币。第一个参数未当前 task 信息 必须包含{ task.\_id，task.joiners ，task.maxJoiner task.payment, task.publish.publisher}，第二个参数 为 publisher 发布者信息，必须包含{user.\_id}

```javascript
api
  .verifyOneTask(task, user._id)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.warn(error);
  });
```

* queryOneTaskByTaskId

```javascript
api
  .queryOneById("tasks", task._id)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.warn(error);
  });
```

* queryAllTasks

```javascript
api
  .querySomeByModel("users", {
    'wechatopenid':
  })
  .then(result => {
    console.log(result);

  })
  .catch(error => {
    console.warn(error);
  });
```

* queryTasksByPublisherId

```javascript
api
  .querySomeByModel("tasks", {
    publish: {
      publisher: PublisherId
    }
  })
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.warn(error);
  });
```

* queryFinishedTasksByPublisherId

```javascript
api
  .querySomeByModel("tasks", {
    state: "finished",
    publish: {
      publisher: PublisherId
    }
  })
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.warn(error);
  });
```

* queryDoingTasksByPublisherId

```javascript
api
  .querySomeByModel("tasks", {
    state: "doing",
    publish: {
      publisher: PublisherId
    }
  })
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.warn(error);
  });
```

* queryPublishingTasksByPublisherId

```javascript
api
  .querySomeByModel("tasks", {
    state: "publishing",
    publish: {
      publisher: PublisherId
    }
  })
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.warn(error);
  });
```

* queryAllPublishingTasks

```javascript
api
  .querySomeByModel("tasks", {
    state: "publishing"
  })
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.warn(error);
  });
```

## questionnaires object

```javascript
  let task = {
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
    },
    'isQuestionnaire':true,
    'questionnaireId':X,
  }

  let questionnaire ={
    //'_id'
    'title':xx,
    'description':xx,
    'maxCount':50,
    'template':[
      {
        'type':Input,
        'description':'你的学号',
        'content':'',
      },
      {'type':SingleSelect,
      'description':'是否喜欢xx',
      'content':{
        '是':false,
        '否':false,
      }
      },
      {
        'type':MultiSelect,
        'description':'以下哪一个代表你现在的心情',
        'content':{
          '开心':false,
          '沮丧':false,
          '感激':false
        }
      }
    ],
    'results':[
      [
         {
        'type':Input,
        'description':'你的学号',
        'content':'16666',
      },
      {'type':SingleSelect,
      'description':'是否喜欢xx',
      'content':{
        '是':true,
        '否':false,
      }
      },
      {
        'type':MultiSelect,
        'description':'以下哪一个代表你现在的心情',
        'content':{
          '开心':true,
          '沮丧':false,
          '感激':true
        }
      }
      ],[
         {
        'type':Input,
        'description':'你的学号',
        'content':'12333',
      },
      {'type':SingleSelect,
      'description':'是否喜欢xx',
      'content':{
        '是':false,
        '否':true,
      }
      },
      {
        'type':MultiSelect,
        'description':'以下哪一个代表你现在的心情',
        'content':{
          '开心':false,
          '沮丧':true,
          '感激':false
        }
      }
      ]
    ]
  }
```

## tool methods

* getOpenId

```javascript
api
  .getOpenId()
  .then(res => {
    console.log(res);

    res 的数据结构 {
          result: xxxx,
          msg: "get open id :ok",
          errMsg: null
        };

  })
  .catch(rej => {
    console.warn(rej);
    或
 rej 的数据结构 {
          result: null,
          msg: "get open id :error",
          errMsg: xxx
        };
  });
```
