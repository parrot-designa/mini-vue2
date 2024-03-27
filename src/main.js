//import Vue from "vue";
import Vue from "@/my-vue/platforms/web/entry-runtime-esm";
import "./index.css";
import App from "./App.vue";

console.log(App);

// 自定定义的暂时用不到 可以先注释
Vue.config.productionTip = false;

function render(h){
    return h('div',{class:"app2"},'hello world');
}
 
const test2=Vue.extend({
    render:function(h){
        return h('div','hello world2');
    }
});
setTimeout(()=>{
    new test2().$mount(".app2")
})

// new Vue({
//   render: (h) => h(App)
// }).$mount("#app");   
new Vue({
    render:render
}).$mount("#app");