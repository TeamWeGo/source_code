<template>
  <div class="city">
    <div class="gps-location">
      <div class="text-info">当前城市</div>
      <div class="cur-city-name">{{ curCity }}</div>
    </div>
    <div class="all-city">
      <div class="text-info">所有城市</div>
      <div v-for="(item,key) in cityGroup" :key="key" :ref="key" >
        <div class="small-title" :data="closure(key)">{{ data }}</div>
        <cityItem v-for="(cityname, i) in item" :key="i" :city="cityname" @click="citySelected(cityname)"/>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/components/store'
import cityItem from '@/components/cityItem'

export default {
  props: {
    //allCityList,
    cityGroup: {}
  },
  data () {
    return {
      curCity: ""
      //cityList: [],
      //cityGroup: {}
    }
  },
  components: {
    cityItem
  },
  methods: {
    citySelected (cityname) {
      store.commit('changeCity', cityname.replace("市",""));
      //this.curCity = store.state.curCity;
      wx.navigateBack();
    }
  },
  computed: {
    closure () {
      return function (key) {
        return String.fromCharCode(key);
      }
    }
  },
  created () {
    this.curCity = store.state.curCity;
  }
};
</script>

<style scoped>
.cur-city-name {
  font-size: 16px;
  margin: 10px;
}
.text-info {
  font-size: 18px;
}
.small-title {
  font-size: 12px;
  font-weight: bold;
  background: silver;
  padding-left: 10px;
}
</style>
