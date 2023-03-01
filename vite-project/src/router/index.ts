/*
 * @Author: xiewenhao
 * @Date: 2023-02-13 13:33:21
 * @LastEditTime: 2023-03-01 16:23:42
 * @Description:
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({
  showSpinner: false,
});
export const routes: Array<RouteRecordRaw> = [
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
          title: "首页",
          icon: "index",
        },
      },
      {
        path: "/article",
        component: () => import("@/views/Article/index.vue"),
        meta: {
          title: "健康百科",
          icon: "article",
        },
      },
      {
        path: "/notify",
        component: () => import("@/views/Notify/index.vue"),
        meta: {
          title: "消息中心",
          icon: "notice",
        },
      },
      {
        path: "/user",
        component: () => import("@/views/User/index.vue"),
        meta: {
          title: "我的",
          icon: "mine",
        },
      },
    ],
  },
  {
    path: "/user/patient",
    component: () => import("@/views/User/PatientPage.vue"),
    meta: { title: "家庭档案" },
  },
  {
    path: "/consult/fast",
    component: () => import("@/views/Consult/ConsultFast.vue"),
    meta: {
      title: "极速问诊",
    },
  },
  {
    path: "/consult/dep",
    component: () => import("@/views/Consult/ConsultDep.vue"),
    meta: { title: "选择科室" },
  },
  {
    path: "/consult/illness",
    component: () => import("@/views/Consult/ConsultIllness.vue"),
    meta: { title: "病情描述" },
  },
  {
    path: "/consult/pay",
    component: () => import("@/views/Consult/ConsultPay.vue"),
    meta: { title: "问诊支付" },
  },
  {
    path: '/room',
    component: () => import('@/views/Room/index.vue'),
    meta: { title: '问诊室' },
    beforeEnter(to) {
      if (to.query.payResult === 'false') return '/home'
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  NProgress.start();
  const store = useUserStore();
  const whiteList = ["/login"];
  if (!store.user?.token && !whiteList.includes(to.path)) return "/login";
});

router.afterEach((to) => {
  NProgress.done();
  document.title = to.meta.title || "";
});
export default router;
