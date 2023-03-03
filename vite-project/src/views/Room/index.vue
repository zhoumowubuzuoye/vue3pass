<!--
 * @Author: xiewenhao
 * @Date: 2023-03-01 15:57:41
 * @LastEditTime: 2023-03-03 17:04:19
 * @Description: 
-->
<script setup lang="ts">
import { onMounted, ref, onUnmounted, nextTick, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
import { MsgType, OrderType } from "@/enums/hospital";
import { useUserStore } from "@/store";
import ws from "@/api/ws";
import type { Message, TimeMessages } from "@/types/room";
import type { ConsultOrderItem } from "@/types/consult";
import { getConsultOrderDetail } from "@/api/consult";

import CpNavBar from "@/components/CpNavBar.vue";
import RoomStatus from "./components/RoomStatus.vue";
import RoomAction from "./components/RoomAction.vue";
import RoomMessage from "./components/RoomMessage.vue";
const router = useRouter();
const route = useRoute();
const store = useUserStore();
const list = ref<Message[]>([]);
let socket = ws(route.query.orderId as string);
const consult = ref<ConsultOrderItem>();
const { proxy }: any = getCurrentInstance();
const $Dayjs = proxy.$Dayjs;
const formatTime = (time: string) => $Dayjs(time).format("HH:mm");
onMounted(async () => {
  getConsultOrderDetail(route.query.orderId as string).then((res) => {
    consult.value = res.data;
  });
  socket.on("connect", () => {
    console.log("connect");
  });
  socket.on("err", (err) => {
    console.log(err);
  });
  socket.on("disconnect", () => {
    console.log("disconnect");
  });
  socket.on("chatMsgList", ({ data }: { data: TimeMessages[] }) => {
    const arr: Message[] = [];
    data.forEach((item, i) => {
      arr.push({
        msg: { content: item.createTime },
        msgType: MsgType.Notify,
        id: item.createTime,
        createTime: item.createTime,
      });
    });
    list.value.unshift(...arr);
  });
  socket.on("statusChange", async () => {
    const res = await getConsultOrderDetail(route.query.orderId as string);
    consult.value = res.data;
  });
  socket.on("receiveChatMsg", (event) => {
    list.value.push(event);
    nextTick().then(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  });
});

onUnmounted(() => {
  socket.close();
});

const sendText = (value: string) => {
  socket.emit("sendChatMsg", {
    from: store.user?.id,
    to: consult.value?.docInfo?.id,
    msgType: MsgType.MsgText,
    msg: { content: value },
  });
};
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="问诊室" />
    <RoomStatus
      :status="consult?.status"
      :countdown="consult?.countdown"
    ></RoomStatus>
    <room-message :list="list"></room-message>
    <RoomAction
      :disabled="consult?.status !== OrderType.ConsultChat"
      @send_text="sendText"
    ></RoomAction>
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);
  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
}
</style>
