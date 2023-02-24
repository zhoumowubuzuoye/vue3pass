<!--
 * @Author: xiewenhao
 * @Date: 2023-02-21 14:53:03
 * @LastEditTime: 2023-02-21 16:49:26
 * @Description: 
-->
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getKnowledgePage } from "@/api/consult";
import { KnowledgeList, KnowledgeType, Knowledge } from "@/types/consult";
import { PageParams } from "@/types/page";
import KnowledgeCard from "./KnowledgeCard.vue";
const props = defineProps<{
  type: KnowledgeType;
}>();
const list = ref<KnowledgeList>([]);
const params = ref<PageParams>({
  type: props.type,
  current: 1,
  pageSize: 10,
});
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const onLoad = () => {
  getList();
};
const onRefresh = () => {
  // 清空列表数据
  finished.value = false;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
const getList = async () => {
  const res = await getKnowledgePage(params.value);
  res.data.rows.length < 10 ? (finished.value = true) : params.value.current++;
  loading.value = false;
  list.value = [...list.value, ...res.data.rows];
};
</script>

<template>
  <div class="knowledge-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <knowledge-card
          v-for="item in list"
          :key="item.id"
          :knowledge="item"
        ></knowledge-card>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
