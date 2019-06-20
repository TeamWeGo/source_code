<template>
  <div class="questionnaire">
    <div class="modalMask" v-if="isModel"></div>
    <div class="modalDialog" v-if="changeModel">
      <div class="modalContent">
        <div class="question" v-if="type=='简答'">
          <p class="title">简答题</p>
          <input class="qtitle" name="简答" v-model="title" placeholder="请输入问题的标题">
        </div>
        <div class="question" v-if="type=='单选'">
          <p class="title">单选题</p>
          <input class="qtitle" name="单选" v-model="title" placeholder="请输入问题的标题">
          <div class="selectionList" v-for="(item, index) in selections" :key="index">
            <img class="icon" mode="widthFix" src="/static/images/question/单选.png">
            <input class="selection" v-model="selections[index]" placeholder="输入选项描述">
            <img
              class="icon"
              mode="widthFix"
              src="/static/images/question/delete.png"
              @click="deleteselection(index)"
            >
          </div>
          <img
            class="icon"
            mode="widthFix"
            src="/static/images/question/add.png"
            @click="addselection"
          >
        </div>
        <div class="question" v-if="type=='多选'">
          <p class="title">多选题</p>
          <input class="qtitle" name="多选" v-model="title" placeholder="请输入问题的标题">
          <div class="selectionList" v-for="(item, index) in selections" :key="index">
            <img class="icon" mode="widthFix" src="/static/images/question/多选.png">
            <input class="selection" v-model="selections[index]" placeholder="输入选项描述">
            <img
              class="icon"
              mode="widthFix"
              src="/static/images/question/delete.png"
              @click="deleteselection(index)"
            >
          </div>
          <img
            class="icon"
            mode="widthFix"
            src="/static/images/question/add.png"
            @click="addselection"
          >
        </div>
      </div>
      <div class="modalFooter">
        <div class="btnCancel" @tap="tapCancel">取消</div>
        <div class="btnConfirm" @tap="confirmSend">确定</div>
      </div>
    </div>
    <div class="type">
      <div v-for="(item, index) in types" :key="index" v-on:click="typeclick(index)">
        <circleCard v-bind:text="item.text" v-bind:imgSrc="item.imgSrc"/>
      </div>
    </div>
  </div>
</template>


<script>
import circleCard from "@/components/logs/circleCard";

export default {
  components: {
    circleCard
  },
  props: {
    type: "onechoice"
  },
  data() {
    return {
      changeModel: false,
      isModel: false,
      types: [
        {
          text: "简答",
          imgSrc: "/static/images/question/简答题.png"
        },
        {
          text: "单选",
          imgSrc: "/static/images/question/单选题.png"
        },
        {
          text: "多选",
          imgSrc: "/static/images/question/多选题.png"
        },
        {
          text: "自定义",
          imgSrc: "/static/images/info.png"
        }
      ],
      title: "",
      selections: [],
      question: {
        type: "",
        title: "",
        selections: []
      }
    };
  },
  methods: {
    show() {
      this.changeModel = !this.changeModel;
      this.isModel = !this.isModel;
    },
    tapCancel() {
      this.show();
      this.$emit("confirmSend", "cancel!");
    },

    confirmSend() {
      this.question.type = this.type;
      this.question.title = this.title;
      this.question.selections = this.selections;
      var obj = JSON.stringify(this.question);
      this.show();
      this.$emit("confirmSend", obj);
    },
    typeclick(index) {
      this.title = "";
      this.selections = [];
      console.log(this.types[index].text);
      this.type = this.types[index].text;
      this.show();
    },
    addselection() {
      this.selections.push("");
      console.log(this.selections);
    },
    deleteselection(e) {
      console.log(e);
      this.selections.splice(e, 1);
      console.log(this.selections);
    }
  }
};
</script>

<style scoped>
.questionnaire {
  width: 100%;
  height: 100%;
}
.modalMask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
  overflow: hidden;
  z-index: 9000;
  color: #fff;
}
.modalDialog {
  box-sizing: border-box;
  width: 80%;
  height: 60%;
  overflow: hidden;
  position: fixed;
  top: 20%;
  left: 10%;
  z-index: 9999;
  background: #fff;
  border-radius: 8px;
}
.modalContent {
  box-sizing: border-box;
  display: flex;
  padding: 5%;
  font-size: 20px;
  align-items: center;
  flex-direction: column;
  height: 80%;
  padding-left: 10%;
  padding-right: 10%;
}
.contentTip {
  text-align: center;
  font-size: 14px;
  color: #333333;
}
.modalFooter {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  border-top: 1px solid #e5e5e5;
  font-size: 26px;
  height: 20%;
}
.btnCancel {
  padding: 20rpx;
  width: 50%;
  font-size: 26px;
  color: #333;
  text-align: center;
  border-right: 1px solid #e5e5e5;
}
.btnConfirm {
  padding: 20rpx;
  font-size: 26px;
  width: 50%;
  color: #508cee;
  text-align: center;
}
.type {
  width: 100%;
  height: 20%;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.question {
  height: 100%;
  width: 100%;
  overflow: scroll;
}

.title {
  text-align: center;
  padding-bottom: 4%;
}

.qtitle {
  height: auto;
}

.icon {
  height: 50rpx;
  width: 60rpx;
}

.selectionList {
  display: flex;
  flex-direction: row;
  padding: 1%;
  overflow: scroll;
  align-items: center;
}

.selection {
  margin-left: 10rpx;
  margin-right: 10rpx;
}
</style>
