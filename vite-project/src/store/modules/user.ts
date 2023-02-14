/*
 * @Author: xiewenhao
 * @Date: 2023-02-13 11:25:26
 * @LastEditTime: 2023-02-14 10:29:46
 * @Description:
 */
import { defineStore } from "pinia";
import type { User } from "@/types/user";
import { ref } from "vue";
export const useUserStore = defineStore("cp-user", () => {
  const user = ref<User>();
  const setUser = (u: User): void => {
    user.value = u;
  };
  const delUser = () => {
    user.value = undefined;
  };
  return { user, setUser, delUser };
},{
  persist:true
});
