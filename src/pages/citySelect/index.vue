<template>
  <div class="all">
    <div class="gps-location">
      <div class="text-info">定位城市</div>
      <div class="cur-city-name">{{ curCity }}</div>
    </div>
    <div class="all-city">
      <p>所有城市</p>
      <cityItem v-for="(item,index) in cityList" :key="index" :city="item"/>
    </div>
  </div>
</template>

<script>
import cityItem from '@/components/cityItem'
let pinyin = require("pinyin")

let cityData = require('./city_code.js');
cityData = cityData.dataList;

export default {
  data () {
    return {
      curCity: "深圳",
      cityList: []
    }
  },
  components: {
    cityItem
  },
  methods: {
    getCityList () {
      for(let i = 0; i < cityData.length; i++){
        let province = cityData[i];
        if(province.prefix.includes("市")){
          this.cityList.push(province.name.replace("市",""));
        }else{
          for(let j = 0; j < province.cities.length; j++){
            this.cityList.push(province.cities[j].name.replace("市",""));
          }
        }
      }
      this.cityList = this.cityList.sort(
        function compareFunction(param1,param2){
          //return param1.localeCompare(param2);
          return pinyin.compare(param1, param2);
        }
      )
      //console.log(this.cityList);
    }
  },
  onLoad: function(options) {
    this.curCity = options.city;
    //console.log(this.curCity);
  },
  created () {
    this.getCityList();
  }
}
</script>


<style scoped>
.cur-city-name {
  font-size: 20px;
}
</style>
