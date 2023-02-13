<!--
 * @Author: xiewenhao
 * @Date: 2023-02-13 11:12:07
 * @LastEditTime: 2023-02-13 16:26:51
 * @Description: 
-->
<script setup lang="ts">
import { useUserStore } from "@/store/modules/name";
const userStore = useUserStore();
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped lang="scss">
@import "@/style/index.scss";
</style>
<style>
body {
  margin: 0;
  height: 100%;
  width: 100%;
}
</style>
