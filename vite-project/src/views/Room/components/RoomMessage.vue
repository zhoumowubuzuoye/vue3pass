<script setup lang="ts">
import { IllnessTime, MsgType } from "@/enums/hospital";
import { timeOptions, flagOptions } from "@/utils/consult";
import type { Message, TimeMessages } from "@/types/room";
import type { Image } from "@/types/consult";


import { ImagePreview } from "vant";
const props = defineProps<{
  list: Message[];
}>();

const getIllnessTimeText = (time: IllnessTime) => {
  return timeOptions.find((item) => item.value === time)?.label;
};
const getConsultFlagText = (flag: 0 | 1) => {
  return flagOptions.find((item) => item.value === flag)?.label;
};
const review = (pictures?: Image[]) => {
  ImagePreview(pictures.map((item) => item.url));
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
          {{ getIllnessTimeText(item.msg.consultRecord?.illnessTime) }} |
          {{ getConsultFlagText(item.msg.consultRecord?.consultFlag) }}
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

    <div class="msg msg-to">
      <div class="content">
        <div class="time">20:12</div>
        <div class="pao">大夫你好？</div>
      </div>
      <van-image
        src="https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/popular_3.jpg"
      />
    </div>

    <div class="msg msg-to">
      <div class="content">
        <div class="time">20:12</div>
        <van-image
          fit="contain"
          src="https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/popular_3.jpg"
        />
      </div>
      <van-image
        src="https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/popular_3.jpg"
      />
    </div>

    <div class="msg msg-from">
      <van-image
        src="https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/popular_3.jpg"
      />
      <div class="content">
        <div class="time">20:12</div>
        <div class="pao">哪里不舒服</div>
      </div>
    </div>

    <div class="msg msg-recipe">
      <div class="content">
        <div class="head van-hairline--bottom">
          <div class="head-tit">
            <h3>电子处方</h3>
            <p>原始处方 <van-icon name="arrow"></van-icon></p>
          </div>
          <p>李富贵 男 31岁 血管性头痛</p>
          <p>开方时间：2022-01-15 14:21:42</p>
        </div>
        <div class="body">
          <div class="body-item" v-for="i in 2" :key="i">
            <div class="durg">
              <p>优赛明 维生素E乳</p>
              <p>口服，每次1袋，每天3次，用药3天</p>
            </div>
            <div class="num">x1</div>
          </div>
        </div>
        <div class="foot"><span>购买药品</span></div>
      </div>
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
