<!--
 * @Author: xiewenhao
 * @Date: 2023-02-13 13:36:44
 * @LastEditTime: 2023-02-14 17:18:35
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
      <a href="javascript:;">
        <span>{{ !isPass ? "密码登录" : "短信验证码登录" }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form autocomplete="off" @submit="login">
      <van-field
        placeholder="请输入手机号"
        type="tel"
        v-model="phone"
        :rules="moblieRules"
      ></van-field>
      <van-field
        placeholder="请输入密码"
        type="password"
        v-model="password"
        :rules="passwordRules"
      ></van-field>
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
import { ref } from "vue";
import CpNavBar from "@/components/CpNavBar.vue";
import { useUserStore } from "@/store";
import { moblieRules, passwordRules } from "@/utils/rules";
import { Toast } from "vant";
import { loginByPassword } from "@/api";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const store = useUserStore();
const agree = ref<boolean>(false);
const isPass = ref(true);
const phone = ref("");
const password = ref("");
const rightClick = (value) => {
  console.log(value);
};
const login = async () => {
  if (!agree.value) return Toast("请勾选我同意");
  loginByPassword(phone.value, password.value).then((res) => {
    store.setUser(res.data);
    router.push((route.query.returnUrl as string) || "/user");
    Toast("登录成功");
  });
};
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
