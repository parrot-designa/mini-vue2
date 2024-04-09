import Vue from "vue";
//import Vue from "@/my-vue/platforms/web/entry-runtime-esm";
import App from "./App.vue";
 
console.log(App);

function render(h){
    return h(App);
} 

new Vue({
    render:render
}).$mount("#app");