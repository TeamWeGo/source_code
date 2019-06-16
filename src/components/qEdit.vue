<template>
  <div id="qEdit">
    <input class="edit_input_input" placeholder="输入问题描述" type="text" v-model="edit_input_des">
    <button class="edit_input_button" hover-class="button-hover" @click="addOneInput">添加一个输入题</button>

    <input
      class="edit_singleSelect_input_one"
      placeholder="输入单选问题描述"
      type="text"
      v-model="edit_singleSelect_des"
    >
    <input
      class="edit_singleSelect_input_two"
      placeholder="输入选项描述 例如：开心;不开心;"
      type="text"
      v-model="edit_singleSelect_indes"
    >
    <button class="edit_singleSelect_button" @click="addOneSingleSelect">添加一个单选题</button>

    <input
      class="edit_multiSelect_input_one"
      placeholder="输入多选问题描述"
      type="text"
      v-model="edit_multiSelect_des"
    >
    <input
      class="edit_multiSelect_input_two"
      placeholder="输入选项描述 例如：开心;不开心;沮丧;兴奋;"
      type="text"
      v-model="edit_multiSelect_indes"
    >
    <button class="edit_multiSelect_button" @click="addOneMultiSelect">添加一个多选题</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      edit_input_des: "",
      edit_singleSelect_des: "",
      edit_singleSelect_indes: "",
      edit_multiSelect_des: "",
      edit_multiSelect_indes: ""
    };
  },
  methods: {
    addOneMultiSelect() {
      if(this.edit_multiSelect_des!=''){
        var question = {
            type: "baseMultiSelect",
            description: this.edit_multiSelect_des,
            content: [
            ]
        };
        var options = this.edit_multiSelect_indes.split(';');
        for(var i = 0;i < options.length; i++){
          if(options[i] != ""){
            question.content.push({label:options[i], result:false});
          }
        }
        this.edit_multiSelect_des = ''
        this.edit_multiSelect_indes = ''
        this.$emit("addMultiSelectQues", question);
      }
      
    },
    addOneSingleSelect() {
      if(this.edit_singleSelect_des!=''){
        var question = {
            type: "baseSingleSelect",
            description: this.edit_singleSelect_des,
            content: [
            ]
        };
        var options = this.edit_singleSelect_indes.split(';');
        for(var i = 0;i < options.length; i++){
          if(options[i] != ""){
            question.content.push({label:options[i], result:false});
          }
        }
        this.edit_singleSelect_des = ''
        this.edit_singleSelect_indes = ''
        this.$emit("addSingleSelectQues", question);
      }
      
    },
    addOneInput() {
      if(this.edit_input_des!=''){
        var question = {
            type: "baseInput",
            description: this.edit_input_des,
            content: [
              {
                result: ""
              }
            ]
        }
        this.edit_input_des = ''
        this.$emit("addInputQues", question)
      }
      
    }
  },
  components: {}
}
</script>

<style scoped>
input {
  padding-left: 15px;
  height: 24pt;
  font-size: 13pt;
  margin: 8px 15px 8px 15px;
  border-radius: 5px;
}
button {
  background-color: #1aad19;
  color: #ffffff;
  font-size: 14pt;
  margin: 8px 15px 8px 15px;
  border-radius: 5px;
}
.button-hover {
  background: #218321;
}

#qEdit {
  margin: 0rpx;
}
</style>
