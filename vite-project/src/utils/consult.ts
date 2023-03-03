/*
 * @Author: xiewenhao
 * @Date: 2023-03-03 14:00:04
 * @LastEditTime: 2023-03-03 14:05:07
 * @Description:
 */
import { IllnessTime } from "@/enums/hospital";
/**
 *  @descript 患诊时间
 */
export const timeOptions = [
  /** 一周 */
  {
    label: "一周内",
    value: IllnessTime.Week,
  },
  /** 一越 */
  {
    label: "一月内",
    value: IllnessTime.Month,
  },
  /** 半年 */
  {
    label: "半年内",
    value: IllnessTime.HalfYear,
  },
  /** 大于半内 */
  {
    label: "大于半内",
    value: IllnessTime.More,
  },
];

export const flagOptions = [
  { label: "就诊过", value: 0 },
  { label: "没就诊过", value: 1 },
];
