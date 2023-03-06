<!--
 * @Author: xiewenhao
 * @Date: 2023-03-06 16:36:15
 * @LastEditTime: 2023-03-06 17:13:00
 * @Description: 
-->
<script setup lang="ts">
import { ConsultType } from "@/enums/hospital";
import { getConsultOrderList } from "@/api/consult";
import type { ConsultOrderItem, ConsultOrderListParams } from "@/types/consult";
import { ref } from "vue";
import ConsultItem from "./ConsultItem.vue";

const props = defineProps<{
  type: ConsultType;
}>();
const params = ref<ConsultOrderListParams>({
  type: props.type,
  current: 1,
  pageSize: 5,
});
const loading = ref(false);
const finished = ref(false);
const list = ref<ConsultOrderItem[]>([]);
const onLoad = () => {
  getConsultOrderList(params.value).then((res) => {
    list.value.push(...res.data.rows);
    if (params.value.current < res.data.pageTotal) {
      params.value.current++;
    } else {
      finished.value = true;
    }
    loading.value = false
  });
};
</script>

<template>
  <div class="consult-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ConsultItem
        v-for="item in list"
        :key="item.id"
        :item="item"
      ></ConsultItem>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.consult-list {
  padding: 10px 15px;
}
</style>
