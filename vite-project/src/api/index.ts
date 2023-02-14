import { request } from "@/utils/request";
import type { User } from "@/types/user";
export const loginByPassword = (mobile, password) => request<User>("/login/password", "POST", { mobile, password });
