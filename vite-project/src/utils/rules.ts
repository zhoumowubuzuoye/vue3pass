const moblieRules = [
  { required: true, message: "亲输入手机号" },
  { pattern: /^1[3-9]\d{9}$/, message: "手机号格式不正确" },
];

const passwordRules = [
  { required: true, message: "亲输入手机号" },
  { pattern: /^\w{8,24}$/, message: "密码长度在8~24个字符" },
];
export { moblieRules, passwordRules };
