<script setup lang="ts">
import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { PrescriptionStatus } from "@/enums/hospital";
import { IllnessTime, MsgType } from "@/enums/hospital";
import { timeOptions, flagOptions } from "@/utils/consult";
import type { Message, TimeMessages } from "@/types/room";
import { ImagePreview, Toast } from "vant";
import type { Image } from "@/types/consult";
import { useUserStore } from "@/store";
import { getPrescriptionPic } from "@/api/consult";
import doctorAvatar from "@/assets/avatar-doctor.svg";
import EvaluateCard from "./evaluateCard.vue";

const store = useUserStore();
const router = useRouter();
const { proxy }: any = getCurrentInstance();
const $Dayjs = proxy.$Dayjs;

const formatTime = (time: string) => $Dayjs(time).format("HH:mm");

const props = defineProps<{
  list: Message[];
}>();

const getIllnessTimeText = (time: IllnessTime | undefined) => {
  return timeOptions.find((item) => item.value === time)?.label;
};
const getConsultFlagText = (flag: 0 | 1) => {
  return flagOptions.find((item) => item.value === flag)?.label;
};
const review = (pictures?: Image[]) => {
  ImagePreview(pictures.map((item) => item.url));
};
const buy = (pre) => {
  if (pre) {
    if (pre.status === PrescriptionStatus.Invalid) return Toast("处方已失效");
    if (pre.status === PrescriptionStatus.NotPayment && !pre.orderId)
      return router.push(`/order/pay?id=${pre.id}`);
    router.push(`/order/${pre.orderId}`);
  }
};
const showPrescription = (id?: string) => {
  if (id) {
    getPrescriptionPic(id).then((res) => {
      ImagePreview([res.data.url]);
    });
  }
};
</script>

<template>
  <template v-for="item in list" :key="item.id">
    <div class="msg msg-illness" v-if="item.msgType === MsgType.CardPat">
      <div class="patient van-hairline--bottom">
        <p>
          {{ item.msg.consultRecord?.patientInfo.name }}
          {{ item.msg.consultRecord?.patientInfo.genderValue }}
          {{ item.msg.consultRecord?.patientInfo.age }}岁
        </p>
        <p>
          {{ getIllnessTimeText(item.msg.consultRecord.illnessTime) }} |
          {{ getConsultFlagText(item.msg.consultRecord.consultFlag) }}
        </p>
      </div>
      <van-row>
        <van-col span="6">病情描述</van-col>
        <van-col span="18">{{ item.msg.consultRecord?.illnessDesc }}</van-col>
        <van-col span="6">图片</van-col>
        <van-col span="18" @click="review(item.msg.consultRecord?.pictures)"
          >点击查看</van-col
        >
      </van-row>
    </div>

    <div class="msg msg-tip" v-if="item.msgType === MsgType.Notify">
      <div class="content">
        <span class="green">温馨提示：</span>
        <span>{{ item.msg?.content }}</span>
      </div>
    </div>

    <div class="msg msg-tip" v-if="item.msgType === MsgType.Notify">
      <div class="content">
        <span>{{ item.msg?.content }}</span>
      </div>
    </div>

    <div
      class="msg msg-to"
      v-if="
        (item.msgType === MsgType.MsgText ||
          item.msgType === MsgType.MsgImage) &&
        store.user?.id === item.from
      "
    >
      <div class="content">
        <div class="time">{{ formatTime(item.createTime) }}</div>
        <div class="pao" v-if="item.msgType === MsgType.MsgText">
          {{ item.msg.content }}
        </div>
        <van-image
          v-else-if="item.msgType === MsgType.MsgImage"
          fit="contain"
          :src="item.msg.picture?.url"
        />
      </div>
      <van-image :src="store.user?.avatar" />
    </div>

    <div
      class="msg msg-from"
      v-if="
        (item.msgType === MsgType.MsgText ||
          item.msgType === MsgType.MsgImage) &&
        store.user?.id !== item.from
      "
    >
      <van-image :src="doctorAvatar" />
      <div class="content">
        <div class="time">{{ formatTime(item.createTime) }}</div>
        <div class="pao" v-if="item.msgType === MsgType.MsgText">
          {{ item.msg.content }}
        </div>
        <van-image
          v-else-if="item.msgType === MsgType.MsgImage"
          fit="contain"
          :src="item.msg.picture?.url"
        />
      </div>
    </div>

    <div class="msg msg-recipe">
      <div class="content">
        <div class="head van-hairline--bottom">
          <div class="head-tit">
            <h3>电子处方</h3>
            <p @click="showPrescription(item.msg.prescription?.id)">
              原始处方 <van-icon name="arrow"></van-icon>
            </p>
          </div>
          <p>
            {{ item.msg.prescription?.name }}
            {{ item.msg.prescription?.genderValue }}
            {{ item.msg.prescription?.age }}岁
            {{ item.msg.prescription?.diagnosis }}
          </p>
          <p>开方时间：{{ item.msg.prescription?.createTime }}</p>
        </div>
        <div class="body">
          <div
            class="body-item"
            v-for="med in item.msg.prescription?.medicines"
            :key="med.id"
          >
            <div class="durg">
              <p>{{ med.name }} {{ med.specs }}</p>
              <p>{{ med.usageDosag }}</p>
            </div>
            <div class="num">x{{ med.quantity }}</div>
          </div>
        </div>
        <div class="foot">
          <span @click="buy(item.msg.prescription)">购买药品</span>
        </div>
      </div>
    </div>
    <div
      class="msg msg-comment"
      v-if="
        item.msgType === MsgType.CardEva || item.msgType === MsgType.CardEvaForm
      "
    >
      <EvaluateCard :evaluateDoc="item.msg.evaluateDoc"></EvaluateCard>
    </div>
    <div class="msg msg-tip msg-tip-cancel">
      <div class="content">
        <span>订单取消</span>
      </div>
    </div>
  </template>
</template>

<style lang="scss" scoped>
@import "@/style/room.scss";
</style>
