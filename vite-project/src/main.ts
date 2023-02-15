/*
 * @Author: xiewenhao
 * @Date: 2023-02-13 11:12:07
 * @LastEditTime: 2023-02-14 10:09:58
 * @Description: 
 */
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import 'virtual:svg-icons-register'
import 'vant/lib/index.css'

createApp(App).use(router).use(store).mount("#app");
