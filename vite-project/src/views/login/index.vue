<!--
 * @Author: xiewenhao
 * @Date: 2023-02-13 13:36:44
 * @LastEditTime: 2023-02-13 16:53:23
 * @Description: 
-->
<template>
  <div>
    <slide-verify
    :l="42"
    :r="10"
    :w="360"
    :h="155"
    slider-text="拖动左边滑块完成上方拼图"
    @success="onSuccess"
    @fail="onFail"
  >
  </slide-verify>
  </div>
  
</template>
<script lang="ts" setup>
import SlideVerify from "vue-monoplasty-slide-verify";
const onSuccess = () => {
  console.log("滑块验证通过");
};
const onFail = () => {
  console.log("滑块验证不通过");
};
</script>
<style scoped lang="scss"></style>
