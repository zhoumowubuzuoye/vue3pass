/*
 * @Author: xiewenhao
 * @Date: 2023-02-23 15:50:37
 * @LastEditTime: 2023-02-27 13:16:39
 * @Description: 
 */
import { ConsultType } from "@/enums/hospital";
import type { PartialConsult } from "@/types/consult";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useConsultStor = defineStore(
  "cp-consult",
  () => {
    const consult = ref<PartialConsult>({});
    // 设置问诊状态
    const setType = (type: ConsultType) => {
      consult.value.type = type;
    };
    // 设置急速问诊类型
    const setIllnessType = (type: 0 | 1) => {
      consult.value.illnessType = type;
    };
    // 设置科室
    const setDep = (id: string) => {
      consult.value.depId = id;
    };
    // 设置病情描述
    const setIllness = (
      illness: Pick<
        PartialConsult,
        "illnessDesc" | "illnessTime" | "consultFlag" | "pictures"
      >
    ) => {
      consult.value.illnessDesc = illness.illnessDesc;
      consult.value.illnessTime = illness.illnessTime;
      consult.value.consultFlag = illness.consultFlag;
      consult.value.pictures = illness.pictures;
    };
    // 设置患者
    const setPatient = (id: string) => {
      consult.value.patientId = id;
    };
    // 设置优惠卷
    const setCoupon = (id?: string) => {
      consult.value.couponId = id;
    };
    // 清空记录
    const clear = () => {
      consult.value = {};
    };
    return {
      consult,
      setCoupon,
      setDep,
      setIllnessType,
      setIllness,
      setPatient,
      setType,
      clear,
    };
  },
  {
    persist: true,
  }
);
