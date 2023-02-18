<!--
 * @Author: xiewenhao
 * @Date: 2023-02-14 15:06:53
 * @LastEditTime: 2023-02-17 10:54:05
 * @Description: 
-->
<template>
  <van-nav-bar
    fixed
    :left-arrow="leftShow"
    :title="title"
    :right-text="rightText"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  ></van-nav-bar>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, computed } from 'vue'

const router = useRouter()
const route = useRoute()
const props = defineProps<{
  title?: string
  rightText?: string
  back?: Function
}>()
const emit = defineEmits<{
  (e: 'click-right', val: string): void
}>()

const isshow = (path: string): boolean => {
  return route.path !== path
}
const leftShow = computed(() => {
  return isshow('/login')
})
const onClickLeft = () => {
  // TODO 点击左侧返回按钮
  router.back()
}
const onClickRight = () => {
  emit('click-right', '点击')
  // TODO 点击右侧文字按钮
}
</script>
<style scoped lang="scss">
:deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
    }
  }
}
</style>
