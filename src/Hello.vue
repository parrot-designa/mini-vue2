<template>
  <div>
    <span style="color: red" @click="handleClick">
      <div>{{ num }}</div>
      <div>{{ num2 }}</div>
    </span> 
    <div>{{ msg }}</div>
  </div>
</template>
 
 <script> 
 
 export default ({
  data:function(){
    return {
      num:0,
      num2:2,
      msg:"hello"
    }
  },
  methods:{
    handleClick:function(){ 
      this.num += 1;
    }
  }
 })
 </script>
 