<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useConsultStor } from "@/store";
import { getPatientDetail } from "@/api";
import { getConsultOrderPre } from "@/api/consult";
import type { ConsultOrderPreData } from "@/types/consult";
import type { Patient } from "@/types/user";
import CpNavBar from "@/components/CpNavBar.vue";
import { log } from "console";

const store = useConsultStor();
const payInfo = ref<ConsultOrderPreData>();
const agree = ref(false);

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
    console.log(res);
    patient.value = res.data;
  });
};
</script>

<template>
  <div class="consult-pay-page">
    <cp-nav-bar title="支付" />
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
    />
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