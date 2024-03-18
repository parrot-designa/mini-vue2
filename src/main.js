import Vue from "vue";
import App from "./App.vue";

// 自定定义的暂时用不到 可以先注释
// Vue.config.productionTip = false;

// new Vue({
//   render: (h) => h(App)
// }).$mount("#app");
new Vue({
    render:(h)=>h('div',{},"hello mini-vue2")
}).$mount("#app");