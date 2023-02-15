/*
 * @Author: xiewenhao
 * @Date: 2023-02-14 11:02:27
 * @LastEditTime: 2023-02-15 09:53:30
 * @Description: 
 */
import { useUserStore } from "@/store";
import router from "@/router";
import axios, { AxiosError, type Method } from "axios";
import { Toast } from "vant";

const baseURL = "https://consult-api.itheima.net/";
const instance = axios.create({
  baseURL,
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    const store = useUserStore();
    if (store.user?.token && config.headers) {
      config.headers["Authorization"] = `Bearer ${store.user?.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => {
    if (res.data?.code !== 10000) {
      Toast(res.data?.message || "业务失败");
      return Promise.reject(res.data);
    } else {
      return res.data;
    }
  },
  (err) => {
    if (err.response.status === 401) {
      // 删除用户信息
      const store = useUserStore();
      store.delUser();
      // 跳转登录，带上接口失效所在页面的地址，登录完成后回跳使用
      router.push({
        path: "/login",
        query: { returnUrl: router.currentRoute.value.fullPath },
      });
    }
    return Promise.reject(err);
  }
);

type Data<T> = {
  code: number;
  message: string;
  data: T;
};
const request = <T>(
  url: string,
  method: Method = "get",
  submitData?: object
) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === "get" ? "params" : "data"]: submitData,
  });
};
export { baseURL, instance ,request};
