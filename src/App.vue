<template>
  <button>测试</button>
</template>

<script>
export default {
  data(){
    return {
      a:"hello"
    }
  },
  methods:{
    handleClick:function(val){
      console.log("handleClick==>",val);
    }
  }
}
</script>