import Vue from "vue";
//import Vue from "@/my-vue/platforms/web/entry-runtime-esm";
import "./index.css";
import App from "./App.vue";

console.log(App);

// 自定定义的暂时用不到 可以先注释
Vue.config.productionTip = false;

function render(h){
    return h(App);
}

// new Vue({
//   render: (h) => h(App)
// }).$mount("#app");   
new Vue({
    render:render
}).$mount("#app");