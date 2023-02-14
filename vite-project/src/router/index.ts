/*
 * @Author: xiewenhao
 * @Date: 2023-02-13 13:33:21
 * @LastEditTime: 2023-02-13 16:30:29
 * @Description: 
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    component: () => import("@/views/login/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
