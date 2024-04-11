<template>
  <button @click="handleClick">测试</button>
</template>

<script>
export default {
  methods:{
    handleClick:function(val){
      console.log("handleClick==>",val);
    }
  }
}
</script>