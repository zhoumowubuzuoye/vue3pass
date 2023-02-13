/*
 * @Author: xiewenhao
 * @Date: 2023-02-13 13:33:21
 * @LastEditTime: 2023-02-13 16:30:29
 * @Description: 
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/index",
    component: () => import("@/views/index.vue"),
    name: "Index",
    meta:{
      title:'首页'
    }
  },
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
