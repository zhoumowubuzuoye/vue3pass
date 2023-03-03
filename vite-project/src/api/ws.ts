/*
 * @Author: xiewenhao
 * @Date: 2023-03-01 16:58:10
 * @LastEditTime: 2023-03-02 13:21:34
 * @Description:
 */
import { io } from "socket.io-client";
import { baseURL } from "@/utils/request";
import { useUserStore } from "@/store";

const store = useUserStore();

const ws = (id: string) =>
  io(baseURL, {
    auth: {
      token: `Bearer ${store.user?.token}`,
    },
    query: {
      orderId: id,
    },
  });
export default ws;
