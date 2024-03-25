//import Vue from "vue";
import Vue from "@/my-vue/platforms/web/entry-runtime-esm";
import "./index.css";
// import App from "./App.vue";

// 自定定义的暂时用不到 可以先注释
Vue.config.productionTip = false;

function render(h){
    return h("div",{
        style:{
            backgroundColor:"skyblue"
        }, 
    },[
        [
            h("div",{style:{color:"red"}, class:"test"},"我是第一个子元素的，是红色的，且字号为20px")
        ],
        h("div",{style:{color:"yellow"}},"我是第二个子元素的，是黄色的"),
        h("div",{style:{color:"orange"}},"我是第三个子元素的，是橘色的"),
        h("div",{style:{backgroundColor:"#f5f5f5"}},[
            h("div",{style:{color:"green"}},"我是第四个子元素的子元素，是绿色的"),
        ]),
    ]);
}
 
// new Vue({
//   render: (h) => h(App)
// }).$mount("#app");   
new Vue({
    render:render
}).$mount("#app");