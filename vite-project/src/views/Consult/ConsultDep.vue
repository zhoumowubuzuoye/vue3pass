<!--
 * @Author: xiewenhao
 * @Date: 2023-02-24 15:00:54
 * @LastEditTime: 2023-02-27 13:09:53
 * @Description: 
-->
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAllDep } from "@/api/consult";
import type { SubDep, TopDep } from "@/types/consult";
import { computed } from "@vue/reactivity";
import { useConsultStor } from "@/store";

import CpNavBar from "@/components/CpNavBar.vue";

const store = useConsultStor();
const depList = ref<TopDep[]>([]);
const active = ref(0);

onMounted(() => {
  getDepList();
});
const subDep = computed(() => {
  return depList.value[active.value]?.child;
});
const getDepList = () => {
  getAllDep().then((res) => {
    depList.value = res.data;
  });
};
</script>

<template>
  <div class="consult-dep-page">
    <cp-nav-bar title="选择科室" />
    <div class="wrapper">
      <van-sidebar v-model="active">
        <van-sidebar-item
          :title="item.name"
          v-for="item in depList"
          :key="item.id"
        />
      </van-sidebar>
      <div class="sub-dep">
        <router-link
          to="/consult/illness"
          v-for="item in subDep"
          :key="item?.id"
          @click="store?.setDep(item.id)"
          >{{ item?.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.van-sidebar {
  width: 114px;
  &-item {
    padding: 14px;
    color: var(--cp-tag);
    &--select {
      color: var(--cp-main);
      font-weight: normal;
      &::before {
        display: none;
      }
    }
  }
}
.consult-dep-page {
  padding-top: 46px;
  .wrapper {
    height: calc(100vh - 46px);
    overflow: hidden;
    display: flex;
    .sub-dep {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      > a {
        display: block;
        padding: 14px 30px;
        color: var(--cp-dark);
      }
    }
  }
}
</style>
