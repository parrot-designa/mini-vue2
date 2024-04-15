<template>
  <span style="color: red" @click="handleClick" @test1="handleClick"
    >hello2</span
  >
</template>
 
 <<script>
 
 
 export default ({
  methods:{
    handleClick:function(){
      console.log("handleClick==>");
    }
  }
 })
 </script>
 