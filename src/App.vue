<template>
  <Hello @clickParent="handleClickParent" />
</template>

<script>
import Hello from "./Hello.vue";
export default {
  components: {
    Hello,
  },
  methods: {
    handleClickParent: function () {
      console.log("handleClick==>");
    },
  },
};
</script>