<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useConsultStor } from "@/store";
import { useRouter } from "vue-router";
import { getPatientDetail } from "@/api";
import { getConsultOrderPre, createConsultOrder } from "@/api/consult";
import type { ConsultOrderPreData } from "@/types/consult";
import type { Patient } from "@/types/user";

import { Toast, Dialog } from "vant";
import CpNavBar from "@/components/CpNavBar.vue";
import Pay from "./components/pay.vue";
const store = useConsultStor();
const router = useRouter();
const payInfo = ref<ConsultOrderPreData>();
const agree = ref(false);
const paymentMethod = ref<0 | 1>();
const show = ref(false);
const loading = ref(false);
const orderId = ref("");
onMounted(() => {
  getInfo();
  getPatientInfo();
});

const getInfo = () => {
  getConsultOrderPre({
    type: store.consult.type,
    illnessType: store.consult.illnessType,
  }).then((res) => {
    payInfo.value = res.data;
    store.setCoupon(payInfo.value.couponId);
  });
};

const patient = ref<Patient>();
const getPatientInfo = () => {
  getPatientDetail(store.consult.patientId).then((res) => {
    patient.value = res.data;
  });
};
const submit = () => {
  show.value = true;
  loading.value = true;
  createConsultOrder(store.consult).then((res) => {
    orderId.value = res.data.id;
    loading.value = false;
    store.clear();
  });
};
const update = (value) => {
  show.value = value;
};

const close = () => {
  Dialog.confirm({
    title: "支付?",
    message: "取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？",
    cancelButtonText: "仍要关闭",
    confirmButtonText: "继续支付",
  })
    .then(() => {
      return false;
    })
    .catch(() => {
      router.push("/home");
      return true;
    });
};
</script>

<template>
  <div class="consult-pay-page">
    <cp-nav-bar title="支付11" />
    <div class="pay-info">
      <p class="tit">图文问诊 {{ payInfo?.payment }} 元</p>
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <p class="desc">
        <span>极速问诊</span>
        <span>自动分配医生</span>
      </p>
    </div>
    <van-cell-group>
      <van-cell title="优惠券" :value="`-¥${payInfo?.couponDeduction}.00`" />
      <van-cell title="积分抵扣" :value="`-¥${payInfo?.pointDeduction}.00`" />
      <van-cell
        title="实付款"
        :value="`¥${payInfo?.actualPayment}.00`"
        class="pay-price"
      />
    </van-cell-group>
    <div class="pay-space"></div>
    <van-cell-group>
      <van-cell
        title="患者信息"
        :value="`${patient?.name} | ${patient?.gender === 0 ? '女' : '男'} | ${
          patient?.age
        }`"
      ></van-cell>
      <van-cell
        title="病情描述"
        :label="`${store?.consult.illnessDesc}`"
      ></van-cell>
    </van-cell-group>
    <div class="pay-schema">
      <van-checkbox v-model="agree"
        >我已同意 <span class="text">支付协议</span></van-checkbox
      >
    </div>
    <van-submit-bar
      button-type="primary"
      :disabled="!agree"
      :price="payInfo?.payment * 100"
      button-text="立即支付"
      text-align="left"
      @click="submit"
      :loading="loading"
    />
    <Pay
      :payInfo="payInfo"
      :show="show"
      @update="update"
      :close="close"
      :orderId="orderId"
    ></Pay>
  </div>
</template>

<style lang="scss" scoped>
.consult-pay-page {
  padding: 46px 0 50px 0;
}
.pay-info {
  display: flex;
  padding: 15px;
  flex-wrap: wrap;
  align-items: center;
  .tit {
    width: 100%;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .img {
    margin-right: 10px;
    width: 38px;
    height: 38px;
    border-radius: 4px;
    overflow: hidden;
  }
  .desc {
    flex: 1;
    > span {
      display: block;
      color: var(--cp-tag);
      &:first-child {
        font-size: 16px;
        color: var(--cp-text2);
      }
    }
  }
}
.pay-price {
  ::v-deep() {
    .vam-cell__title {
      font-size: 16px;
    }
    .van-cell__value {
      font-size: 16px;
      color: var(--cp-price);
    }
  }
}
.pay-space {
  height: 12px;
  background-color: var(--cp-bg);
}
.pay-schema {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  .text {
    color: var(--cp-primary);
  }
}
::v-deep() {
  .van-submit-bar__button {
    font-weight: normal;
    width: 160px;
  }
}
</style>
