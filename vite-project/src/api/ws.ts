/*
 * @Author: xiewenhao
 * @Date: 2023-03-01 16:58:10
 * @LastEditTime: 2023-03-01 17:13:20
 * @Description:
 */
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import { onMounted, onUnmounted, ref } from "vue";
import { baseURL } from "@/utils/request";
import { useRoute } from "vue-router";
import { useUserStore } from "@/store";

const store = useUserStore();
const route = useRoute();

let ws: Socket;

onMounted(()=>{

})

onUnmounted(()=>{
    ws.close()
})