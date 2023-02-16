/*
 * @Author: xiewenhao
 * @Date: 2023-02-13 13:33:21
 * @LastEditTime: 2023-02-16 13:51:48
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
  {
    path: "/",
    redirect: "/home",
    component: () => import("@/views/Layout/index.vue"),
    children: [
      {
        path: "/home",
        component: () => import("@/views/Home/index.vue"),
        meta: {
          icon: "index",
        },
      },
      {
        path: "/article",
        component: () => import("@/views/Article/index.vue"),
        meta: {},
      },
      {
        path: "/notify",
        component: () => import("@/views/Notify/index.vue"),
        meta: {},
      },
      {
        path: "/user",
        component: () => import("@/views/User/index.vue"),
        meta: {},
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
