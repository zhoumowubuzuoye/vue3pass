/*
 * @Author: xiewenhao
 * @Date: 2023-03-01 16:58:10
 * @LastEditTime: 2023-03-02 13:21:34
 * @Description:
 */
import { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import { onMounted, onUnmounted, ref } from "vue";
import { baseURL } from "@/utils/request";
import { useRoute } from "vue-router";
import { useUserStore } from "@/store";

const store = useUserStore();
const route = useRoute();

let ws: Socket;
console.log(route);

ws = io(baseURL, {
  auth: {
    token: `Bearer ${store.user?.token}`,
  },
  query: {
    orderId: route.query.orderId,
  },
});
export default ws;
