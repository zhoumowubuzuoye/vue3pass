<script setup lang="ts">
import { reactive, computed, ref, watch } from "vue";

import { Patient, PatientList } from "@/types/user";
import { nameRules, idCardRules } from "@/utils/rules";

import CpNavBar from "@/components/CpNavBar.vue";
import CpRadioBtn from "@/components/CpRadioBtn.vue";
import { FormInstance } from "vant";
const initPatient = reactive<Patient>({
  name: "",
  idCard: "",
  gender: 0,
  defaultFlag: 0,
});
const patientFrom = ref<Patient>();

const props = defineProps<{
  popupShow: boolean;
  back: Function;
  itemValue?: Patient;
}>();
const emit = defineEmits<{
  (updateShow, value: boolean): void;
  (submit, value: Patient, callback: Function): void;
  (del, id: string): void;
}>();
watch(
  () => props.itemValue,
  (newValue, oldValue) => {
    if (newValue.id) {
      patientFrom.value = newValue;
    } else {
      patientFrom.value = { ...initPatient };
    }
  },
  { deep: true }
);
const form = ref<FormInstance>();
const reset = () => {
  patientFrom.value = { ...initPatient };
};
const options = [
  {
    value: 0,
    label: "男",
  },
  {
    value: 1,
    label: "女",
  },
];
const emitValue = (event) => {
  emit("updateShow", event);
};
const defaultFlagValue = computed({
  get() {
    if (patientFrom.value.defaultFlag === 0) {
      return false;
    } else {
      return true;
    }
  },
  set(value) {
    patientFrom.value.defaultFlag = value ? 1 : 0;
  },
});
const submit = () => {
  form.value?.validate().then(() => {
    emit("submit", patientFrom.value, () => reset());
  });
};
const delPatient = (id) => {
  emit("del", id);
};
</script>
<template>
  <van-popup
    :show="popupShow"
    @update:show="emitValue($event)"
    position="right"
  >
    <cp-nav-bar
      :title="patientFrom.id ? '编辑患者' : '添加患者'"
      right-text="保存"
      :back="back"
      @click-right="submit"
    ></cp-nav-bar>
    <van-form autocomplete="off" ref="form">
      <van-field
        label="真实姓名"
        placeholder="请输入真实姓名"
        v-model="patientFrom.name"
        :rules="nameRules"
      />
      <van-field
        label="身份证号"
        placeholder="请输入身份证号"
        v-model="patientFrom.idCard"
        :rules="idCardRules"
      />
      <van-field label="性别" class="pb4">
        <!-- 单选按钮组件 -->
        <template #input>
          <cp-radio-btn
            :options="options"
            v-model="patientFrom.gender"
          ></cp-radio-btn>
        </template>
      </van-field>
      <van-field label="默认就诊人">
        <template #input>
          <van-checkbox :icon-size="18" round v-model="defaultFlagValue" />
        </template>
      </van-field>
    </van-form>
    <van-action-bar v-if="patientFrom.id">
      <van-action-bar-button @click="delPatient(patientFrom.id)"
        >删除</van-action-bar-button
      >
    </van-action-bar>
  </van-popup>
</template>

<style lang="scss" scoped>
.van-form {
  margin-top: 40px;
}
.van-action-bar {
  padding: 0 10px;
  margin-bottom: 10px;
  .van-button {
    color: var(--cp-price);
    background-color: var(--cp-bg);
  }
}
</style>
