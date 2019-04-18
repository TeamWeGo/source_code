<template>
  <div>
    <p class="ttt">{{ txt }}</p>
  </div>
</template>


<script>
import { mydb } from '../../utils/mydb.js'
import { api } from '../../utils/api.js'
export default {
  data() {
    return {
      txt: '社区'
    }
  },

  created() {
    // let app = getApp()

  },
  methods: {
    // insert(){
    //   let user = {
    //     'name':'z1h',
    //     'billing':1000
    //   }
    //   api.insertOneUser(user).then((res)=>{
    //     console.log(res)
    //   }).catch((rej)=>{
    //     console.warn(rej)
    //   })
    // },
    // query(){
    //  api.queryUsersByUserName('zhang').then((res)=>{
    //     console.log(res)
    //   }).catch((rej)=>{
    //     console.warn(rej)
    //   })
    // }
  },
}
</script>

<style scoped>
.ttt {
  size: 50px;
}
</style>
