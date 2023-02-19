<template>
  <div class="patient-page">
    <cp-nav-bar :title="'家庭档案'"></cp-nav-bar>
    <div class="patient-list">
      <div class="patient-item" v-for="item in list" :key="item.id">
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
    </div>
    <AddForm
      :popupShow="show"
      :back="back"
      @updateShow="updateShow"
      @submit="submit"
      :itemValue="itemValue"
      ref="form"
    ></AddForm>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import CpNavBar from '@/components/CpNavBar.vue'
import CpIcon from '@/components/CpIcon.vue'
import AddForm from './components/addForm.vue'
import { getPatientList, addPatient, delPatient } from '@/api'
import type { PatientList, Patient } from '@/types/user'
import { Sex } from '@/utils/tools'
import { Toast, Dialog } from 'vant'

const list = ref<PatientList>([])
const show = ref(false)
const form = ref()
const getList = () => {
  getPatientList().then(res => {
    list.value = res.data
  })
}
const showPopup = item => {
  console.log(item);
  
  if (item) itemValue.value = item
  show.value = true
}
const back = () => {
  show.value = false
}
const updateShow = value => {
  show.value = value
}
const itemValue = ref<Patient>()
const edit = id => {
  console.log(id)
}
const submit = (patient, callback) => {
  addPatient(patient).then(res => {
    getList()
    Toast('新增成功')
    show.value = false
    callback()
  })
}

const del = (id: string) => {
  Dialog.confirm({
    title: '删除患者',
    message: '您确定是否删除该患者',
  })
    .then(() => {
      delPatient(id).then(res => {
        getList()
        Toast('删除成功')
      })
    })
    .catch(() => {
      // on cancel
    })
}
onMounted(() => {
  getList()
})
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
</style>
