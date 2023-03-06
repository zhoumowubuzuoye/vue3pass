<!--
 * @Author: xiewenhao
 * @Date: 2023-03-01 15:57:41
 * @LastEditTime: 2023-03-06 13:55:11
 * @Description: 
-->
<script setup lang="ts">
import { onMounted, ref, onUnmounted, nextTick, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
import { MsgType, OrderType } from "@/enums/hospital";
import { useUserStore } from "@/store";
import ws from "@/api/ws";
import type { Message, TimeMessages } from "@/types/room";
import type { ConsultOrderItem, Image } from "@/types/consult";
import { getConsultOrderDetail } from "@/api/consult";
import CpNavBar from "@/components/CpNavBar.vue";
import RoomStatus from "./components/RoomStatus.vue";
import RoomAction from "./components/RoomAction.vue";
import RoomMessage from "./components/RoomMessage.vue";
import dayjs from "dayjs";
import { Toast } from "vant";
const router = useRouter();
const route = useRoute();
const store = useUserStore();
const list = ref<Message[]>([]);
const initialMsg = ref(true);
let socket = ws(route.query.orderId as string);
const consult = ref<ConsultOrderItem>();
const loading = ref(false);
const { proxy }: any = getCurrentInstance();
const $Dayjs = proxy.$Dayjs;
const time = ref($Dayjs().format("YYYY-MM-DD HH:mm:ss"));
onMounted(async () => {
  getConsultOrderDetail(route.query.orderId as string).then((res) => {
    consult.value = res.data;
  });
  socket.on("connect", () => {
    console.log("connect");
    list.value = [];
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
      if (i === 0) time.value = item.createTime;
      arr.push({
        msg: { content: item.createTime },
        msgType: MsgType.Notify,
        id: item.createTime,
        createTime: item.createTime,
      });
    });
    list.value.unshift(...arr);
    loading.value = false;
    if (!data.length) {
      return Toast("没有了");
    }
    nextTick(() => {
      if (initialMsg.value) {
        socket.emit("updateMsgStatus", arr[arr.length - 1].id);
        window.scrollTo(0, document.body.scrollHeight);
        initialMsg.value = false;
      }
    });
  });
  socket.on("statusChange", async () => {
    const res = await getConsultOrderDetail(route.query.orderId as string);
    consult.value = res.data;
  });
  socket.on("receiveChatMsg", (event) => {
    list.value.push(event);
    nextTick().then(() => {
      socket.emit("updateMsgStatus", event.id);
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
const sendImage = (file: Image) => {
  socket.emit("sendChatMsg", {
    from: store.user?.id,
    to: consult.value?.docInfo?.id,
    MsgType: MsgType.MsgImage,
    msg: { picture: file },
  });
};
const onRefresh = () => {
  // 触发下拉
  socket.emit("getChatMsgList", 20, time.value, route.query.orderId);
};
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="问诊室" />
    <RoomStatus
      :status="consult?.status"
      :countdown="consult?.countdown"
    ></RoomStatus>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <room-message :list="list"></room-message>
    </van-pull-refresh>
    <RoomAction
      :disabled="consult?.status !== OrderType.ConsultChat"
      @send_text="sendText"
      @send_image="sendImage"
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
