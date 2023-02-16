<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/home"
        >首页
        <template #icon="{ active }">
          <CpIcon
            :name="`home-index-${active ? 'active' : 'default'}`"
          ></CpIcon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/article">健康百科</van-tabbar-item>
      <van-tabbar-item to="/notify">消息中心</van-tabbar-item>
      <van-tabbar-item to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import CpIcon from "@/components/CpIcon.vue";
const active = ref(0);
</script>
<style scoped lang="scss">
:deep() {
  .van-tabbar-item {
    &__icon {
      font-size: 21px;
    }
    &__text {
      font-size: 11px;
    }
    &:not(.van-tabbar-item--active) {
      color: var(--cp-text3);
    }
  }
}
</style>
