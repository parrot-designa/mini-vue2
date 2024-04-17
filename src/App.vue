<template>
  <Hello @clickParent="handleClickParent('Hello')" />
</template>

<script>
import Hello from "./Hello.vue";
export default {
  components: {
    Hello,
  }, 
  methods: {
    handleClickParent: function (value, value1) {
      console.log("handleClickParent==>", value, value1);
    },
  },
};
</script>