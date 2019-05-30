<template>
  <div class="city">
    <cityList :cityGroup="cityGroup"/>
    <cityAlphabet :cities="cityGroup"/>
  </div>
</template>

<script>

import store from "@/components/store";
import cityList from "./cityList";
import cityAlphabet from "./cityAlphabet";


let pinyin = require("pinyin");
let cityData = require("./city_code.js");
cityData = cityData.dataList;

export default {
  data() {
    return {
      allCityList: [],
      cityGroup: {}
    };
  },
  components: {
    cityList,
    cityAlphabet
  },
  methods: {
    getCityList() {
      for (let i = 0; i < cityData.length; i++) {
        let province = cityData[i];
        if (province.prefix.includes("市")) {
          this.allCityList.push(province.name.replace("市", ""));
        } else {
          for (let j = 0; j < province.cities.length; j++) {
            this.allCityList.push(province.cities[j].name.replace("市", ""));
          }
        }
      }
      this.allCityList = this.allCityList.sort(function compareFunction(
        param1,
        param2
      ) {
        //return param1.localeCompare(param2);
        return pinyin.compare(param1, param2);
      });
      this.group();
      console.log(this.cityGroup);
    },
    group() {
      for (let i = 97; i <= 122; i++) {
        this.cityGroup[String.fromCharCode(i).toUpperCase()] = [];
      }
      this.cityGroup["A"].push(this.allCityList[0]);
      for (let i = 1; i < this.allCityList.length; i++) {
        let c = this.allCityList[i];
        let d = pinyin(c, {
          style: pinyin.STYLE_NORMAL
        })[0][0][0].toUpperCase();
        if (d >= "A" && d <= "Z") this.cityGroup[d].push(c);
      }
    }
  },
  created() {
    this.getCityList();
    //console.log(123123123);
  }
};
</script>
