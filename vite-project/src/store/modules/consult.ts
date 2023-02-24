import { ConsultType } from "@/enums/hospital";
import type { PartialConsult } from "@/types/consult";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useConsultStor = defineStore("cp-consult", () => {
  const consult = ref<PartialConsult>();
  // 设置问诊状态
  const setType = (type: ConsultType) => {
    consult.value.type = type;
  };
  // 设置急速问诊类型
  const setIllnessType =(type:0|1) =>{
    consult.value.illnessType = type
  }
  // 设置科室
  const set
});
