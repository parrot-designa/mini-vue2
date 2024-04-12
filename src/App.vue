<template>
  <div>
    <button @click.once="handleClick($event)">测试once</button>
    <button @click.passive="handleClick">测试passive</button>
    <button @click.capture="handleClick">测试capture</button>
  </div>
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