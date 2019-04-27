<template>
  <div class="all">
    <div class="gps-location">
      <div class="text-info">当前城市</div>
      <div class="cur-city-name">{{ curCity }}</div>
    </div>
    <div class="all-city">
      <div class="text-info">所有城市</div>
      <div v-for="(item,index) in cityList" :key="index" >
        <div class="small-title">{{ key }}</div>
        <cityItem v-for="(cityname, i) in item" :key="i" :city="cityname" />
      </div>
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
      curCity: "",
      cityList: [],
      cityGroup: {}
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
      this.group()
      console.log(this.cityGroup);
    },
    group () {
      for(let i = 97; i <= 122; i++){
        this.cityGroup[i] = [];
      }
      this.cityGroup[97].push(this.cityList[0]);
      for(let i = 1; i < this.cityList.length; i++){
        c = this.cityList[i];
        this.cityGroup[ pinyin(c, {style: pinyin.STYLE_NORMAL}
                            )[0][0][0].charCodeAt() ].push(c);
      }
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
