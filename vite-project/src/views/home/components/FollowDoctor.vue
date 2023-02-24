<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getDoctorPage } from "@/api/consult";
import { PageParams } from "@/types/page";
import type { DoctorList } from "@/types/consult";
import { useWindowSize } from "@vueuse/core";
import DoctorCard from "./DoctorCard.vue";
const { width } = useWindowSize();
const doctorList = ref<DoctorList>([]);
const params = ref<PageParams>();
onMounted(() => {
  params.value = { pageSize: 5, current: 1 };
  getList();
});
const getList = () => {
  getDoctorPage(params.value).then((res) => {
    doctorList.value = res.data.rows;
  });
};
</script>

<template>
  <div class="follow-doctor">
    <div className="head">
      <p>推荐关注</p>
      <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow" /></a>
    </div>
    <div class="body">
      <!-- swipe 组件 -->
      <van-swipe
        :width="(150 / 375) * width"
        :show-indicators="false"
        :loop="false"
      >
        <van-swipe-item v-for="item in doctorList" :key="item.id">
          <doctor-card :doctor="item" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;
  .head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
