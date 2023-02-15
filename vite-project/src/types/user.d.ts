export type User = {
  token: string;
  id: string;
  account: string;
  mobile: string;
  avatar: string;
};

export type CodeType = "login" | "register" | "changeMobile" | "forgetPassword";
