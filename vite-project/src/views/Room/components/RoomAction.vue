<!--
 * @Author: xiewenhao
 * @Date: 2023-03-01 17:30:19
 * @LastEditTime: 2023-03-06 11:00:29
 * @Description: 
-->
<script setup lang="ts">
import { ref } from "vue";
import CpIcon from "@/components/CpIcon.vue";
import type { ConsultOrderItem, Image } from "@/types/consult";
import { getConsultOrderDetail, uploadImage } from "@/api/consult";

import { Toast } from "vant";
import type { UploaderAfterRead } from "vant/lib/uploader/types";
const props = defineProps<{
  disabled: boolean;
}>();
const emit = defineEmits<{
  (e: "send_text", value: string): void;
  (e: "send_image", img: Image): void;
}>();
const text = ref("");
const sendText = () => {
  emit("send_text", text.value);
  text.value = "";
};
const sendImage = (file) => {
  console.log(file);
  const t = Toast.loading("上传中");
  uploadImage(file).then((res) => {
    console.log(res);
    t.clear();
    emit("send_image", res.data);
  });
};
</script>

<template>
  <div class="room-action">
    <van-field
      type="text"
      class="input"
      :border="false"
      placeholder="问医生"
      autocomplete="off"
      v-model="text"
      @keyup.enter="sendText"
    ></van-field>
    <van-uploader :preview-image="false" :after-read="sendImage">
      <cp-icon name="consult-img" />
    </van-uploader>
  </div>
</template>

<style lang="scss" scoped>
.room-action {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 1;
  box-sizing: border-box;
  .input {
    background-color: var(--cp-bg);
    border: none;
    border-radius: 25px;
    margin-right: 10px;
    padding: 8px 15px;
  }
  .cp-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
