<template>
  <div class="padding">
    <div>
      <el-button @click="add('+',1)">+</el-button>
      <el-button @click="add('-',1)">-</el-button>
      <el-button @click="add('*',1)">*</el-button>
      <el-button @click="add('/',1)">/</el-button>
      <el-button @click="add('(',2)">(</el-button>
      <el-button @click="add(')',3)">)</el-button>
      <el-button @click="add('^',4)">x^y</el-button>
      <el-button @click="add('√',5)">x√y</el-button>
      <el-button @click="add('log',6)">log(x,y)</el-button>
      <el-button @click="add('input',7)">选择字段</el-button>
      <el-button @click="del('del',8)">Del</el-button>
    </div>
    <div class="container padding">
      <div v-for="(item,index) in structureList" :key="index">
        <div class="border margin-lf-xs" v-if="item.type == 1">{{item.code}}</div>
        <div class="border margin-lf-xs" v-if="item.type == 2">{{item.code}}</div>
        <div class="border margin-lf-xs" v-if="item.type == 3">{{item.code}}</div>
        <el-input v-if="item.type == 4" v-model="item.value"></el-input>
      </div>
    </div>
    <div>
      {{realString}}
    </div>
  </div>
</template>
<script>
export default {
  name:'CharacteristicStructure',
  data () {
    return {
      structureList:[],

    }
  },
  watch:{
    structureList(value){
      this.realString = value
    }
  },
  methods: {
     add(code,type){
       this.structureList.push({code,type})
     },
     del(){
       this.structureList.splice(this.structureList.length-1,1)
     }
  }
}
</script>
<style scoped lang="scss">
  .padding{
    padding: 20px;
  }
  .margin-lf-xs{
    margin: 0 4px;
  } 
  .border{
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
  }
   .container{
     display: flex;
   }
</style>