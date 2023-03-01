<!--
 * @Author: xiewenhao
 * @Date: 2023-03-01 15:57:41
 * @LastEditTime: 2023-03-01 16:49:18
 * @Description: 
-->
<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import CpNavBar from "@/components/CpNavBar.vue";
import RoomStatus from "./components/RoomStatus.vue";
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
const router = useRouter();
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
