<template>
  <Hello @clickParent="handleClickParent('Hello')" />
</template>

<script>
import Hello from "./Hello.vue";
export default {
  components: {
    Hello,
  },
  data: function () {
    return {
      b: "aaa",
    };
  },
  beforeCreate: function () {
    console.log("beforeCreate==>", this);
  },
  created: function () {
    console.log("created==>", this);
  },
  methods: {
    handleClickParent: function (value, value1) {
      console.log("handleClickParent==>", value, value1);
    },
  },
};
</script>