/*
 * @Author: xiewenhao
 * @Date: 2023-02-13 11:25:26
 * @LastEditTime: 2023-02-13 11:26:26
 * @Description:
 */
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      name: "zs",
    };
  },
  actions: {
    updateName(name: string) {
      this.name = name;
    },
  },
});
