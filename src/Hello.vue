<template>
  <div>
    <span style="color: red" @click="handleClick">
      {{ num }}
    </span> 
    <div>{{ msg }}</div>
  </div>
</template>
 
 <script> 
 
 export default ({
  data:function(){
    return {
      num:0,
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
 