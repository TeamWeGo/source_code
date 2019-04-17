<template>
  <div class="mission-main">
      <div class="mission-toolbar">
        <div class="weui-search-bar">
          <div class="weui-search-bar__form">
            <div class="weui-search-bar__box">
              <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
              <input
                type="text"
                class="weui-search-bar__input"
                placeholder="搜索"
                v-model="inputVal"
                :focus="inputShowed"
                @input="inputTyping"
              >
              <div class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
                <icon type="clear" size="14"></icon>
              </div>
            </div>
            <label class="weui-search-bar__label" :hidden="inputShowed" @click="showInput">
              <icon class="weui-icon-search" type="search" size="14"></icon>
              <div class="weui-search-bar__text">搜索</div>
            </label>
          </div>
          <div class="weui-search-bar__cancel-btn" :hidden="!inputShowed" @click="hideInput">取消</div>
        </div>
        <div class="weui-cells searchbar-result" v-if="inputVal.length > 0">
          <navigator url class="weui-cell" hover-class="weui-cell_active">
            <div class="weui-cell__bd">
              <div>实时搜索文本</div>
            </div>
          </navigator>
          <navigator url class="weui-cell" hover-class="weui-cell_active">
            <div class="weui-cell__bd">
              <div>实时搜索文本</div>
            </div>
          </navigator>
          <navigator url class="weui-cell" hover-class="weui-cell_active">
            <div class="weui-cell__bd">
              <div>实时搜索文本</div>
            </div>
          </navigator>
          <navigator url class="weui-cell" hover-class="weui-cell_active">
            <div class="weui-cell__bd">
              <div>实时搜索文本</div>
            </div>
          </navigator>
        </div>
      </div>
    <div class="mission-list">
      <div class="mission-list-item" v-for="(item, index) in missionlist" :key="index">
        <image class="mission-list-item-image" :src="item.image" ></image>
        <div class="mission-list-item-word">
          <ul>
            <li class="mission-list-item-title">{{item.title}}</li>
            <li>
              <span class="mission-list-item-time">{{item.time}}</span>
              <span class="mission-list-item-location">{{item.location}}</span>
            </li>
            <li class="mission-list-item-intro">{{item.intro}}</li>
            <li class="mission-list-item-price">
              <span>{{item.price}}</span>
              <span>闲钱币</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      missionlist: [
        {
          image: '../../../static/images/user.png',
          title: '取快递',
          time: '2019-4-16 15:34',
          location: '至善园',
          intro: '从丰巢三号柜取快递送到至善园二号',
          price: '30'
        },
        {
          image: '../../../static/images/user.png',
          title: '陪打农药',
          time: '2019-4-16 15:34',
          location: '至善园',
          intro: '从王者一星打到百星王者',
          price: '10000'
        }
      ],
      inputShowed: false,
      inputVal: ''
    }
  },
  methods: {
    showInput () {
      this.inputShowed = true
    },
    hideInput () {
      this.inputVal = ''
      this.inputShowed = false
    },
    clearInput () {
      this.inputVal = ''
    },
    inputTyping (e) {
      console.log(e)
      this.inputVal = e.mp.detail.value
    }
  }
}
</script>

<style>
.mission-toolbar {
}

.site {
  width: 25%;
  text-align: center;
}

.mission-search {
  display: flex;
}

.mission-add {
  width: 15%;
  text-align: center;
}

.mission-list {
  margin: 30rpx;
}

.mission-list-item {
  height: auto;
  overflow: hidden;
}

.mission-list-item-image {
  width: 30%;
  max-height: 200rpx;
  float: left;
}

.mission-list-item-word {
  width: 70%;
  float: right;
  font-size: 35rpx;
}

.mission-list-item-title {
  font-size: 40rpx;
  font-weight: bold;
}

.mission-list-item-time {
  margin-right: 30rpx;
}

.mission-list-item-price {
  float: right;
}
</style>