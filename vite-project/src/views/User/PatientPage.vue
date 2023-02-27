<template>
  <div class="patient-page">
    <cp-nav-bar :title="isChange ? '选择患者' : '家庭档案'"></cp-nav-bar>
    <div class="patient-change" v-if="isChange">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>
    <div class="patient-list">
      <div
        class="patient-item"
        v-for="item in list"
        :key="item.id"
        @click="selectedPatient(item)"
        :class="{ selected: patientId === item.id }"
      >
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{ item.idCard }}</span>
          <span>{{ Sex(item.gender) }}</span>
          <span>{{ item.age }}岁</span>
        </div>
        <div class="icon" @click="showPopup(item)">
          <cp-icon name="user-edit" />
        </div>
        <div class="tag" v-if="item.defaultFlag">默认</div>
      </div>
      <div class="patient-add" v-if="list.length <= 6" @click="showPopup">
        <cp-icon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
      <div class="patient-next" v-if="isChange" @click="next">
        <van-button type="primary" round block>下一步</van-button>
      </div>
    </div>
    <AddForm
      :popupShow="show"
      :back="back"
      @updateShow="updateShow"
      @submit="submit"
      :itemValue="itemValue"
      ref="form"
      @del="del"
    ></AddForm>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { useRoute,useRouter } from "vue-router";
import {useConsultStor} from '@/store'
import CpNavBar from "@/components/CpNavBar.vue";
import CpIcon from "@/components/CpIcon.vue";
import AddForm from "./components/addForm.vue";
import { getPatientList, addPatient, delPatient, editPatient } from "@/api";
import type { PatientList, Patient } from "@/types/user";
import { Sex } from "@/utils/tools";
import { Toast, Dialog } from "vant";

const route = useRoute();
const router = useRouter()
const store = useConsultStor()
const list = ref<PatientList>([]);
const show = ref(false);
const form = ref();
const patientId = ref("");

const isChange = computed(() => {
  return route.query.isChange === "1";
});
const getList = () => {
  getPatientList().then((res) => {
    list.value = res.data;
    if (isChange.value && list.value.length) {
      const defalutPatient = list.value.find((item) => item.defaultFlag === 1);
      if (defalutPatient) patientId.value = defalutPatient.id;
      else patientId.value = list.value[0].id;
    }
  });
};
const showPopup = (item) => {
  if (item) itemValue.value = item;
  show.value = true;
};
const back = () => {
  show.value = false;
};
const updateShow = (value) => {
  show.value = value;
};
const itemValue = ref<Patient>();
const edit = (id) => {
  console.log(id);
};
const submit = (patient: Patient, callback) => {
  if (!patient.id) {
    addPatient(patient).then((res) => {
      getList();
      Toast("新增成功");
      show.value = false;
      callback();
    });
  } else {
    const { id, idCard, gender, name, defaultFlag } = patient;
    editPatient({ id, idCard, gender, name, defaultFlag }).then((res) => {
      getList();
      Toast("修改成功");
      show.value = false;
      callback();
    });
  }
};
const next = () => {
  if (!patientId.value) return Toast("请选就诊择患者");
  store.setPatient(patientId.value);
  router.push("/consult/pay");
};
const del = (id: string) => {
  Dialog.confirm({
    title: "删除患者",
    message: "您确定是否删除该患者",
  })
    .then(() => {
      delPatient(id).then((res) => {
        getList();
        show.value = false;
        Toast("删除成功");
      });
    })
    .catch(() => {
      // on cancel
    });
};
const selectedPatient = (item: Patient) => {
  if (isChange.value) {
    patientId.value = item.id;
  }
};
onMounted(() => {
  getList();
});
</script>
<style scoped lang="scss">
.patient-page {
  padding: 46px 0 80px;
}
.patient-list {
  padding: 15px;
}
.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--cp-bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--cp-bg);
  transition: all 0.3s;
  overflow: hidden;
  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    span {
      color: var(--cp-tip);
      margin-right: 20px;
      line-height: 30px;
      &.name {
        font-size: 16px;
        color: var(--cp-text1);
        width: 80px;
        margin-right: 0;
      }
      &.id {
        color: var(--cp-text2);
        width: 180px;
      }
    }
  }
  .icon {
    color: var(--cp-tag);
    width: 20px;
    text-align: center;
  }
  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--cp-primary);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.selected {
    border-color: var(--cp-primary);
    background-color: var(--cp-plain);
    .icon {
      color: var(--cp-primary);
    }
  }
}
.patient-add {
  background-color: var(--cp-bg);
  color: var(--cp-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;
  .cp-icon {
    font-size: 24px;
  }
}
.patient-tip {
  color: var(--cp-tag);
  padding: 12px 0;
}
.pb4 {
  padding-bottom: 4px;
}
.patient-page {
  padding: 46px 0 80px;
  :deep() {
    .van-popup {
      width: 80%;
      height: 100%;
    }
  }
}
.patient-change {
  padding: 15px;
  > h3 {
    font-weight: normal;
    margin-bottom: 5px;
  }
  > p {
    color: var(--cp-text3);
  }
}
.patient-next {
  padding: 15px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
}
</style>
