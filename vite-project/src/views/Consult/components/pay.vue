<!--
 * @Author: xiewenhao
 * @Date: 2023-02-28 10:31:10
 * @LastEditTime: 2023-03-01 10:44:26
 * @Description: 
-->
<template>
  <van-action-sheet
    :show="show"
    title="请选择支付方式1"
    @update:show="updateShow($event)"
  >
    <div class="pay-type">
      <p class="amount">￥{{ payInfo.actualPayment.toFixed(2) }}</p>
      <van-cell-group>
        <van-cell title="微信支付" @click="paymentMethod = 0">
          <template #icon><cp-icon name="consult-wechat" /></template>
          <template #extra
            ><van-checkbox :checked="paymentMethod === 0"
          /></template>
        </van-cell>
        <van-cell title="支付宝支付" @click="paymentMethod = 1">
          <template #icon><cp-icon name="consult-alipay" /></template>
          <template #extra
            ><van-checkbox :checked="paymentMethod === 1"
          /></template>
        </van-cell>
      </van-cell-group>
      <div class="btn">
        <van-button type="primary" round block @click="submit"
          >立即支付</van-button
        >
      </div>
    </div>
  </van-action-sheet>
</template>
<script lang="ts" setup>
import type { ConsultOrderPreData } from "@/types/consult";
import { createConsultOrder } from "@/api/consult";
import { useConsultStor } from "@/store";
import CpIcon from "@/components/CpIcon.vue";

import { ref } from "vue";
import { isNumber } from "lodash";
import { Toast } from "vant";
const props = defineProps<{
  show: boolean;
  payInfo: ConsultOrderPreData;
}>();
const emit = defineEmits<{
  (update, value: boolean): void;
}>();
const store = useConsultStor();
const loading = ref(false);
const paymentMethod = ref<0 | 1>();
const orderId = ref("");

const updateShow = (e) => {
  emit("update", e);
};
const submit = () => {
  if (!isNumber(paymentMethod.value)) return Toast("请选择支付方式");
  loading.value = true;
  createConsultOrder(store.consult).then((res) => {
    orderId.value = res.data.id;
    loading.value = false;
    store.clear();
    emit("update", false);
  });
};
</script>
<style scoped lang="scss">
.pay-type {
  .amount {
    padding: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .btn {
    padding: 15px;
  }
  .van-cell {
    align-items: center;
    .cp-icon {
      margin-right: 10px;
      font-size: 18px;
    }
    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
  }
}
</style>
