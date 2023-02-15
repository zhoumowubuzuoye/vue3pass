<!--
 * @Author: xiewenhao
 * @Date: 2023-02-13 13:36:44
 * @LastEditTime: 2023-02-15 14:17:58
 * @Description: 
-->
<template>
  <div class="login-page">
    <cp-nav-bar
      right-text="注册"
      @click-right="$router.push('/register')"
    ></cp-nav-bar>
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPass ? "密码登录" : "短信验证码登录" }}</h3>
      <a href="javascript:;" @click="isPass = !isPass">
        <span>{{ !isPass ? "密码登录" : "短信验证码登录" }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form autocomplete="off" @submit="login" ref="form">
      <van-field
        placeholder="请输入手机号"
        type="tel"
        name="mobile"
        v-model="phone"
        :rules="moblieRules"
      ></van-field>
      <van-field
        placeholder="请输入密码"
        v-if="isPass"
        :type="isShow ? 'password' : 'text'"
        v-model="password"
        :rules="passwordRules"
      >
        <template #button>
          <CpIcon
            :name="`login-eye-${isShow ? 'off' : 'on'}`"
            @click="isShow = !isShow"
          ></CpIcon>
        </template>
      </van-field>
      <van-field
        v-if="!isPass"
        v-model="code"
        :rules="codeRules"
        placeholder="短信验证码"
        :maxlength="6"
      >
        <template #button
          ><span class="btn-send" @click="send">{{
            time > 0 ? `${time}后再次发送` : `发送验证码`
          }}</span></template
        >
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit"
          >登 录</van-button
        >
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onUnmounted, ref } from "vue";
import CpNavBar from "@/components/CpNavBar.vue";
import CpIcon from "@/components/CpIcon.vue";
import { useUserStore } from "@/store";
import { moblieRules, passwordRules, codeRules } from "@/utils/rules";
import { Toast, type FormInstance } from "vant";
import { loginByPassword, sendMobileCode, loginByMobile } from "@/api";
import { useRoute, useRouter } from "vue-router";
import { User } from "@/types/user";
import { update } from "lodash";

const route = useRoute();
const router = useRouter();
const store = useUserStore();
const form = ref<FormInstance>();
const agree = ref<boolean>(false);
const isPass = ref(true);
const isShow = ref(true);
const phone = ref("13230000001");
const password = ref("abc12345");
const code = ref("");
const time = ref(0);
let timeId: number;
const rightClick = (value) => {
  console.log(value);
};

const login = async () => {
  if (!agree.value) return Toast("请勾选我同意");
  const res = isPass.value
    ? await loginByPassword(phone.value, password.value)
    : await loginByMobile(phone.value, code.value);
  updateLogin(res);
};

const updateLogin = (res: { data: User }) => {
  store.setUser(res.data);
  router.push((route.query.returnUrl as string) || "/user");
  Toast("登录成功");
};

const send = () => {
  if (time.value > 0) return;
  form.value?.validate("mobile").then(() => {
    sendMobileCode(phone.value, "login").then((res) => {
      code.value = res.data?.code;
      Toast("验证发送成功");
      time.value = 60;
      timeId = window.setInterval(() => {
        time.value--;
        if (time.value === 0) clearInterval(timeId);
      }, 1000);
    });
  });
};

onUnmounted(() => {
  clearInterval(timeId);
});
</script>
<style scoped lang="scss">
.login {
  &-page {
    padding-top: 46px;
  }
  &-head {
    display: flex;
    padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }
  &-other {
    margin-top: 60px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}
.van-form {
  padding: 0 14px;
  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
  .btn-send {
    color: var(--cp-primary);
    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
}
</style>
