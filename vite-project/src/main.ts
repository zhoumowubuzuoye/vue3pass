/*
 * @Author: xiewenhao
 * @Date: 2023-02-13 11:12:07
 * @LastEditTime: 2023-03-03 16:45:02
 * @Description:
 */
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "virtual:svg-icons-register";
import "vant/lib/index.css";
import "@/style/main.scss";
import dayjs from "dayjs";
const app = createApp(App);
app.config.globalProperties.$Dayjs = dayjs;
app.use(router).use(store).mount("#app");
