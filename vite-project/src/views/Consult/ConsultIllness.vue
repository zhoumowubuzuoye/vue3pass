<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useConsultStor } from "@/store";
import type { ConsultIllness, Image } from "@/types/consult";
import { uploadImage } from "@/api/consult";
import { timeOptions, flagOptions } from "@/utils/consult";

import { Dialog } from "vant";
import CpNavBar from "@/components/CpNavBar.vue";
import CpIcon from "@/components/CpIcon.vue";
import CpRadioBtn from "@/components/CpRadioBtn.vue";

const router = useRouter();
const store = useConsultStor();
onMounted(() => {
  if (store.consult.illnessDesc) {
    Dialog.confirm({
      title: "提示",
      message: "是否恢复您之前填写的病情信息呢？",
      confirmButtonColor: "var(--cp-primary)",
      closeOnPopstate: false,
    })
      .then(() => {
        const { illnessDesc, illnessTime, consultFlag, pictures } =
          store.consult;
        form.value = { illnessDesc, illnessTime, consultFlag, pictures };
        fileList.value = pictures || [];
      })
      .catch(() => {
        // on cancel
      });
  }
});
const form = ref<ConsultIllness>({
  illnessDesc: "",
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: [],
});
const fileList = ref<Image[]>([]);
const disabled = computed(() => {
  return (
    !form.value.illnessDesc ||
    form.value.consultFlag === undefined ||
    form.value.illnessTime === undefined
  );
});

const next = () => {
  store.setIllness(form.value);
  router.push("/user/patient?isChange=1");
};
const onAfterRead = (file, data) => {
  file.status = "uploading";
  file.message = "上传中...";
  uploadImage(file.file)
    .then((res) => {
      file.message = "上传成功";
      file.status = "done";
      file.url = res.data.url;
      form.value.pictures?.push(res.data);
    })
    .catch((err) => {
      file.message = "上传失败";
      file.status = "failed";
    });
};
const onDeleteImg = (file, data) => {
  form.value.pictures.filter((item) => item.url != file.url);
};
</script>

<template>
  <div class="consult-illness-page">
    <cp-nav-bar title="图文问诊" />
    <!-- 医生提示 -->
    <div class="illness-tip van-hairline--bottom">
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <div class="info">
        <p class="tit">在线医生</p>
        <p class="tip">
          请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助
        </p>
        <p class="safe">
          <cp-icon name="consult-safe" /><span>内容仅医生可见</span>
        </p>
      </div>
    </div>
    <!-- 收集信息 -->
    <div class="illness-form">
      <van-field
        type="textarea"
        rows="3"
        placeholder="请详细描述您的病情，病情描述不能为空"
        v-model="form.illnessDesc"
      ></van-field>
      <div class="item">
        <p>本次患病多久了？</p>
        <CpRadioBtn
          :options="timeOptions"
          v-model="form.illnessTime"
        ></CpRadioBtn>
      </div>
      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <CpRadioBtn
          :options="flagOptions"
          v-model="form.consultFlag"
        ></CpRadioBtn>
      </div>
      <div class="illness-img">
        <van-uploader
          v-model="fileList"
          multiple
          upload-icon="photo-o"
          upload-text="上传图片"
          max-count="9"
          :max-size="5 * 1024 * 1024"
          :after-read="onAfterRead"
          @delete="onDeleteImg"
        ></van-uploader>
      </div>
    </div>
    <van-button :class="{ disabled }" @click="next" type="primary" block round
      >下一步</van-button
    >
  </div>
</template>

<style lang="scss" scoped>
.consult-illness-page {
  padding-top: 46px;
}
.illness-tip {
  display: flex;
  padding: 15px;
  .img {
    width: 52px;
    height: 52px;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
  }
  .info {
    flex: 1;
    padding-left: 12px;
    .tit {
      font-size: 16px;
      margin-bottom: 5px;
    }
    .tip {
      padding: 12px;
      background: var(--cp-bg);
      color: var(--cp-text3);
      font-size: 13px;
      margin-bottom: 10px;
    }
    .safe {
      font-size: 10px;
      color: var(--cp-text3);
      display: flex;
      align-items: center;
      .cp-icon {
        font-size: 12px;
        margin-right: 2px;
      }
    }
  }
}
.illness-form {
  padding: 15px;
  .van-field {
    padding: 0;
    &::after {
      border-bottom: none;
    }
  }
  .item {
    > p {
      color: var(--cp-text3);
      padding: 15px 0;
    }
  }
}
.illness-img {
  padding-top: 16px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  .tip {
    font-size: 12px;
    color: var(--cp-tip);
  }
  ::v-deep() {
    .van-uploader {
      &__preview {
        &-delete {
          left: -6px;
          top: -6px;
          border-radius: 50%;
          background-color: var(--cp-primary);
          width: 20px;
          height: 20px;
          &-icon {
            transform: scale(0.9) translate(-22%, 22%);
          }
        }
        &-image {
          border-radius: 8px;
          overflow: hidden;
        }
      }
      &__upload {
        border-radius: 8px;
      }
      &__upload-icon {
        color: var(--cp-text3);
      }
    }
  }
}
.van-button {
  font-size: 16px;
  margin-bottom: 30px;
  &.disabled {
    opacity: 1;
    background: #fafafa;
    color: #d9dbde;
    border: #fafafa;
  }
}
</style>
