<template>
  <span style="color: red" @click="handleClick">{{ num }}</span>
</template>
 
 <script> 
 
 export default ({
  data:function(){
    return {
      num:0
    }
  },
  methods:{
    handleClick:function(){
      console.log(this.num);
      this.num += 1;
    }
  }
 })
 </script>
 