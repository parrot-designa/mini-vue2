<template>
  <span style="color: red" @click="handleClick">hello2</span>
</template>
 
 <<script>
 
 
 export default ({
  methods:{
    handleClick:function(){
      console.log("handleClick==>");
      this.$emit("clickParent",1,2,3)
    }
  }
 })
 </script>
 