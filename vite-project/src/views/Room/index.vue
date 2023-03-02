<!--
 * @Author: xiewenhao
 * @Date: 2023-03-01 15:57:41
 * @LastEditTime: 2023-03-02 11:21:04
 * @Description: 
-->
<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { MsgType } from "@/enums/hospital";
import ws from "@/api/ws";
import type { Message, TimeMessages } from "@/types/room";

import CpNavBar from "@/components/CpNavBar.vue";
import RoomStatus from "./components/RoomStatus.vue";
import RoomAction from "./components/RoomAction.vue";
import RoomMessage from "./components/RoomMessage.vue";
const router = useRouter();
const list = ref<Message[]>([]);

onMounted(async () => {
  ws.on("connect", () => {
    console.log("connect");
  });
  ws.on("err", (err) => {
    console.log(err);
  });
  ws.on("disconnect", () => {
    console.log("disconnect");
  });
  ws.on("chatMsgList", ({ data }: { data: TimeMessages[] }) => {
    const arr: Message[] = [];
    data.forEach((item, i) => {
      arr.push({
        msg: { content: item.createTime },
        msgType: MsgType.Notify,
        id:item.createTime,
        createTime:item.createTime,
      });
    });
  });
});

onUnmounted(() => {
  ws.close();
});
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="问诊室" />
    <RoomStatus></RoomStatus>
    <room-message></room-message>
    <RoomAction></RoomAction>
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
