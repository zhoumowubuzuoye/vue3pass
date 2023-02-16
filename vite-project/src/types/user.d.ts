/*
 * @Author: xiewenhao
 * @Date: 2023-02-14 10:23:54
 * @LastEditTime: 2023-02-16 17:00:49
 * @Description:
 */
export type User = {
  token: string;
  id: string;
  account: string;
  mobile: string;
  avatar: string;
};

export type CodeType = "login" | "register" | "changeMobile" | "forgetPassword";
type Person = {
  /** 姓名 */
  name: string;
  /** 年纪 */
  age: number;
};
type OmitUser = Omit<User, "token">;

export type UserInfo = OmitUser & {
  /** 关注 */
  likeNumber: number;
  /** 收藏 */
  collectionNumber: number;
  /** 积分 */
  score: number;
  /** 优惠券 */
  couponNumber: number;
  orderInfo: {
    /** 待付款 */
    paidNumber: number;
    /** 待发货 */
    receivedNumber: number;
    /** 待收货 */
    shippedNumber: number;
    /** 已完成 */
    finishedNumber: number;
  };
};

export type Patient = Person & {
  /** 患者ID */
  id: string;
  /** 患者名称 */
  idCard: string;
  /** 0不默认  1默认 */
  defaultFlag: 0 | 1;
  /** 0 女  1 男 */
  gender: 0 | 1;
  /** 性别文字 */
  genderValue: string;
};

export type PatientList = Patient[];
